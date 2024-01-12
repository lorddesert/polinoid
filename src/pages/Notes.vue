<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea"
import { onMounted, ref } from 'vue';
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'
import CreateNoteButton from './CreateNoteButton.vue'
import DeleteNoteDialog from './DeleteNoteDialog.vue'
import { Note } from '@/models/note';
import { NoteController } from '@/controllers/note';
const props = defineProps<{
  allNotes: Note[]
}>()

const notes = ref(props.allNotes)
const currentNoteID = ref(-1)
const newBody = ref("")
const noteTitle = ref("")
const noteIsDraft = ref(false)

onMounted(() => {
  async function fetchData() {
    const allNotes = await NoteController.getAll()

    notes.value = allNotes
  }

  fetchData()
})

const { toast } = useToast()

function writeDumbText(e: any) {
  newBody.value = e.target.value
}

function selectNote(id: number) {
  const selectedNote = notes.value.find(note => note.id === id)

  if (!selectedNote) return

  newBody.value = selectedNote.body || 'ERR BODY NOT FOUND'
  noteTitle.value = selectedNote.title
  noteIsDraft.value = selectedNote.draft || false

  currentNoteID.value = selectedNote.id || -1
}

function deselectNote() {
  currentNoteID.value = -1
}

async function saveNote() {
  // const newNotes = notes.value.map(note => {
  //   if (note.id === currentNoteID.value) {
  //     return {
  //       id: notes.value.length + 1, // Se puede?, Deberia darlo el BE
  //       title: noteTitle.value,
  //       body: newBody.value,
  //       draft: false
  //     }
  //   }

  //   return note
  // })
  try {

    const selectedNoteIndex = notes.value.findIndex(note => note.id === currentNoteID.value)
    const newNotes = [...notes.value]
    const newNote = {
      id: notes.value.length + 1, // Se puede?, Deberia darlo el BE
      title: noteTitle.value,
      body: newBody.value,
      draft: false
    }

    newNotes[selectedNoteIndex] = {
      id: notes.value.length + 1, // Se puede?, Deberia darlo el BE
      title: noteTitle.value,
      body: newBody.value,
      draft: false
    }

    if (notes.value[selectedNoteIndex].draft) {
      await NoteController.createNote({
        title: noteTitle.value,
        body: newBody.value,
        draft: false
      })

      toast({
        title: 'Note created!',
        // description: `Note : ${selectedNote!.title} has been saved!`,
      });
      
      notes.value = newNotes
      return
    }

    await NoteController.updateNote(newNote)
    notes.value = newNotes

    toast({
      title: 'Note saved!',
      // description: `Note : ${selectedNote!.title} has been saved!`,
    });

  } catch(e) {
    console.log({e})
    toast({
      title: "Error happened when creating/saving note",
      variant: "destructive"
    })
  }
}

async function createNote() {
  const newGenericNote = {
    // ID is just for FE, BE will create it's real ID on save.
    id: (notes.value.at(-1)?.id || 0) + 1,
    title: 'New note',
    body: 'Your awesome note!',
    draft: true
  }

  notes.value = [...notes.value, newGenericNote]

  selectNote(newGenericNote.id)
  // For production?
  // const model = new NoteModel()
  // await model.createNote(newGenericNote)
}

async function deleteNote() {
  const newNotes = notes.value.filter(note => note.id !== currentNoteID.value)

  notes.value = newNotes
  deselectNote()
}
</script>

<template class="">
  <Card class="min-h-96 mx-4">
    <CardHeader>
      <CardTitle>Notes</CardTitle>

    </CardHeader>
    <div class="notes">
      <section>
        <ul class="grid gap-1 px-1">
          <CreateNoteButton :createNote="createNote" />
          <Card class=" min-w-48 border-none" v-for="note in notes">
            <Button @click="selectNote(note.id)" class="block w-full text-left" variant="ghost" v-bind:class="{
              'border border-slate-500': note.id === currentNoteID,
              ' border-amber-100 border-dashed text-amber-100 hover:bg-amber-100 hover:bg-opacity-20': note.draft
            }">{{ note.title }}</Button>
          </Card>
        </ul>
      </section>
      <section v-if="currentNoteID !== -1">

        <Card>
          <CardHeader class="py-2">
            <template v-if="noteIsDraft">
              <Card class="border-amber-600 bg-amber-900 border-dashed border-2 text-amber-400 w-min text-sm">
                <CardHeader>
                  <CardTitle>Draft</CardTitle>
                </CardHeader>
              </Card>
            </template>
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
          <DeleteNoteDialog :deleteNote="deleteNote" />
        </div>
      </section>
      <section v-else>
        <Card class=" text-gray-400 border-dashed h-full">
          <CardHeader>
            <CardTitle class="text-lg">Notes editing ✨</CardTitle>
            <CardDescription class="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
              <span>Click a note to start editing!</span>
            </CardDescription>
          </CardHeader>
        </Card>
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
