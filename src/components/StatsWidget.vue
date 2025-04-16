<template>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div
      v-animateonscroll="{
        enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
      }"
      class="card mb-0"
    >
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">CVM</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            4.750,20 Triliun
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-chart-bar text-blue-500 !text-xl"></i>
        </div>
      </div>
      <span class="text-primary font-medium">2024 </span>
      <span class="text-muted-color">Q4</span>
    </div>
  </div>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div
      v-animateonscroll="{
        enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
      }"
      class="card mb-0"
    >
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">Y-on-Y</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            0,29 %
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-calendar text-orange-500 !text-xl"></i>
        </div>
      </div>
      <span class="text-primary font-medium">2024 </span>
      <span class="text-muted-color">Q4</span>
    </div>
  </div>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div
      v-animateonscroll="{
        enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
      }"
      class="card mb-0"
    >
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">Q-to-Q</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            0,95 %
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-hourglass text-cyan-500 !text-xl"></i>
        </div>
      </div>
      <span class="text-primary font-medium">2024 </span>
      <span class="text-muted-color">Q4</span>
    </div>
  </div>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div
      v-animateonscroll="{
        enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-700',
      }"
      class="card mb-0"
    >
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">IPD</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            130
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border"
          style="width: 2.5rem; height: 2.5rem"
        >
          <i class="pi pi-sort-numeric-up text-purple-500 !text-xl"></i>
        </div>
      </div>
      <span class="text-primary font-medium">2024 </span>
      <span class="text-muted-color">Q4</span>
    </div>
  </div>
</template>
