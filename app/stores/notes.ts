import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Note } from '~/types/note'

const MAX_HISTORY = 50

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<Note[]>([])
    const history = ref<Note[][]>([])
    const future = ref<Note[][]>([])

    const clone = <T>(data: T): T =>
        JSON.parse(JSON.stringify(data))

    const loadFromStorage = () => {
        if (!import.meta.client) return

        const saved = localStorage.getItem('notes')
        if (saved) {
            notes.value = JSON.parse(saved)
        }
    }

    loadFromStorage()

    watch(
        notes,
        () => {
            if (!import.meta.client) return
            localStorage.setItem('notes', JSON.stringify(notes.value))
        },
        { deep: true }
    )

    const snapshot = () => {
        const cloned = clone(notes.value)
        const last = history.value[history.value.length - 1]

        if (JSON.stringify(cloned) === JSON.stringify(last)) return

        history.value.push(cloned)

        if (history.value.length > MAX_HISTORY) {
            history.value.shift()
        }

        future.value = []
    }

    const undo = () => {
        if (!history.value.length) return

        future.value.push(clone(notes.value))
        notes.value = history.value.pop()!
    }

    const redo = () => {
        if (!future.value.length) return

        history.value.push(clone(notes.value))
        notes.value = future.value.pop()!
    }

    const createNote = (note: Note) => {
        snapshot()
        notes.value.push(clone(note))
    }

    const replaceNote = (id: string, newNote: Note) => {
        const index = notes.value.findIndex(n => n.id === id)
        if (index === -1) return

        snapshot()
        notes.value[index] = clone(newNote)
    }

    const deleteNote = (id: string) => {
        const index = notes.value.findIndex(n => n.id === id)
        if (index === -1) return

        snapshot()
        notes.value.splice(index, 1)
    }

    return {
        notes,
        createNote,
        replaceNote,
        deleteNote,
        undo,
        redo
    }
})