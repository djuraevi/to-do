import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Note } from '~/types/note'

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<Note[]>([])

    const addNote = (title: string) => {
        notes.value.push({
            id: crypto.randomUUID(),
            title,
            todos: []
        })
    }

    const deleteNote = (id: string) => {
        notes.value = notes.value.filter(n => n.id !== id)
    }

    const updateNote = (id: string, title: string) => {
        const note = notes.value.find(n => n.id === id)
        if (note) note.title = title
    }

    const addTodo = (noteId: string, text: string) => {
        const note = notes.value.find(n => n.id === noteId)
        if (!note) return

        note.todos.push({
            id: crypto.randomUUID(),
            text,
            completed: false
        })
    }

    const toggleTodo = (noteId: string, todoId: string) => {
        const note = notes.value.find(n => n.id === noteId)
        if (!note) return

        const todo = note.todos.find(t => t.id === todoId)
        if (todo) todo.completed = !todo.completed
    }

    const deleteTodo = (noteId: string, todoId: string) => {
        const note = notes.value.find(n => n.id === noteId)
        if (!note) return

        note.todos = note.todos.filter(t => t.id !== todoId)
    }

    return {
        notes,
        addNote,
        deleteNote,
        updateNote,
        addTodo,
        toggleTodo,
        deleteTodo
    }
})