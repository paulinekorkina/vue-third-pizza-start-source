<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <div v-if="profileStore.ordersExtended.length === 0">Заказов пока нет.</div>

  <section
    v-for="order in profileStore.ordersExtended"
    :key="order.id"
    class="sheet order"
  >
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.orderTotal.toLocaleString() }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="profileStore.removeOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          @click="profileStore.repeatOrder(order.id)"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <div class="product">
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
              <li>{{ pizza.size }}, {{ pizza.dough }} тесто</li>
              <li>Соус: {{ pizza.sauce }}</li>
              <li>Начинка: {{ pizza.ingredients }}</li>
            </ul>
          </div>
        </div>

        <p class="order__price">
          <span v-if="pizza.quantity > 1">{{ pizza.quantity }}х</span
          >{{ pizza.price.toLocaleString() }} ₽
        </p>
      </li>
    </ul>

    <ul v-if="order.orderMisc" class="order__additional">
      <li v-for="misc in order.orderMisc" :key="misc.id">
        <img
          :src="getPublicImage(misc.image)"
          width="20"
          height="30"
          :alt="misc.name"
        />
        <p>
          <span>{{ misc.name }}</span>
          <b
            ><span v-if="misc.quantity > 1">{{ misc.quantity }}х</span
            >{{ misc.price }} ₽</b
          >
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ order.orderAddress }}</p>
  </section>
</template>

<script setup>
import { getImage, getPublicImage } from '@/common/helpers/index.js';
import { useProfileStore } from '@/stores';

const profileStore = useProfileStore();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/order.scss';
@import '@/assets/scss/blocks/product.scss';
</style>
