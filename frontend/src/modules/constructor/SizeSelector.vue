<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="sizeType in items"
          :key="sizeType.id"
          :class="`diameter__input diameter__input--${sizeType.value}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="sizeType.value"
            :checked="sizeType.value === modelValue"
            class="visually-hidden"
            @input="$emit('update:modelValue', sizeType.value)"
          />
          <span>{{ sizeType.name }}</span>
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
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/diameter.scss';
</style>
