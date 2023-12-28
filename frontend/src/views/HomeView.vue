<template>
  <main v-if="dataStore.isDataLoaded" class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selector v-model="doughId" :items="dataStore.doughs" />

        <size-selector v-model="sizeId" :items="dataStore.sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selector v-model="sauceId" :items="dataStore.sauces" />
              <ingredients-selector
                :items="dataStore.ingredients"
                :values="pizzaStore.ingredientQuantities"
                @update="pizzaStore.setIngredientQuantity"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            :dough="pizzaStore.dough.value"
            :sauce="pizzaStore.sauce.value"
            :filling="pizzaStore.ingredientsExtended"
            @drop="pizzaStore.incrementIngredientQuantity"
          />

          <div class="content__result">
            <p>Итого: {{ pizzaStore.price.toLocaleString() }} ₽</p>
            <button
              type="button"
              class="button"
              :disabled="disableSubmit"
              @click="addToCart"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePizzaStore, useDataStore, useCartStore } from '@/stores';

import DoughSelector from '../modules/constructor/DoughSelector.vue';
import SizeSelector from '../modules/constructor/SizeSelector.vue';
import SauceSelector from '../modules/constructor/SauceSelector.vue';
import IngredientsSelector from '../modules/constructor/IngredientsSelector.vue';
import PizzaConstructor from '../modules/constructor/PizzaConstructor.vue';

const router = useRouter();

const pizzaStore = usePizzaStore();
const dataStore = useDataStore();
const cartStore = useCartStore();

const name = computed({
  get() {
    return pizzaStore.name;
  },
  set(value) {
    pizzaStore.setName(value);
  },
});

const doughId = computed({
  get() {
    return pizzaStore.dough.id;
  },
  set(value) {
    pizzaStore.setDough(value);
  },
});

const sauceId = computed({
  get() {
    return pizzaStore.sauce.id;
  },
  set(value) {
    pizzaStore.setSauce(value);
  },
});

const sizeId = computed({
  get() {
    return pizzaStore.size.id;
  },
  set(value) {
    pizzaStore.setSize(value);
  },
});

const disableSubmit = computed(
  () => name.value.length === 0 || pizzaStore.price === 0
);

const addToCart = async () => {
  cartStore.savePizza(pizzaStore.$state);
  await router.push({ name: 'cart' });
  resetPizza();
};

const resetPizza = () => {
  pizzaStore.setIndex(null);
  pizzaStore.setName('');
  if (dataStore.isDataLoaded) {
    pizzaStore.setDough(dataStore.doughs[0].id);
    pizzaStore.setSize(dataStore.sizes[0].id);
    pizzaStore.setSauce(dataStore.sauces[0].id);
  }
  pizzaStore.setIngredients([]);
};

onMounted(() => {
  if (pizzaStore.index === null) {
    resetPizza();
  }
});
</script>
