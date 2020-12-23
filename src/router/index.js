import Vue from "vue";
import VueRouter from "vue-router";
import ClientList from "../views/ClientList.vue";
import CreateClient from "../views/CreateClient.vue";
import ClientDetails from "../views/ClientDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ClientList",
    component: ClientList,
  },
  {
    path: "/create",
    name: "CreateClient",
    component: CreateClient,
  },
  {
    path: "/client/:id",
    name: "ClientDetails",
    component: ClientDetails,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
