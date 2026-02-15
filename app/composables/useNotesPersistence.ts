import { watch } from 'vue'
import { useNotesStore } from '~/stores/notes'

const STORAGE_KEY = 'notes-storage'

export const useNotesPersistence = () => {
    const store = useNotesStore()

    if (process.client) {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            store.notes = JSON.parse(saved)
        }

        watch(
            () => store.notes,
            (value) => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
            },
            { deep: true }
        )
    }
}