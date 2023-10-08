<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="doughType in doughItems"
                :key="doughType.id"
                :class="`dough__input dough__input--${doughType.value}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="doughType.value"
                  class="visually-hidden"
                  :checked="doughType.value === 'light'"
                />
                <!-- <img :src="getImage(doughType.image)" :alt="doughType.name" /> -->
                <b>{{ doughType.name }}</b>
                <span>{{ doughType.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="sizeType in sizeItems"
                :key="sizeType.id"
                :class="`diameter__input diameter__input--${sizeType.value}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="sizeType.value"
                  class="visually-hidden"
                  :checked="sizeType.value === 'normal'"
                />
                <span>{{ sizeType.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauceType in sauceItems"
                  :key="sauceType.id"
                  class="radio ingredients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauceType.value"
                    :checked="sauceType.value === 'tomato'"
                  />
                  <span>{{ sauceType.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredientType in ingredientItems"
                    :key="ingredientType.id"
                    class="ingredients__item"
                  >
                    <!-- <div class="filling">
                      <img
                        :src="getImage(ingredientType.image)"
                        :alt="ingredientType.name"
                      />
                      {{ ingredientType.name }}
                    </div> -->
                    <span :class="`filling filling--${ingredientType.value}`">{{
                      ingredientType.name
                    }}</span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSizes,
} from '@/common/helpers/normalize.js';

import doughJSON from '@/mocks/dough.json';
import ingredientsJSON from '@/mocks/ingredients.json';
// import miscJSON from '@/mocks/misc.json';
import saucesJSON from '@/mocks/sauces.json';
import sizesJSON from '@/mocks/sizes.json';

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSizes);

// const getImage = (image) =>
//   new URL(`../assets/img/${image}`, import.meta.url).href;
// https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/layout/main.scss';
@import '@/assets/scss/layout/content.scss';
@import '@/assets/scss/layout/sheet.scss';
@import '@/assets/scss/layout/container.scss';
@import '@/assets/scss/layout/layout.scss';
@import '@/assets/scss/layout/popup.scss';
@import '@/assets/scss/layout/layout-form.scss';
@import '@/assets/scss/layout/sign-form.scss';

// @import '@/assets/scss/blocks/icon.scss';
// @import '@/assets/scss/blocks/logo.scss';
// @import '@/assets/scss/blocks/close.scss';
@import '@/assets/scss/blocks/input.scss';
@import '@/assets/scss/blocks/select.scss';
@import '@/assets/scss/blocks/radio.scss';
@import '@/assets/scss/blocks/button.scss';
@import '@/assets/scss/blocks/counter.scss';
@import '@/assets/scss/blocks/title.scss';
@import '@/assets/scss/blocks/filling.scss';
@import '@/assets/scss/blocks/pizza.scss';
@import '@/assets/scss/blocks/dough.scss';
@import '@/assets/scss/blocks/diameter.scss';
@import '@/assets/scss/blocks/ingredients.scss';
// @import '@/assets/scss/blocks/cart-list.scss';
// @import '@/assets/scss/blocks/cart.scss';
// @import '@/assets/scss/blocks/product.scss';
// @import '@/assets/scss/blocks/additional-list.scss';
// @import '@/assets/scss/blocks/cart-form.scss';
// @import '@/assets/scss/blocks/footer.scss';
// @import '@/assets/scss/blocks/order.scss';
// @import '@/assets/scss/blocks/user.scss';
// @import '@/assets/scss/blocks/address-form.scss';
</style>
