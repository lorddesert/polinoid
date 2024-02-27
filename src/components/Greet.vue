<script setup lang="ts">
import { Ref, ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { TodoController } from "../controllers/todo.js"
import { Todo } from "@/models/todo";

const greetMsg = ref("");
const name = ref("");
const todos: Ref<Todo[] | null>  = ref(null)

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
  const result = await TodoController.getAll()

  todos.value = result
}
</script>

<template>
  <form class="row" @submit.prevent="greet">
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>
  </form>

  <p>{{ greetMsg }}</p>
  <code>{{ todos ? JSON.stringify(todos) : null }}</code>
</template>
