<script setup>
import { ref, computed } from "vue";
import * as XLSX from "xlsx";
import exportService from "../api/exportService";
import { komponens } from "../config/config";
import DataPreview from "./DataPreview.vue";
import DataValidation from "./DataValidation.vue";

const props = defineProps({
  pageTitle: String,
  templateName: String,
  endpoint: Function, // Menerima fungsi sebagai prop
  toast: Object,
});
const emit = defineEmits(["upload-data", "periode-data"]);
const fileupload = ref();
const excelData = ref([]);
const dataPreview = ref([]);
const dropdownSut = ref(null);
const dropdownKomponen = ref(null);
const loading = ref([false, false, false]);
const isInvalidState = ref(false); // Bisa diubah manual
const isInvalid = ref(false);
// const isInvalid = computed(
//   () => isInvalidState.value || props.pageTitle !== "SUT"
// );
// const isInvalid = computed(() => props.pageTitle !== "SUT");
// const isInvalid = ref();

// const isInvalid = computed({
//   get: () =>
//   // props.pageTitle === "SUT" ? dropdownSut.value : dropdownKomponen.value,
//   props.pageTitle === "SUT" ? isInvalid.value = false : isInvalid.value = true,
//   set: (newValue) => {
//     // if (props.pageTitle === "SUT") {
//     //   dropdownSut.value = newValue;
//     // } else {
//     //   dropdownKomponen.value = newValue;
//     // }
//     if (props.pageTitle === "SUT") {
//       isInvalid.value = false
//     } else {
//       isInvalid.value = true
//     }
//   },
// });
const selectedDropdown = computed({
  get: () =>
    props.pageTitle === "SUT" ? dropdownSut.value : dropdownKomponen.value,
  set: (newValue) => {
    if (props.pageTitle === "SUT") {
      dropdownSut.value = newValue;
    } else {
      dropdownKomponen.value = newValue;
    }
  },
});
const selectedDropdowns = computed({
  get: () =>
    props.pageTitle === "SUT" ? dropdownSuts.value : dropdownKomponens.value,
  set: (newValue) => {
    if (props.pageTitle === "SUT") {
      dropdownSuts.value = newValue;
    } else {
      dropdownKomponens.value = newValue;
    }
  },
});
const dropdownSuts = ref([
  {
    name: "SUT",
    code: Array.from({ length: 7 }, (_, i) => (i + 1).toString()),
  },
]);
const dropdownKomponens = ref([
  { name: "PKRT", code: ["1"] },
  { name: "PKLNPRT", code: ["2"] },
  { name: "PKP", code: ["3"] },
  { name: "PMTB", code: ["4"] },
  { name: "PI", code: ["5"] },
  { name: "EKSIM", code: ["6", "7"] },
]);
const generateHeaders = (komponen) => {
  const headers = ["Kode", "Produk"];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (komponen == "SUT") {
    for (let year = 2019; year < currentYear - 3; year++) {
      headers.push(`${year}T`);
    }
  } else {
    for (let year = 2019; year <= currentYear; year++) {
      headers.push(`${year}Q1`, `${year}Q2`, `${year}Q3`, `${year}Q4`);
    }

    // Menentukan kuartal terakhir yang valid
    if (currentMonth >= 1 && currentMonth <= 3) {
      headers.pop(); // Hapus Q4
      headers.pop(); // Hapus Q3
      headers.pop(); // Hapus Q2
      headers.pop(); // Hapus Q1
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      headers.pop(); // Hapus Q4
      headers.pop(); // Hapus Q3
      headers.pop(); // Hapus Q2
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      headers.pop(); // Hapus Q4
      headers.pop(); // Hapus Q3
    } else {
      headers.pop(); // Hapus Q4
    }
  }

  return headers;
};
const downloadTemplate = async (title) => {
  if (selectedDropdown.value) {
    loading.value[0] = true;
    const templateHeaders = generateHeaders(selectedDropdown.value.name);
    const payload = {
      title: `${title}-${selectedDropdown.value.name}`,
      headers: templateHeaders,
      rows: komponens
        .filter((el) =>
          selectedDropdown.value.code.some((code) => el[0].startsWith(code))
        )
        .map((el) => [...el, ...Array(templateHeaders.length - 2).fill(0)]),
    };

    try {
      const data = await exportService.exportData(payload);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Template_${title}-${selectedDropdown.value.name}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      props.toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Berhasil mengunduh file",
        life: 3000,
      });
    } catch (error) {
      props.toast.add({
        severity: "error",
        summary: "Error Message",
        detail: "Gagal mengunduh file",
        life: 3000,
      });
    } finally {
      loading.value[0] = false;
    }
  } else {
    props.toast.add({
      severity: "warn",
      summary: "Warning Message",
      detail: "Plih komponen terlebih dahulu",
      life: 3000,
    });
  }
};
const onUpload = async (event) => {
  loading.value[1] = true;
  const file = event.files[0]; // Ambil file pertama
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    if (sheetName.split("-")[0] == props.templateName) {
      dataPreview.value = jsonData;
      const keys = Object.keys(jsonData[0]);
      const periodeData = keys.filter(
        (item) => item !== "Kode" && item !== "Produk"
      );

      emit("periode-data", periodeData);

      const hasilTransformasi = { data: [] };
      jsonData.forEach((item) => {
        const kode = item.Kode;
        Object.keys(item).forEach((key) => {
          if (key !== "Kode" && key !== "Produk") {
            hasilTransformasi.data.push({
              periode: key,
              nilai: item[key],
              komponen_id: kode,
            });
          }
        });
      });

      excelData.value = JSON.stringify(hasilTransformasi, null, 2);

      props.toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Data berhasil dibaca",
        life: 3000,
      });

      loading.value[1] = false;
    } else {
      props.toast.add({
        severity: "error",
        summary: "Error Message",
        detail: "Template yang digunakan salah",
        life: 3000,
      });

      loading.value[1] = false;
    }
  };
  reader.readAsArrayBuffer(file);
};
const upload = () => {
  if (
    !fileupload.value ||
    !fileupload.value.files ||
    fileupload.value.files.length === 0
  ) {
    props.toast.add({
      severity: "warn",
      summary: "Warning Message",
      detail: "Pilih file terlebih dahulu",
      life: 3000,
    });
    return;
  }
  fileupload.value.upload();
};
const uploadData = async () => {
  loading.value[2] = true;

  try {
    await props.endpoint(excelData.value);
    props.toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Berhasil melakukan upload data",
      life: 3000,
    });

    loading.value[2] = false;
    emit("upload-data", `${props.templateName}-submitted`);
  } catch (error) {
    props.toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Gagal melakukan upload data",
      life: 3000,
    });

    loading.value[2] = false;
  }
};
const handleIsInvalid = (data) => {
  isInvalidState.value = data; // ✅ Bisa diubah
  // isInvalid.value = data;
};
</script>

