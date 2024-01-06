<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ref } from 'vue';
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
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
const noteTitle = ref("")

const { toast } = useToast()

function writeDumbText(e: any) {
  newBody.value = e.target.value
}

function selectNote(id: number) {
  const selectedNote = notes.value.find(note => note.id === id)

  newBody.value = selectedNote!.body
  noteTitle.value = selectedNote!.title

  currentNoteID.value = selectedNote!.id
}

function saveNote() {
  const newNotes = notes.value.map(note => {
    if (note.id === currentNoteID.value) {
      return {
        id: notes.value.length + 1, // Se puede?, Deberia darlo el BE
        title: noteTitle.value,
        body: newBody.value
      }
    }

    return note
  })

  notes.value = newNotes

  toast({
    title: 'Note saved!',
    // description: `Note : ${selectedNote!.title} has been saved!`,
  });
}
</script>

<template>
  <Card class="min-h-96">
    <CardHeader>
      <CardTitle>Notes</CardTitle>

    </CardHeader>
    <div class="notes">
      <section>
        <ul class="grid gap-1 px-1">
          <Card class=" min-w-48" v-for="note in notes">
            <Button @click="selectNote(note.id)" :class="note.id === currentNoteID && 'border border-slate-500'"
              class="block w-full text-left" variant="ghost">{{ note.title }}</Button>
          </Card>
        </ul>
      </section>
      <section v-if="currentNoteID !== -1">

        <Card>
          <CardHeader class="py-2">
            <Input class=" border-t-0 border-l-0 border-r-0 rounded-none" v-model="noteTitle" />
            <!-- <CardTitle contenteditable spellcheck="false" >
              {{ notes?.find(note => note.id === currentNoteID)?.title || '' }}
            </CardTitle> -->
          </CardHeader>
          <Textarea class=" rounded-t-none border-none outline-none" name="note" id="note" cols="30" rows="10"
            @input="writeDumbText" v-model="newBody"></Textarea>
        </Card>
        <div class="my-2 flex gap-1">
          <Button @click="saveNote" class="bg-teal-600 hover:bg-teal-700">Save Note</Button>
          <Dialog>
            <DialogTrigger>
              <Button @click="" variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete note</DialogTitle>
                <DialogDescription>
                  Are you sure you want to DELETE that note?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose>
                  <Button @click="" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button @click="" variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

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
