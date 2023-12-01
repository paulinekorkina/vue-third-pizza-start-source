<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="doughType in items"
          :key="doughType.id"
          :class="`dough__input dough__input--${doughType.value}`"
        >
          <input
            type="radio"
            name="dough"
            :value="doughType.id"
            :checked="doughType.id == modelValue"
            class="visually-hidden"
            @input="$emit('update:modelValue', doughType.id)"
          />
          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/dough.scss';
</style>
