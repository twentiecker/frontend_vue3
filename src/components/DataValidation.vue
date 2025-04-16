<script setup>
import { ref, onMounted, watch } from "vue";
import cpSutService from "../api/sut/cpSutService";
import uvpySutService from "../api/sut/uvpySutService";
import uvppSutService from "../api/sut/uvppSutService";

const props = defineProps({
  templateName: String,
  dataPreview: Array,
  toast: Object,
});
const emit = defineEmits(["is-invalid"]);
const dataCompare = ref([]);
const dataSut = ref([]);
const balanceFrozen = ref(false);
const isInvalid = ref([]);
const fetchDataSut = async (templateName) => {
  try {
    if (props.templateName === "CP")
      dataSut.value = await cpSutService.getCpsSut();
    else if (props.templateName === "PY")
      dataSut.value = await uvpySutService.getUvpysSut();
    else if (props.templateName === "PP")
      dataSut.value = await uvppSutService.getUvppsSut();

    props.toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Berhasil mendapatkan data SUT",
      life: 3000,
    });

    // const years1 = getYears(props.dataPreview);
    // const years2 = getYears(dataSut.value);
    // const allYears = [...new Set([...years1, ...years2])].sort((a, b) => a - b);
    const allYears = [...new Set(getYears(dataSut.value))].sort(
      (a, b) => a - b
    );

    const convertedData1 = props.dataPreview.map((item) => {
      const newItem = { Kode: item.Kode, Produk: item.Produk };

      allYears.forEach((year) => {
        newItem[`${year}Komp`] =
          (item[`${year}Q1`] || 0) +
          (item[`${year}Q2`] || 0) +
          (item[`${year}Q3`] || 0) +
          (item[`${year}Q4`] || 0);
      });

      return newItem;
    });

    const mergedData = convertedData1.map((item2) => {
      const matchedItem = dataSut.value.find(
        (item1) => item1.Kode === item2.Kode
      );

      let formattedItem = { Kode: item2.Kode, Produk: item2.Produk };

      allYears.forEach((year) => {
        formattedItem[`${year}T`] = matchedItem[`${year}T`] || 0;
        formattedItem[`${year}Komp`] = item2 ? item2[`${year}Komp`] : 0;
      });

      return formattedItem;
    });
    dataCompare.value = mergedData;
  } catch (error) {
    props.toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Gagal mendapatkan data SUT",
      life: 3000,
    });
  }
};
const formatCurrency = (value) => {
  return (Math.round(value * 100) / 100).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const getYears = (data) => {
  const yearSet = new Set();
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      const match = key.match(/^(\d{4})[QT]/);
      if (match) yearSet.add(parseInt(match[1])); // Ambil tahun
    });
  });
  return [...yearSet].sort((a, b) => a - b);
};
// Fungsi untuk cek apakah nilai Komp berbeda dari T
const isDifferent = (rowData, key) => {
  if (key.endsWith("Komp")) {
    let tahun = key.replace("Komp", "T"); // Ganti Komp dengan T
    isInvalid.value.push(
      formatCurrency(rowData[tahun]) !== formatCurrency(rowData[key])
    );

    return formatCurrency(rowData[tahun]) !== formatCurrency(rowData[key]); // Bandingkan nilai
  }
  emit("is-invalid", isInvalid.value);
  return false;
};
watch(
  () => props.dataPreview,
  () => fetchDataSut(props.templateName),
  { deep: true }
);
onMounted(() => {
  fetchDataSut(props.templateName);
});
</script>

<template>
  <div class="card p-0! m-0!" v-if="dataSut.length > 0">
    <!-- {{ dataCompare }} -->
    <div class="font-semibold text-xl mb-4">Data Validation</div>
    <ToggleButton
      v-model="balanceFrozen"
      onIcon="pi pi-lock"
      offIcon="pi pi-lock-open"
      :onLabel="
        Object.keys(dataCompare[0])[Object.keys(dataCompare[0]).length - 1]
      "
      :offLabel="
        Object.keys(dataCompare[0])[Object.keys(dataCompare[0]).length - 1]
      "
    />
    <DataTable
      :value="dataCompare"
      scrollable
      scrollHeight="400px"
      class="mt-6"
    >
      <Column
        v-for="(key, index) in Object.keys(dataCompare[0])"
        :key="index"
        :field="key"
        :frozen="
          key === 'Kode' ||
          key === 'Produk' ||
          (balanceFrozen && index === Object.keys(dataCompare[0]).length - 1)
        "
        :class="key === 'Kode' || key === 'Produk' ? 'font-bold' : ''"
        :style="{
          'min-width':
            key === 'Produk' ? '300px' : key === 'Kode' ? '30px' : '150px',
        }"
        :alignFrozen="
          index === Object.keys(dataCompare[0]).length - 1 ? 'right' : undefined
        "
      >
        <template #header>
          <div class="text-center font-bold w-full">
            {{ key }}
          </div></template
        >
        <template #body="slotProps" v-if="key !== 'Kode' && key !== 'Produk'">
          <div
            class="flex justify-between p-1"
            :class="{
              'bg-red-500 text-white': isDifferent(slotProps.data, key),
            }"
          >
            <span v-if="key !== 'Kode' && key !== 'Produk'">Rp</span>
            {{ formatCurrency(slotProps.data[key]) }}
          </div>
          <!-- <div class="flex justify-between">
            <span>Rp</span>
            {{ formatCurrency(slotProps.data[`${key}`]) }}
          </div> -->
        </template>
      </Column>
    </DataTable>
  </div>
</template>
