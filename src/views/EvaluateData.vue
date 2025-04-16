<script setup>
import cpService from "../api/komponen/cpService";
import uvpyService from "../api/komponen/uvpyService";
import uvppService from "../api/komponen/uvppService";
import uvucService from "../api/komponen/uvucService";
import uichService from "../api/komponen/uichService";
import rasioRefService from "../api/komponen/rasioRefService";
import cvmService from "../api/komponen/cvmService";
import { PAGE_TITLE } from "../config/constants";
import UploadData1 from "../components/UploadData1.vue";
</script>

<template>
  <div
    class="flex flex-col md:flex-row gap-8 animate-enter fade-in-10 zoom-in-50 animate-duration-700"
  >
    <div class="md:w-full">
      <div class="md:w-full">
        <UploadData1 />
      </div>
    </div>
  </div>
</template>
