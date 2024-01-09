<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from './components/Header.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <Header />

  <router-view></router-view>
  <Toaster class=" absolute" />
</template>