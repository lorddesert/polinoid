import "./assets/index.css"
// import "./styles.css";

import { createApp } from "vue";
import App from "./App.vue";
import Kanban from './pages/Kanban.vue'
import Notes from './pages/Notes.vue'

import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {path: '/', component: Kanban},
  {path: '/notes', component: Notes},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.mount("#app");