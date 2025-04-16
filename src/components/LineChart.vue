<script setup>
import { useLayout } from "@/layout/composables/layout";
import { onMounted, ref, watch } from "vue";

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const props = defineProps({
  chartTitle: String,
  data: Object,
});
const lineData = ref(null);
const lineOptions = ref(null);

onMounted(() => {
  setColorOptions();
});
const setColorOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  lineData.value = {
    labels: ["2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4"],
    datasets: [
      {
        label: "2024",
        data: props.data.first,
        fill: false,
        backgroundColor: documentStyle.getPropertyValue("--p-primary-500"),
        borderColor: documentStyle.getPropertyValue("--p-primary-500"),
        tension: 0.4,
      },
      {
        label: "2023",
        data: props.data.second,
        fill: false,
        backgroundColor: documentStyle.getPropertyValue("--p-primary-200"),
        borderColor: documentStyle.getPropertyValue("--p-primary-200"),
        tension: 0.4,
      },
    ],
  };

  lineOptions.value = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          fontColor: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
watch(
  [getPrimary, getSurface, isDarkTheme],
  () => {
    setColorOptions();
  },
  { immediate: true }
);

// const chartData = ref(null);
// const chartOptions = ref(null);

// function setChartData() {
//   const documentStyle = getComputedStyle(document.documentElement);

//   return {
//     labels: ["PKRT", "PKLNPRT", "PKP", "PMTB", "PI", "EKSPOR", "IMPOR"],
//     datasets: [
//       {
//         type: "line",
//         label: "2024 Q3",
//         fill: false,
//         backgroundColor: documentStyle.getPropertyValue("--p-primary-200"),
//         borderColor: documentStyle.getPropertyValue("--p-primary-200"),
//         data: props.data.first,
//         tension: 0.4,
//       },
//       {
//         type: "line",
//         label: "2024 Q4",
//         fill: false,
//         backgroundColor: documentStyle.getPropertyValue("--p-primary-400"),
//         borderColor: documentStyle.getPropertyValue("--p-primary-400"),
//         data: props.data.second,
//         tension: 0.4,
//       },
//     ],
//   };
// }

// function setChartOptions() {
//   const documentStyle = getComputedStyle(document.documentElement);
//   const borderColor = documentStyle.getPropertyValue("--surface-border");
//   const textMutedColor = documentStyle.getPropertyValue(
//     "--text-color-secondary"
//   );

//   return {
//     maintainAspectRatio: false,
//     aspectRatio: 0.8,
//     scales: {
//       x: {
//         ticks: {
//           color: textMutedColor,
//         },
//         grid: {
//           color: "transparent",
//           borderColor: "transparent",
//         },
//       },
//       y: {
//         ticks: {
//           color: textMutedColor,
//         },
//         grid: {
//           color: borderColor,
//           borderColor: "transparent",
//           drawTicks: false,
//         },
//       },
//     },
//   };
// }

// watch([getPrimary, getSurface, isDarkTheme], () => {
//   chartData.value = setChartData();
//   chartOptions.value = setChartOptions();
// });

// onMounted(() => {
//   chartData.value = setChartData();
//   chartOptions.value = setChartOptions();
// });
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">{{ chartTitle }}</div>
    <!-- <Chart type="line" :data="chartData" :options="chartOptions" class="h-80" /> -->
    <Chart type="line" :data="lineData" :options="lineOptions" class="h-80" />
  </div>
</template>
