<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selector v-model="pizza.dough" :items="doughItems" />

        <size-selector v-model="pizza.size" :items="sizeItems" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selector v-model="pizza.sauce" :items="sauceItems" />
              <ingredients-selector
                :items="ingredientItems"
                :values="pizza.filling"
                @update="updateIngredientAmount"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizza.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            :dough="pizza.dough"
            :sauce="pizza.sauce"
            :filling="pizza.filling"
            @drop="addIngredient"
          />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="disableSubmit">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue';

import DoughSelector from '../modules/constructor/DoughSelector.vue';
import SizeSelector from '../modules/constructor/SizeSelector.vue';
import SauceSelector from '../modules/constructor/SauceSelector.vue';
import IngredientsSelector from '../modules/constructor/IngredientsSelector.vue';
import PizzaConstructor from '../modules/constructor/PizzaConstructor.vue';

import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSizes,
} from '@/common/helpers/normalize.js';

import doughJSON from '@/mocks/dough.json';
import ingredientsJSON from '@/mocks/ingredients.json';
import saucesJSON from '@/mocks/sauces.json';
import sizesJSON from '@/mocks/sizes.json';

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSizes);

const pizza = reactive({
  name: '',
  dough: doughItems[0].value,
  size: sizeItems[0].value,
  sauce: sauceItems[0].value,
  filling: ingredientItems.reduce((accumulator, item) => {
    accumulator[item.value] = 0;
    return accumulator;
  }, {}),
});

const price = computed(() => {
  const { dough, size, sauce, filling } = pizza;

  const sizeMultiplier = sizeItems.find((i) => i.value === size).multiplier;

  const doughPrice = doughItems.find((i) => i.value === dough).price;

  const saucePrice = sauceItems.find((i) => i.value === sauce).price;

  const fillingPrice = ingredientItems
    .map((item) => filling[item.value] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return sizeMultiplier * (doughPrice + saucePrice + fillingPrice);
});

const disableSubmit = computed(
  () => pizza.name.length === 0 || pizza.price === 0
);

function updateIngredientAmount(ingredient, amount) {
  pizza.filling[ingredient] = amount;
}

function addIngredient(ingredient) {
  pizza.filling[ingredient]++;
}
</script>

<style lang="scss">
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

// @import '@/assets/scss/blocks/counter.scss';
// @import '@/assets/scss/blocks/filling.scss';
// @import '@/assets/scss/blocks/dough.scss';
// @import '@/assets/scss/blocks/diameter.scss';
// @import '@/assets/scss/blocks/ingredients.scss';

// @import '@/assets/scss/blocks/product.scss';
// @import '@/assets/scss/blocks/additional-list.scss';

// @import '@/assets/scss/blocks/footer.scss';
// @import '@/assets/scss/blocks/order.scss';
// @import '@/assets/scss/blocks/user.scss';
// @import '@/assets/scss/blocks/address-form.scss';
</style>
