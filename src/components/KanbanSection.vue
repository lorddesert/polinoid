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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,

} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

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
    <Dialog>
      <DialogTrigger class="mx-auto w-full block">
        <Button variant="ghost" size="lg" class="text-lg mx-auto block w-full" @click="addNewCard">Add new card</Button>
      </DialogTrigger>
      <DialogContent>
        <form action="" class="grid gap-2">
          <label for="note-title">Note title</label>
          <Input type="text" name="note-title" id="note-title" placeholder="Awesome thing!" />
          <label for="note-status">Status</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Where it should go?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="backlog">
                  Backlog
                </SelectItem>
                <SelectItem value="in-progres">
                  In progress
                </SelectItem>
                <SelectItem value="done">
                  Done
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <label for="note-body">Note body</label>
          <Textarea name="note-body" id="note-body" cols="30" rows="10" placeholder="Super history"></Textarea>
        </form>
        <DialogFooter>
          <DialogClose>
            Cancel
          </DialogClose>
          <Button type="submit">Create it!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </Card>
</template>