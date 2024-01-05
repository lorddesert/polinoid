<script lang="ts" setup>
  import { Button } from "@/components/ui/button"

const props = defineProps<{
  to: '/' | '/notes'
}
>()
</script>

<template>
  <Button>
    <router-link :to="props.to">
      <slot></slot>
    </router-link>
  </Button>
</template>

<style></style>