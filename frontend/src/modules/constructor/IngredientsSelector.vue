<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredientType in items"
        :key="ingredientType.id"
        class="ingredients__item"
      >
        <app-drag
          :draggable="getValue(ingredientType.value) < MAX_INGREDIENT_COUNT"
          :data-transfer="ingredientType"
        >
          <span :class="`filling filling--${ingredientType.value}`">{{
            ingredientType.name
          }}</span>

          <div class="counter counter--orange ingredients__counter">
            <button
              type="button"
              class="counter__button counter__button--minus"
              :disabled="getValue(ingredientType.value) === 0"
              @click="decrementValue(ingredientType.value)"
            >
              <span class="visually-hidden">Меньше</span>
            </button>
            <input
              type="text"
              name="counter"
              class="counter__input"
              :value="getValue(ingredientType.value)"
              @input="inputValue(ingredientType.value, $event.target.value)"
            />
            <button
              type="button"
              class="counter__button counter__button--plus"
              :disabled="
                getValue(ingredientType.value) === MAX_INGREDIENT_COUNT
              "
              @click="incrementValue(ingredientType.value)"
            >
              <span class="visually-hidden">Больше</span>
            </button>
          </div>
        </app-drag>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppDrag from '@/common/components/AppDrag.vue';
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

// вид непустого объекта values:
// {
//    1: 1, // 1 гриб
//    11: 3, // 3 помидорки
// }
// или так?
// {
//    'mushrooms': 1, // 1 гриб
//    'tomato': 3, // 3 помидорки
// }

const emit = defineEmits(['update']);
const values = toRef(props, 'values');

const getValue = (ingredient) => {
  return values.value[ingredient] ?? 0;
};

const setValue = (ingredient, count) => {
  emit('update', ingredient, Number(count));
};

const decrementValue = (ingredient) => {
  setValue(ingredient, getValue(ingredient) - 1);
};

const incrementValue = (ingredient) => {
  setValue(ingredient, getValue(ingredient) + 1);
};

const inputValue = (ingredient, count) => {
  return setValue(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)));
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/ingredients.scss';
</style>
