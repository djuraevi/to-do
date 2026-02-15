<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const close = () => {
  emit('update:modelValue', false)
}

const confirm = () => {
  emit('confirm')
  close()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay">
      <div class="modal">
        <h3>Удалить заметку "{{ title }}"</h3>

        <div class="modal-content">
          <slot />
        </div>

        <div class="modal-actions">
          <button
              type="button"
              class="btn btn--secondary"
              @click="close">Отмена</button>

          <button
              type="button"
              class="btn btn--delete"
              @click="confirm">Подтвердить</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>