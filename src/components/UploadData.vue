<script setup>
import StepContent from "../components/StepContent.vue";
import { useToast } from "primevue/usetoast";
import { nextTick, ref } from "vue";

const props = defineProps({
  pageTitle: String,
  apiServices: Object,
});
const toast = useToast();
const loading = ref([false]);
const isDisabled = ref([true, true, true]);
const activeStep = ref("1"); // Menyimpan nilai step aktif
const isActive = ref(false);
const periodeData = ref([]);

const handleStepChange = async (newValue) => {
  console.log("Step berubah ke:", newValue);
  let temp = activeStep.value;
  activeStep.value = newValue; // Memperbarui step aktif
  if (
    ((activeStep.value === "2" || activeStep.value === "3") &&
      isDisabled.value[0] === true) ||
    (activeStep.value === "3" && isDisabled.value[1] === true)
  ) {
    await nextTick();
    activeStep.value = temp;
    isActive.value = false;
  } else {
    isActive.value = true;
  }
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
const calculateCvm = async () => {
  loading.value[0] = true;

  const services = [
    {
      name: "UVUC",
      func: () => props.apiServices.uvuc({ data: periodeData.value }),
    },
    {
      name: "UICH",
      func: () => props.apiServices.uich({ data: periodeData.value }),
    },
    {
      name: "Rasio Ref",
      func: () =>
        props.apiServices.rasioRef(
          // { data: periodeData.value }
          {
            data: [
              ...new Set(periodeData.value.map((item) => item.slice(0, 4))),
            ],
          }
        ),
    },
    {
      name: "CVM",
      func: () => props.apiServices.cvm({ data: periodeData.value }, "2020"),
    },
  ];

  for (const service of services) {
    try {
      await service.func();
      console.log(`Perhitungan ${service.name} sukses`);
      toast.add({
        severity: "success",
        summary: "Success Message",
        detail: `Berhasil menghitung ${service.name}`,
        life: 3000,
      });
    } catch (error) {
      console.error(`Gagal update ${service.name}:`, error);
      toast.add({
        severity: "error",
        summary: "Error Message",
        detail: `Gagal menghitung ${service.name}`,
        life: 3000,
      });
    }
  }

  loading.value[0] = false;
};
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Upload {{ pageTitle }}</div>
    <!-- {{ periodeData }} -->
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
          <StepContent
            :pageTitle="pageTitle"
            templateName="CP"
            :endpoint="apiServices.cp"
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
              :disabled="isDisabled[0]"
            />
          </div>
        </StepPanel>
        <StepPanel
          v-slot="{ activateCallback }"
          value="2"
          class="animate-fadein animate-once animate-duration-700"
        >
          <StepContent
            :pageTitle="pageTitle"
            templateName="PY"
            :endpoint="apiServices.py"
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
              :disabled="isDisabled[1]"
            />
          </div>
        </StepPanel>
        <StepPanel
          v-slot="{ activateCallback }"
          value="3"
          class="animate-fadein animate-once animate-duration-700"
        >
          <StepContent
            :pageTitle="pageTitle"
            templateName="PP"
            :endpoint="apiServices.pp"
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
            <Button
              label="Submit"
              :loading="loading[0]"
              icon="pi pi-check"
              iconPos="right"
              @click="calculateCvm"
              :disabled="!isDisabled.every((item) => item === false)"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>
