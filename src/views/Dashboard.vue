<script setup>
import BarChart from "../components/BarChart.vue";
import LineChart from "../components/LineChart.vue";
import StatsWidget from "../components/StatsWidget.vue";
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <StatsWidget />

    <div class="col-span-12 xl:col-span-6">
      <BarChart
        v-animateonscroll="{
          enterClass:
            'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
        }"
        chartTitle="CVM"
        :data="{
          first: [3963.53, 4069.31, 4204.13, 4243.87],
          second: [3921.92, 4041.61, 4076.8, 4231.49],
        }"
      />
      <LineChart
        v-animateonscroll="{
          enterClass:
            'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
        }"
        chartTitle="Q-to-Q"
        :data="{
          first: [-6.33, 2.67, 3.31, 0.95],
          second: [5.25, 3.05, 0.87, 3.79],
        }"
      />
    </div>
    <div class="col-span-12 xl:col-span-6">
      <BarChart
        v-animateonscroll="{
          enterClass:
            'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
        }"
        chartTitle="IPD"
        :data="{
          first: [128, 130, 130, 130],
          second: [121, 121, 121, 122],
        }"
      />
      <LineChart
        v-animateonscroll="{
          enterClass:
            'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
        }"
        chartTitle="Y-on-Y"
        :data="{
          first: [1.06, 0.69, 3.12, 0.29],
          second: [1.26, 1.21, 0.87, 2.23],
        }"
      />
    </div>
  </div>
</template>
