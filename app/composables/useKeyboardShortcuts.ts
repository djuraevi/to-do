import { onMounted, onBeforeUnmount } from 'vue'

export function useKeyboardShortcuts(
    undo: () => void,
    redo: () => void
) {
    const handler = (e: KeyboardEvent) => {
        const isMac = navigator.platform
            .toUpperCase()
            .includes('MAC')

        const ctrlKey = isMac ? e.metaKey : e.ctrlKey
        if (!ctrlKey) return

        if (e.key.toLowerCase() === 'z' && !e.shiftKey) {
            e.preventDefault()
            undo()
        }

        if (
            (e.key.toLowerCase() === 'z' && e.shiftKey) ||
            e.key.toLowerCase() === 'y'
        ) {
            e.preventDefault()
            redo()
        }
    }

    onMounted(() => {
        window.addEventListener('keydown', handler)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handler)
    })
}