import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '~/stores/notes'
import { useUndoRedo } from './useUndoRedo'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'
import type { Note, Todo } from '~/types/note'

export const useNoteForm = (initialNote?: Note) => {
    const router = useRouter()
    const store = useNotesStore()

    const errorMessage = ref<string | null>(null)

    const initialState = {
        title: initialNote?.title ?? '',
        todos: initialNote
            ? JSON.parse(JSON.stringify(initialNote.todos))
            : [
                {
                    id: crypto.randomUUID(),
                    text: '',
                    completed: false
                }
            ]
    }

    const { state, snapshot, undo, redo } =
        useUndoRedo(initialState)

    useKeyboardShortcuts(undo, redo)

    const title = computed({
        get: () => state.value.title,
        set: (val: string) => {
            snapshot()
            state.value.title = val
        }
    })

    const todos = computed(() => state.value.todos)

    const addTodo = () => {
        snapshot()
        state.value.todos.push({
            id: crypto.randomUUID(),
            text: '',
            completed: false
        })
    }

    const removeTodo = (id: string) => {
        snapshot()
        state.value.todos =
            state.value.todos.filter(t => t.id !== id)
    }

    const updateTodoText = (payload: {
        id: string
        text: string
    }) => {
        snapshot()
        const todo = state.value.todos.find(
            t => t.id === payload.id
        )
        if (todo) todo.text = payload.text
    }

    const toggleTodo = (id: string) => {
        snapshot()
        const todo = state.value.todos.find(
            t => t.id === id
        )
        if (todo) todo.completed = !todo.completed
    }

    const validate = () => {
        if (!state.value.title.trim()) {
            errorMessage.value = 'Название заметки обязательно'
            return false
        }

        errorMessage.value = null
        return true
    }

    const save = () => {
        if (!validate()) return

        const prepared: Note = {
            id: initialNote?.id ?? crypto.randomUUID(),
            title: state.value.title.trim(),
            todos: state.value.todos.filter(t => t.text.trim())
        }

        if (initialNote) {
            store.replaceNote(initialNote.id, prepared)
        } else {
            store.createNote(prepared)
        }

        router.push('/')
    }

    const cancel = () => {
        router.push('/')
    }

    return {
        title,
        todos,
        errorMessage,
        addTodo,
        removeTodo,
        updateTodoText,
        toggleTodo,
        undo,
        redo,
        save,
        cancel
    }
}