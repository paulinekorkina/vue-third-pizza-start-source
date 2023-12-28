<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'home' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'cart' }">0 ₽</router-link>
    </div>
    <div class="header__user">
      <router-link v-if="authStore.isAuthenticated" :to="{ name: 'profile' }">
        <img
          :src="getPublicImage(authStore.user.avatar)"
          :srcset="getPublicImage(authStore.user.avatar)"
          :alt="authStore.user.name"
          width="32"
          height="32"
        />
        <span>{{ authStore.user.name }}</span>
      </router-link>
      <router-link
        v-if="authStore.user"
        :to="{ name: 'home' }"
        class="header__logout"
        @click="logout"
      >
        <span>Выйти</span>
      </router-link>
      <router-link
        v-if="!authStore.isAuthenticated"
        class="header__login"
        :to="{ name: 'login' }"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores';
import { getPublicImage } from '@/common/helpers/public-image.js';

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/layout/header.scss';
</style>
