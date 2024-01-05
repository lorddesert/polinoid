<script setup lang="ts">
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
      const {title} = note
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
  <h1>Notes</h1>
  <div class="notes">
    <section>
      <ul v-for="note in notes">
        <li>
          <button @click="selectNote(note.id)">{{ note.title }}</button>
        </li>
      </ul>
    </section>
    <section>

      <button @click="saveNote" >Save Note</button>
      <code>{{ dumbText }}</code>
      <textarea name="note" id="note" cols="30" rows="10" @input="writeDumbText" v-model="newBody"></textarea>
    </section>
  </div>
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

textarea {
  width: 100%;
  background-color: inherit;
  border: 1px solid gray;
  color: #fafafa;
  font-size: 1rem;
}
</style>
