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
      <router-link :to="{ name: 'profile' }">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="@/assets/img/users/user5@2x.jpg"
            alt="Василий Ложкин"
            width="32"
            height="32"
          />
        </picture>
        <span>Василий Ложкин</span>
      </router-link>
      <router-link :to="{ name: 'home' }" class="header__logout">
        <span>Выйти</span>
      </router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/layout/header.scss';
</style>
