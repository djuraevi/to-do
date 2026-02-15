import { ref } from 'vue'

const MAX_HISTORY = 50

export function useUndoRedo<T>(initialState: T) {
    const history = ref<T[]>([])
    const future = ref<T[]>([])
    const state = ref<T>(initialState)

    const clone = (data: T): T =>
        JSON.parse(JSON.stringify(data))

    const snapshot = () => {
        history.value.push(clone(state.value))

        if (history.value.length > MAX_HISTORY) {
            history.value.shift()
        }

        future.value = []
    }

    const undo = () => {
        if (!history.value.length) return

        future.value.push(clone(state.value))
        state.value = history.value.pop()!
    }

    const redo = () => {
        if (!future.value.length) return

        history.value.push(clone(state.value))
        state.value = future.value.pop()!
    }

    return {
        state,
        snapshot,
        undo,
        redo
    }
}