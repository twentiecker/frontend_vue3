<script setup>
import { useToast } from "primevue/usetoast";
import { nextTick, ref } from "vue";
import StepContent1 from "./StepContent1.vue";

const props = defineProps({
  pageTitle: String,
  apiServices: Object,
});
const toast = useToast();
const isDisabled = ref([true, true, true]);
const activeStep = ref("1"); // Menyimpan nilai step aktif
const isActive = ref(false);
const periodeData = ref([]);

const handleStepChange = async (newValue) => {
  console.log("Step berubah ke:", newValue);
  activeStep.value = newValue; // Memperbarui step aktif
  isActive.value = true;
};
const handlePeriodeData = (data) => {
  data.forEach((item) => {
    periodeData.value.push(item);
    if (item.endsWith("Q4")) {
      const year = item.substring(0, 4);
      periodeData.value.push(`${year}T`);
    }
  });
};
const handleUploadData = (data) => {
  if (data === "CP-submitted") {
    isDisabled.value[0] = false;
  } else if (data === "PY-submitted") {
    isDisabled.value[1] = false;
  } else if (data === "PP-submitted") {
    isDisabled.value[2] = false;
  }
};
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Evaluasi Data</div>
    <Stepper :value="activeStep" @update:value="handleStepChange">
      <StepList>
        <Step value="1">CURRENT PRICE (CP)</Step>
        <Step value="2">PREVIOUS YEAR PRICE (PY)</Step>
        <Step value="3">PREVIOUS PERIOD PRICE (PP)</Step>
      </StepList>
      <StepPanels>
        <StepPanel
          v-slot="{ activateCallback }"
          value="1"
          :class="
            isActive ? `animate-fadein animate-once animate-duration-700` : ``
          "
        >
          <StepContent1
            :pageTitle="pageTitle"
            templateName="CP"
            :toast="toast"
            @upload-data="handleUploadData"
            @periode-data="handlePeriodeData"
          />
          <div class="flex pt-6 justify-end">
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback('2')"
            />
          </div>
        </StepPanel>
        <StepPanel
          v-slot="{ activateCallback }"
          value="2"
          class="animate-fadein animate-once animate-duration-700"
        >
          <StepContent1
            :pageTitle="pageTitle"
            templateName="PY"
            :toast="toast"
            @upload-data="handleUploadData"
            @periode-data="handlePeriodeData"
          />
          <div class="flex pt-6 justify-between">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('1')"
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback('3')"
            />
          </div>
        </StepPanel>
        <StepPanel
          v-slot="{ activateCallback }"
          value="3"
          class="animate-fadein animate-once animate-duration-700"
        >
          <StepContent1
            :pageTitle="pageTitle"
            templateName="PP"
            :toast="toast"
            @upload-data="handleUploadData"
            @periode-data="handlePeriodeData"
          />
          <div class="flex pt-6 justify-between">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('2')"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>
