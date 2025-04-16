<script setup>
import { useToast } from "primevue";
import { PAGE_TITLE } from "../config/constants";
import TableData from "../components/TableData.vue";
import cpSutService from "../api/sut/cpSutService";
import uvpySutService from "../api/sut/uvpySutService";
import uvppSutService from "../api/sut/uvppSutService";
import uvucSutService from "../api/sut/uvucSutService";
import uichSutService from "../api/sut/uichSutService";
import rasioRefSutService from "../api/sut/rasioRefSutService";
import cvmSutService from "../api/sut/cvmSutService";

const toast = useToast();
const apiServices = {
  cp: cpSutService.getCpsSut,
  py: uvpySutService.getUvpysSut,
  pp: uvppSutService.getUvppsSut,
  uvuc: uvucSutService.getUvucsSut,
  uich: uichSutService.getUichsSut,
  rasioRef: rasioRefSutService.getRasioRefsSut,
  cvm: cvmSutService.getCvmsSut,
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-8 animate-enter fade-in-10 zoom-in-50 animate-duration-700"
  >
    <div class="md:w-full">
      <TableData
        :pageTitle="PAGE_TITLE.SUT"
        :apiServices="apiServices"
        :toast="toast"
      />
    </div>
  </div>
</template>
