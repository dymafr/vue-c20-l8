<template>
  <div class="d-flex flex-fill">
    <input v-model="input" type="text" class="mr-20 flex-fill" />
    <button @click="emit('cancel')" class="btn btn-danger mr-20">
      Annuler
    </button>
    <button @click="emit('update', input)" class="btn btn-primary">
      Sauvegarder
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ content: string }>();

const emit = defineEmits<{
  (e: 'cancel');
  (e: 'update', updatedContent: string);
}>();

const input = ref<string>(props.content);
</script>

<style lang="scss"></style>
