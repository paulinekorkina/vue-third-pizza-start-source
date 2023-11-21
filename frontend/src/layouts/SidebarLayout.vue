<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link :to="{ name: 'home' }" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <slot name="sidebar" />
    </div>

    <div class="layout__content">
      <slot />
    </div>
  </main>
</template>
