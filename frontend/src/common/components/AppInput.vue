<template :class="{ 'input--error': showError }">
  <!-- <div class="text-field"> -->
  <input
    :value="modelValue"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    @input="emit('update:modelValue', $event.target.value)"
  />
  <span v-if="showError" class="error">
    {{ errorText }}
  </span>
  <!-- </div> -->
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorText: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

// const input = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(value) {
//     emit('update:modelValue', value);
//   },
// });

const showError = computed(() => {
  return !!props.errorText;
});
</script>
