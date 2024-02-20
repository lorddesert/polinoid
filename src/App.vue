<script lang="ts" setup>
import { Ref, ref } from 'vue';
import Header from './components/Header.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { Note } from './models/note';
import { Todo } from './models/todo';

const notes: Ref<Note[]> = ref([])
const todos: Ref<Todo[]> = ref([])
</script>


<template>
  <Header />

  <router-view :all-todos="notes" :all-notes="todos"></router-view>
  <Toaster class=" absolute" />
</template>