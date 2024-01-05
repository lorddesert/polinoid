<script lang="ts" setup>
import { Card } from '../utils/utils';

defineProps<{
  title: string,
  cards: Card[],
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
  <section>
    <h2>{{ title }}</h2>
    <ul>
      <template v-for="card in cards">
        <li>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </li>
      </template>
    </ul>
    <button class="new-card-btn" @click="addNewCard">Add new card</button>
  </section>
</template>

<style scoped>
  h2 {
    text-align: center;
  }

  section {
    border: 1px solid black;
    border-radius: 7px;
  }

  .new-card-btn {
    margin: 0 auto;
    display: block;
  }
</style>