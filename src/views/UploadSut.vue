<script setup>
import UploadData from "../components/UploadData.vue";
import cpSutService from "../api/sut/cpSutService";
import uvpySutService from "../api/sut/uvpySutService";
import uvppSutService from "../api/sut/uvppSutService";
import uvucSutService from "../api/sut/uvucSutService";
import uichSutService from "../api/sut/uichSutService";
import rasioRefSutService from "../api/sut/rasioRefSutService";
import cvmSutService from "../api/sut/cvmSutService";
import { PAGE_TITLE } from "../config/constants";

const apiServices = {
  cp: cpSutService.updateCpsSut,
  py: uvpySutService.updateUvpysSut,
  pp: uvppSutService.updateUvppsSut,
  uvuc: uvucSutService.updateUvucsSut,
  uich: uichSutService.updateUichsSut,
  rasioRef: rasioRefSutService.updateRasioRefsSut,
  cvm: cvmSutService.updateCvmsSut,
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-8 animate-enter fade-in-10 zoom-in-50 animate-duration-700"
  >
    <div class="md:w-full">
      <UploadData :pageTitle="PAGE_TITLE.SUT" :apiServices="apiServices" />
    </div>
  </div>
</template>
