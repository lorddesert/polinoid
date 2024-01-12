<script lang="ts" setup>
import { Ref, ref } from 'vue';
import Header from './components/Header.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
// import { TodoController } from '@/controllers/todo.ts'
// import { NoteController } from '@/controllers/note.ts'
import { Note } from './models/note';
import { Todo } from './models/todo';

const notes: Ref<Note[]> = ref([])
const todos: Ref<Todo[]> = ref([])

// onMounted(() => {
//   async function fetchInitialData() {
//     const allTodos = await TodoController.getAll()
//     const allNotes = await NoteController.getAll()

//     todos.value = allTodos
//     notes.value = allNotes

//     console.log(allTodos, allNotes)
//   }

//   fetchInitialData()
// })
</script>


<template>
  <Header />

  <router-view :all-todos="notes" :all-notes="todos"></router-view>
  <Toaster class=" absolute" />
  <pre>
    <code>
      {{ JSON.stringify(notes, null, 2) }}
    </code>
  </pre>
</template>