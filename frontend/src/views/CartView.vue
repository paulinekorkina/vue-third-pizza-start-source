<template>
  <form method="post" class="layout-form" @submit.prevent="submit">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="cartStore.pizzasExtended.length === 0"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet">
          <li
            v-for="(pizza, index) in cartStore.pizzasExtended"
            :key="index"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
              <img
                :src="getImage('product.svg')"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ pizza.size.name }},
                    {{ pizza.dough.name.toLowerCase() }} тесто
                  </li>
                  <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
                  <li>
                    Начинка:
                    {{
                      pizza.ingredients
                        .map((i) => i.name.toLowerCase())
                        .join(', ')
                    }}
                  </li>
                </ul>
              </div>
            </div>
            <app-counter
              class="cart-list__counter"
              :value="pizza.quantity"
              accent
              @input="cartStore.setPizzaQuantity(index, $event)"
            />

            <div class="cart-list__price">
              <b>{{ (pizza.price * pizza.quantity).toLocaleString() }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                @click="editPizza(index)"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="misc in cartStore.miscExtended"
              :key="misc.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="getPublicImage(misc.image)"
                  width="39"
                  height="60"
                  :alt="misc.name"
                />
                <span>{{ misc.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <app-counter
                  class="additional-list__counter"
                  :value="misc.quantity"
                  accent
                  @input="cartStore.setMiscQuantity(misc.id, $event)"
                />

                <div class="additional-list__price">
                  <b>× {{ misc.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                deliveryOption="$event.target.value"
                name="test"
                class="select"
              >
                <option value="self">Заберу сам</option>
                <option value="new">Новый адрес</option>
                <option value="home">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                v-model="phone"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
              />
            </label>

            <div v-if="deliveryOption === 'new'" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input v-model="street" type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input v-model="building" type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input v-model="flat" type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'home' }"
          class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.total.toLocaleString() }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          :disabled="cartStore.total === 0"
          @click="submit"
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getImage, getPublicImage } from '@/common/helpers/index.js';
import AppCounter from '@/common/components/AppCounter.vue';

import { usePizzaStore, useProfileStore, useCartStore } from '@/stores';

const router = useRouter();

const pizzaStore = usePizzaStore();
const profileStore = useProfileStore();
const cartStore = useCartStore();

const deliveryOption = ref('self');

const editPizza = async (index) => {
  pizzaStore.loadPizza({
    index,
    ...cartStore.pizzas[index],
  });
  await router.push({ name: 'home' });
};

const phone = computed({
  get() {
    return cartStore.phone;
  },
  set(value) {
    cartStore.setPhone(value);
  },
});

const street = computed({
  get() {
    return cartStore.address?.street;
  },
  set(value) {
    cartStore.setStreet(value);
  },
});

const building = computed({
  get() {
    return cartStore.address?.building;
  },
  set(value) {
    cartStore.setBuilding(value);
  },
});

const flat = computed({
  get() {
    return cartStore.address?.flat;
  },
  set(value) {
    cartStore.setFlat(value);
  },
});

const submit = async () => {
  if (deliveryOption.value === 'home') {
    cartStore.setAddress(profileStore.addresses[0]);
  }
  await cartStore.createOrder();
  router.push({ name: 'success' });
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/cart.scss';
@import '@/assets/scss/blocks/cart-form.scss';
@import '@/assets/scss/blocks/cart-list.scss';
@import '@/assets/scss/blocks/product.scss';
@import '@/assets/scss/blocks/additional-list.scss';
@import '@/assets/scss/blocks/footer.scss';
</style>
