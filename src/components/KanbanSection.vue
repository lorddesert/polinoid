<script lang="ts" setup>
import { Card as CardType } from '../utils/utils';
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  // CardDescription,
  // CardFooter,
} from '@/components/ui/card'
import { Button } from './ui/button';

defineProps<{
  title: string,
  cards: CardType[],
  status: string
}>()


function addNewCard() {
  /* 
    KabanController.createCard(cardInfo)
    KanbanController.getAllCards()

    updateCards() // get all the cards again, instead of just this group. There will be no much for now, so no problem.
  */
}
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul>
        <template v-for="card in cards">
          <li>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </li>
        </template>
      </ul>
    </CardContent>
    <Button variant="ghost" size="lg" class="text-lg mx-auto block w-full" @click="addNewCard">Add new card</Button>
  </Card>
</template>