import { ref } from 'vue'
import { useNotesStore } from '~/stores/notes'
import { useRouter } from 'vue-router'
import type { Note } from '~/types/note'

export const useNoteForm = (initialNote?: Note) => {
    const router = useRouter()
    const notesStore = useNotesStore()

    const title = ref(initialNote?.title || '')
    const todos = ref(
        initialNote
            ? JSON.parse(JSON.stringify(initialNote.todos))
            : [
                {
                    id: crypto.randomUUID(),
                    text: '',
                    completed: false
                }
            ]
    )

    const addTodo = () => {
        todos.value.push({
            id: crypto.randomUUID(),
            text: '',
            completed: false
        })
    }

    const removeTodo = (id: string) => {
        todos.value = todos.value.filter(t => t.id !== id)
    }

    const save = () => {
        if (!title.value.trim()) return

        if (initialNote) {
            notesStore.updateNote(initialNote.id, title.value)

            const note = notesStore.notes.find(n => n.id === initialNote.id)
            if (note) {
                note.todos = todos.value.filter(t => t.text.trim() !== '')
            }
        } else {
            notesStore.notes.push({
                id: crypto.randomUUID(),
                title: title.value,
                todos: todos.value.filter(t => t.text.trim() !== '')
            })
        }

        router.push('/')
    }

    const cancel = () => {
        router.push('/')
    }

    return {
        title,
        todos,
        addTodo,
        removeTodo,
        save,
        cancel
    }
}