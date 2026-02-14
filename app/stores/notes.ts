import { defineStore } from 'pinia'
import { ref, watch, toRaw } from 'vue'
import type { Note } from '~/types/note'

const MAX_HISTORY = 50

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<Note[]>([])
    const history = ref<Note[][]>([])
    const future = ref<Note[][]>([])

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
            localStorage.setItem('notes', JSON.stringify(toRaw(notes.value)))
        },
        { deep: true }
    )

    const snapshot = () => {
        const cloned = structuredClone(toRaw(notes.value))

        const last =
            history.value.length > 0
                ? history.value[history.value.length - 1]
                : null

        if (JSON.stringify(cloned) === JSON.stringify(last)) return

        history.value.push(cloned)

        if (history.value.length > MAX_HISTORY) {
            history.value.shift()
        }

        future.value = []
    }

    const undo = () => {
        if (!history.value.length) return

        future.value.push(structuredClone(toRaw(notes.value)))
        notes.value = history.value.pop()!
    }

    const redo = () => {
        if (!future.value.length) return

        history.value.push(structuredClone(toRaw(notes.value)))
        notes.value = future.value.pop()!
    }

    const createNote = (note: Note) => {
        snapshot()
        notes.value.push(structuredClone(note))
    }

    const replaceNote = (id: string, newNote: Note) => {
        const index = notes.value.findIndex(n => n.id === id)
        if (index === -1) return

        snapshot()
        notes.value[index] = structuredClone(newNote)
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