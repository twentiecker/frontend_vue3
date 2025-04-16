<script setup>
import UploadData from "../components/UploadData.vue";
import cpService from "../api/komponen/cpService";
import uvpyService from "../api/komponen/uvpyService";
import uvppService from "../api/komponen/uvppService";
import uvucService from "../api/komponen/uvucService";
import uichService from "../api/komponen/uichService";
import rasioRefService from "../api/komponen/rasioRefService";
import cvmService from "../api/komponen/cvmService";
import { PAGE_TITLE } from "../config/constants";

const apiServices = {
  cp: cpService.updateCps,
  py: uvpyService.updateUvpys,
  pp: uvppService.updateUvpps,
  uvuc: uvucService.updateUvucs,
  uich: uichService.updateUichs,
  rasioRef: rasioRefService.updateRasioRefs,
  cvm: cvmService.updateCvms,
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-8 animate-enter fade-in-10 zoom-in-50 animate-duration-700"
  >
    <div class="md:w-full">
      <div class="md:w-full">
        <UploadData :pageTitle="PAGE_TITLE.PDB" :apiServices="apiServices" />
      </div>
    </div>
  </div>
</template>
