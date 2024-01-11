<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import Header from './components/Header.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { TodoController } from '@/controllers/todo.ts'
import { NoteController } from '@/controllers/note.ts'
import { Note } from './models/note';
import { Todo } from './models/todo';

const notes: Ref<Note[]> = ref([])
const todos: Ref<Todo[]> = ref([])

onMounted(async () => {
  const allTodos = await TodoController.getAll()
  const allNotes = await NoteController.getAll()

  todos.value = allTodos
  notes.value = allNotes

  console.log(allTodos, allNotes)
})
</script>


<template>
  <Header />

  <router-view></router-view>
  <Toaster class=" absolute" />
</template>