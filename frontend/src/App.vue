<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { useDataStore } from '@/stores';

const dataStore = useDataStore();

void dataStore.fetchDoughs();
void dataStore.fetchIngredients();
void dataStore.fetchMisc();
void dataStore.fetchSauces();
void dataStore.fetchSizes();
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';
</style>
