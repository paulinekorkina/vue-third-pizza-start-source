<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value === min"
      @click="$emit('input', value - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @input="$emit('input', Number($event.target.value))"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': accent }"
      :disabled="value === max"
      @click="$emit('input', value + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  accent: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['input']);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';
@import '@/assets/scss/blocks/counter.scss';
</style>
