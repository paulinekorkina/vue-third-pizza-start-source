<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in items"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <app-drag
          :draggable="values[ingredient.id] < MAX_INGREDIENT_COUNT"
          :data-transfer="ingredient"
        >
          <div class="filling">
            <img
              :src="getPublicImage(ingredient.image)"
              :alt="ingredient.name"
            />
            {{ ingredient.name }}
          </div>

          <app-counter
            class="ingredients__counter"
            :value="values[ingredient.id]"
            :min="0"
            :max="MAX_INGREDIENT_COUNT"
            @input="inputValue(ingredient.id, $event)"
          />
        </app-drag>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppDrag from '@/common/components/AppDrag.vue';
import AppCounter from '@/common/components/AppCounter.vue';
import { getPublicImage } from '@/common/helpers/public-image.js';
import { toRef } from 'vue';
import { MAX_INGREDIENT_COUNT } from '@/common/constants';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  values: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update']);
const values = toRef(props, 'values');

const setValue = (ingredient, count) => {
  emit('update', ingredient, Number(count));
};

const inputValue = (ingredient, count) => {
  return setValue(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)));
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/ingredients.scss';
@import '@/assets/scss/blocks/filling.scss';
</style>
