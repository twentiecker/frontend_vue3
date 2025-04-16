<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  pageTitle: String,
  apiServices: Object,
  toast: Object,
});
const dataPreviewSkeleton = ref(new Array(9));
const dataPreview = ref([]);
const balanceFrozen = ref(false);
const selectedDropdown = ref(null);
const selectedDropdowns = ref([
  { name: "CP", endpoint: props.apiServices.cp },
  { name: "PY", endpoint: props.apiServices.py },
  { name: "PP", endpoint: props.apiServices.pp },
  { name: "Unchain Index", endpoint: props.apiServices.uvuc },
  { name: "Chain Index", endpoint: props.apiServices.uich },
  { name: "Ref Year", endpoint: props.apiServices.rasioRef },
  { name: "CVM", endpoint: props.apiServices.cvm },
]);
const loadData = async (endpoint) => {
  if (!endpoint) return; // Mencegah error jika endpoint belum dipilih

  try {
    const data = await endpoint(); // Memanggil API sesuai dengan pilihan dropdown
    dataPreview.value = data;

    props.toast.add({
      severity: "success",
      summary: "Success",
      detail: "Berhasil mendapatkan data",
      life: 3000,
    });
  } catch (error) {
    console.error("Gagal mendapatkan data:", error);
    props.toast.add({
      severity: "error",
      summary: "Error",
      detail: "Gagal mendapatkan data",
      life: 3000,
    });
  }
};
// const loadData = async () => {
//   try {
//     const data = await props.apiServices.cvm();

//     dataPreview.value = data;
//     props.toast.add({
//       severity: "success",
//       summary: "Success Message",
//       detail: "Berhasil mendapatkan data",
//       life: 3000,
//     });
//   } catch (error) {
//     console.error("Gagal mendapatkan data:", error);
//     props.toast.error("Gagal mendapatkan data", {
//       timeout: 3000,
//     });
//   }
// };
const formatCurrency = (value) => {
  return Math.round(value).toLocaleString("id-ID");
};
const formatIndex = (value) => {
  return (Math.round(value * 10000) / 10000).toLocaleString("id-ID", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};
// onBeforeMount(async () => {
//   loadData();
// });
// Watcher untuk mendeteksi perubahan dropdown dan memanggil loadData otomatis
watch(selectedDropdown, (newValue) => {
  if (newValue) {
    loadData(newValue.endpoint);
  }
});
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Tabel {{ pageTitle }}</div>
    <Select
      class="mt-2 mb-5"
      v-model="selectedDropdown"
      :options="selectedDropdowns"
      optionLabel="name"
      placeholder="Pilih Data"
    />
    <div v-if="!selectedDropdown" class="flex flex-col h-48">
      <div
        class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
      >
        No Data Preview is Available
      </div>
    </div>
    <div v-else>
      <DataTable :value="dataPreviewSkeleton" v-if="dataPreview.length === 0">
        <Column field="kode" header="Kode">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>
        <Column field="produk" header="Produk">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>
        <Column field="periode" header="Periode">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>
      </DataTable>
      <div v-else class="card p-0! m-0!">
        <!-- {{ dataPreview }} -->
        <ToggleButton
          v-model="balanceFrozen"
          onIcon="pi pi-lock"
          offIcon="pi pi-lock-open"
          :onLabel="
            Object.keys(dataPreview[0])[Object.keys(dataPreview[0]).length - 1]
          "
          :offLabel="
            Object.keys(dataPreview[0])[Object.keys(dataPreview[0]).length - 1]
          "
        />
        <DataTable
          :value="dataPreview"
          scrollable
          scrollHeight="60vh"
          class="mt-6"
        >
          <Column
            v-for="(key, index) in Object.keys(dataPreview[0])"
            :key="index"
            :field="key"
            :frozen="
              key === 'Kode' ||
              key === 'Produk' ||
              (balanceFrozen &&
                index === Object.keys(dataPreview[0]).length - 1)
            "
            :class="key === 'Kode' || key === 'Produk' ? 'font-bold' : ''"
            :style="{
              'min-width':
                key === 'Produk' ? '300px' : key === 'Kode' ? '30px' : '150px',
            }"
            :alignFrozen="
              index === Object.keys(dataPreview[0]).length - 1
                ? 'right'
                : undefined
            "
          >
            <template #header>
              <div class="text-center font-bold w-full">
                {{ key }}
              </div></template
            >
            <template
              #body="slotProps"
              v-if="key !== 'Kode' && key !== 'Produk'"
            >
              <div class="text-right">
                {{
                  selectedDropdown.name !== "Unchain Index" &&
                  selectedDropdown.name !== "Chain Index"
                    ? formatCurrency(slotProps.data[`${key}`])
                    : formatIndex(slotProps.data[`${key}`])
                }}
                <!-- {{ selectedDropdown.name === "Unchain Index" }} -->
                <!-- {{ formatCurrency(slotProps.data[`${key}`]) }} -->
              </div>
              <!-- <div class="flex justify-between">
                <span>Rp</span>
                {{ formatCurrency(slotProps.data[`${key}`]) }}
              </div> -->
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
