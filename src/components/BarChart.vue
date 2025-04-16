<script setup>
import { useLayout } from "@/layout/composables/layout";
import { onMounted, ref, watch } from "vue";

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const props = defineProps({
  chartTitle: String,
  data: Object,
});
const barData = ref(null);
const barOptions = ref(null);

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

  barData.value = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "2024",
        backgroundColor: documentStyle.getPropertyValue("--p-primary-500"),
        borderColor: documentStyle.getPropertyValue("--p-primary-500"),
        data: props.data.first,
      },
      {
        label: "2023",
        backgroundColor: documentStyle.getPropertyValue("--p-primary-200"),
        borderColor: documentStyle.getPropertyValue("--p-primary-200"),
        data: props.data.second,
      },
    ],
  };
  barOptions.value = {
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
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
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
//         type: "bar",
//         label: "2024 Q3",
//         backgroundColor: documentStyle.getPropertyValue("--p-primary-200"),
//         borderColor: documentStyle.getPropertyValue("--p-primary-200"),
//         data: props.data.first,
//       },
//       {
//         type: "bar",
//         label: "2024 Q4",
//         backgroundColor: documentStyle.getPropertyValue("--p-primary-400"),
//         borderColor: documentStyle.getPropertyValue("--p-primary-400"),
//         data: props.data.second,
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
    <!-- <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" /> -->
    <Chart type="bar" :data="barData" :options="barOptions" class="h-80" />
  </div>
</template>