<template>
  <div class="flex col-span-full lg:col-span-6">
    <div class="card px-0! w-3/8">
      <div class="font-semibold text-xl mb-4">Download File</div>
      <Select
        class="mr-5"
        v-model="selectedDropdown"
        :options="selectedDropdowns"
        optionLabel="name"
        placeholder="Pilih Komponen"
      />
      <Button
        type="button"
        class="mr-2 mb-2 w-40"
        label="Template Excel"
        :loading="loading[0]"
        @click="downloadTemplate(templateName)"
      />
    </div>
    <div class="card px-0! w-5/8">
      <div class="font-semibold text-xl mb-4">Upload File</div>
      <div class="flex p-0! mb-4!">
        <Toast />
        <FileUpload
          ref="fileupload"
          mode="basic"
          name="demo[]"
          accept=".xlsx"
          :maxFileSize="1000000"
          @uploader="onUpload"
          customUpload
        />
        <Button
          class="ml-10 mr-5 w-25"
          style="max-height: 32.4px"
          label="Preview"
          :loading="loading[1]"
          @click="upload"
          severity="secondary"
        />
        <Button
          class="w-40"
          style="max-height: 32.4px"
          label="Upload"
          :loading="loading[2]"
          @click="uploadData"
          :disabled="excelData.length === 0 || isInvalid"
        />
      </div>
    </div>
  </div>

  <div v-if="excelData.length === 0" class="flex flex-col h-48">
    <div
      class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
    >
      No Data Preview is Available
    </div>
  </div>
  <div v-else class="flex flex-col gap-8">
    <DataPreview :dataPreview="dataPreview" />
    <DataValidation
      v-if="pageTitle === 'PDB'"
      :dataPreview="dataPreview"
      :toast="toast"
      :templateName="templateName"
      @is-invalid="handleIsInvalid"
    />
  </div>
</template>
