<template>
  <app-drop @drop="$emit('drop', $event.value)">
    <div class="content__constructor">
      <div :class="`pizza pizza--foundation--${dough}-${sauce}`">
        <div class="pizza__wrapper">
          <div
            v-for="(amount, ingredient) in filling"
            :key="ingredient"
            class="pizza__filling"
            :class="getClassesList(ingredient, amount)"
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
    type: Object,
    default: () => ({}),
  },
});

defineEmits(['drop']);

function getClassesList(ingredient, count) {
  switch (count) {
    case 0:
      break;
    case 1:
      return `pizza__filling--${ingredient}`;
    case 2:
      return `pizza__filling--${ingredient} pizza__filling--second`;
    case 3:
      return `pizza__filling--${ingredient} pizza__filling--third`;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/blocks/pizza.scss';
</style>
