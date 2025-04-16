import AppLayout from "@/layout/AppLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "", // Path kosong tetap akan merujuk ke Dashboard
        redirect: { name: "dashboard" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "upload-pdb",
        name: "uploadPdb",
        component: () => import("@/views/UploadPdb.vue"),
      },
      {
        path: "upload-sut",
        name: "uploadSut",
        component: () => import("@/views/UploadSut.vue"),
      },
      {
        path: "simulate-cvm",
        name: "simulateCvm",
        component: () => import("@/views/SimulateCvm.vue"),
      },
      {
        path: "evaluate-data",
        name: "evaluateData",
        component: () => import("@/views/EvaluateData.vue"),
      },
      {
        path: "table-sut",
        name: "tableSut",
        component: () => import("@/views/TableSut.vue"),
      },
      {
        path: "table-pdb",
        name: "tablePdb",
        component: () => import("@/views/TablePdb.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
