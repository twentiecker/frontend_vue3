<script setup>
import { ref } from "vue";

const props = defineProps({
  dataPreview: Array,
});
const balanceFrozen = ref(false);

const formatCurrency = (value) => {
  return (Math.round(value * 100) / 100).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
</script>

<template>
  <div class="card p-0! m-0!">
    <div class="font-semibold text-xl mb-4">Data Preview</div>
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
      scrollHeight="400px"
      class="mt-6"
    >
      <Column
        v-for="(key, index) in Object.keys(dataPreview[0])"
        :key="index"
        :field="key"
        :frozen="
          key === 'Kode' ||
          key === 'Produk' ||
          (balanceFrozen && index === Object.keys(dataPreview[0]).length - 1)
        "
        :class="key === 'Kode' || key === 'Produk' ? 'font-bold' : ''"
        :style="{
          'min-width':
            key === 'Produk' ? '300px' : key === 'Kode' ? '30px' : '150px',
        }"
        :alignFrozen="
          index === Object.keys(dataPreview[0]).length - 1 ? 'right' : undefined
        "
      >
        <template #header>
          <div class="text-center font-bold w-full">
            {{ key }}
          </div></template
        >
        <template #body="slotProps" v-if="key !== 'Kode' && key !== 'Produk'">
          <div class="flex justify-between">
            <span>Rp</span>
            {{ formatCurrency(slotProps.data[`${key}`]) }}
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
