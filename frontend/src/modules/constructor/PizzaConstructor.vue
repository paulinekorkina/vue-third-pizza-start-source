<template>
  <app-drop @drop="$emit('drop', $event.id)">
    <div class="content__constructor">
      <div :class="`pizza pizza--foundation--${dough}-${sauce}`">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in filling"
            :key="ingredient.id"
            class="pizza__filling"
            :class="getClassesList(ingredient)"
          ></div>
        </div>
      </div>
    </div>
  </app-drop>
</template>

<script setup>
import AppDrop from '@/common/components/AppDrop.vue';

defineProps({
  dough: {
    type: String,
    required: true,
  },
  sauce: {
    type: String,
    required: true,
  },
  filling: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['drop']);

function getClassesList(ingredient) {
  switch (ingredient.quantity) {
    case 0:
      break;
    case 1:
      return `pizza__filling--${ingredient.value}`;
    case 2:
      return `pizza__filling--${ingredient.value} pizza__filling--second`;
    case 3:
      return `pizza__filling--${ingredient.value} pizza__filling--third`;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/pizza.scss';
</style>
