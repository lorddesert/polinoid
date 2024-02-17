<script lang="ts" setup>
import { Card as CardType } from '../utils/utils';
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import AddNewCardDialog from './AddNewCardDialog.vue'
import KanbanCard from './KanbanCard.vue'

defineProps<{
  title: string,
  cards: CardType[],
  status: string
}>()

</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul class="grid gap-1">
        <template v-for="card in cards">
          <KanbanCard :card="card" />
        </template>
      </ul>
    </CardContent>
    <AddNewCardDialog />
  </Card>
</template>