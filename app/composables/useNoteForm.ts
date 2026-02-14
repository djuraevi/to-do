import { ref } from 'vue'
import { useNotesStore } from '~/stores/notes'
import { useRouter } from 'vue-router'
import type { Note } from '~/types/note'

export const useNoteForm = (initialNote?: Note) => {
    const router = useRouter()
    const notesStore = useNotesStore()

    const title = ref(initialNote?.title ?? '')

    const todos = ref(
        initialNote
            ? structuredClone(toRaw(initialNote.todos))
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

    const updateTodoText = (payload: { id: string; text: string }) => {
        const todo = todos.value.find(t => t.id === payload.id)
        if (!todo) return
        todo.text = payload.text
    }

    const toggleTodo = (id: string) => {
        const todo = todos.value.find(t => t.id === id)
        if (!todo) return
        todo.completed = !todo.completed
    }

    const save = () => {
        if (!title.value.trim()) return

        const prepared: Note = {
            id: initialNote?.id ?? crypto.randomUUID(),
            title: title.value.trim(),
            todos: structuredClone(
                toRaw(todos.value).filter(t => t.text.trim())
            )
        }

        if (initialNote) {
            notesStore.replaceNote(initialNote.id, prepared)
        } else {
            notesStore.createNote(prepared)
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
        updateTodoText,
        toggleTodo,
        save,
        cancel
    }
}