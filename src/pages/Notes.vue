<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ref } from 'vue';
const notes = ref([
  {
    id: 1,
    title: 'asd 1',
    body: 'Body 1'
  },
  {
    id: 2,
    title: 'asd 21',
    body: 'Body 2'
  },
])

const currentNoteID = ref(-1)
const newBody = ref("")
const dumbText = ref("Dumb")
function writeDumbText(e: any) {
  newBody.value = e.target.value
}

function selectNote(id: number) {
  const selectedNote = notes.value.find(note => note.id === id)

  newBody.value = selectedNote!.body

  currentNoteID.value = selectedNote!.id
}

function saveNote() {
  const newNotes = notes.value.map(note => {
    if (note.id === currentNoteID.value) {
      const { title } = note
      return {
        id: notes.value.length + 1, // Se puede?, Deberia darlo el BE
        title,
        body: newBody.value
      }
    }

    return note
  })

  notes.value = newNotes
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Notes</CardTitle>

    </CardHeader>
    <div class="notes">
      <section>
        <ul class="grid gap-1 px-1">
          <Card class=" min-w-48" v-for="note in notes">
            <Button @click="selectNote(note.id)" class="block w-full text-left" variant="ghost">{{ note.title }}</Button>
          </Card>
        </ul>
      </section>
      <section>

        <Textarea name="note" id="note" cols="30" rows="10" @input="writeDumbText" v-model="newBody"></Textarea>
        <Button @click="saveNote" class=" my-2 bg-teal-600 hover:bg-teal-700 mr-4">Save Note</Button>
        <Alert class="my-2">
          <AlertTitle>Dumb text:</AlertTitle>
          <AlertDescription>{{ dumbText }}</AlertDescription>
        </Alert>
      </section>
    </div>
  </Card>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

.notes {
  display: grid;
  grid-template-columns: auto 1fr;

}
</style>
