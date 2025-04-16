<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Home",
    items: [
      { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
      {
        label: "Upload Data",
        icon: "pi pi-fw pi-cloud-upload",
        items: [
          {
            label: "SUT",
            icon: "pi pi-fw pi-sitemap",
            to: "/upload-sut",
          },
          {
            label: "PDB",
            icon: "pi pi-fw pi-money-bill",
            to: "/upload-pdb",
          },
        ],
      },
      {
        label: "Evaluasi Data",
        icon: "pi pi-fw pi-link",
        to: "/evaluate-data",
      },
      // {
      //   label: "Simulasi CVM",
      //   icon: "pi pi-fw pi-calculator",
      //   to: "/simulate-cvm",
      // },
      {
        label: "Tabulasi Data",
        icon: "pi pi-fw pi-table",
        items: [
          {
            label: "SUT",
            icon: "pi pi-fw pi-sitemap",
            to: "/table-sut",
          },
          {
            label: "PDB",
            icon: "pi pi-fw pi-money-bill",
            to: "/table-pdb",
          },
        ],
      },
      // { label: "Tabel CVM", icon: "pi pi-fw pi-table", to: "/tables" },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style scoped></style>
