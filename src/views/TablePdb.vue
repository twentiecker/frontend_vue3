<script setup>
import { useToast } from "primevue";
import { PAGE_TITLE } from "../config/constants";
import TableData from "../components/TableData.vue";
import cpService from "../api/komponen/cpService";
import uvpyService from "../api/komponen/uvpyService";
import uvppService from "../api/komponen/uvppService";
import uvucService from "../api/komponen/uvucService";
import uichService from "../api/komponen/uichService";
import rasioRefService from "../api/komponen/rasioRefService";
import cvmService from "../api/komponen/cvmService";

const toast = useToast();
const apiServices = {
  cp: cpService.getCps,
  py: uvpyService.getUvpys,
  pp: uvppService.getUvpps,
  uvuc: uvucService.getUvucs,
  uich: uichService.getUichs,
  rasioRef: rasioRefService.getRasioRefs,
  cvm: cvmService.getCvms,
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-8 animate-enter fade-in-10 zoom-in-50 animate-duration-700"
  >
    <div class="md:w-full">
      <TableData
        :pageTitle="PAGE_TITLE.PDB"
        :apiServices="apiServices"
        :toast="toast"
      />
    </div>
  </div>
</template>
