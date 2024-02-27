import { useToast } from '@/components/ui/toast/use-toast'
import { NoteController } from '@/controllers/note';
import { Ref, ref } from 'vue'
import { Note } from '@/models/note';

const { toast } = useToast()
export const notes: Ref<Note[]> = ref([])
export const currentNoteID = ref(-1)
export const newBody = ref("")
export const noteTitle = ref("")
export const noteIsDraft = ref(false)

// !QUE HACE?
export function writeDumbText(e: any) {
    newBody.value = e.target.value
}

export function selectNote(id: number) {
    if (!notes.value) {
        console.error(`Notes was FALSY`)
    }

    const selectedNote = notes.value.find(note => note.id === id)

    if (!selectedNote) return

    newBody.value = selectedNote.body || 'ERR BODY NOT FOUND'
    noteTitle.value = selectedNote.title
    noteIsDraft.value = selectedNote.draft || false

    currentNoteID.value = selectedNote.id || -1
}

export function deselectNote() {
    currentNoteID.value = -1
}

export async function saveNote() {
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
                id: -1,
                title: noteTitle.value,
                body: newBody.value,
                draft: false
            })

            toast({
                title: 'Note created!',
                // description: `Note : ${selectedNote!.title} has been saved!`,
            });

            deselectNote()

            notes.value = newNotes
            return
        }

        await NoteController.updateNote(newNote)
        notes.value = newNotes

        toast({
            title: 'Note saved!',
            // description: `Note : ${selectedNote!.title} has been saved!`,
        });

    } catch (e) {
        console.log({ e })
        toast({
            title: "Error happened when creating/saving note",
            variant: "destructive"
        })
    }
}

export async function createNote() {
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

export async function deleteNote() {
    const selectedNote = notes.value.find(note => note.id === currentNoteID.value)

    // const newNotes = notes.value.filter(note => note.id !== currentNoteID.value)
    // notes.value = newNotes
    // deselectNote()

    //@ts-ignore
    await NoteController.deleteNote(selectedNote)

    deselectNote()
    fetchData()
}

export async function fetchData() {
    const allNotes = await NoteController.getAll()

    notes.value = allNotes
}
