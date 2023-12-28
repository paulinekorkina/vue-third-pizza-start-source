<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div v-if="authStore.user" class="user">
    <img
      :src="getPublicImage(authStore.user.avatar)"
      :srcset="getPublicImage(authStore.user.avatar)"
      :alt="authStore.user.name"
      width="72"
      height="72"
    />
    <div class="user__name">
      <span>{{ authStore.user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ authStore.user.phone }}</span>
    </p>
  </div>

  <div
    v-for="(address, index) in profileStore.addressExtended"
    :key="address.id"
    class="layout__address"
  >
    <address-card
      :address="address"
      :index="index + 1"
      @delete="removeAddress(address.id)"
      @save="updateAddress(address, $event)"
    />
  </div>

  <div v-if="isNewAddressFormOpened" class="layout__address">
    <address-edit-form
      title="Новый адрес"
      @save="addAddress"
      @remove-address="isNewAddressFormOpened = false"
    />
  </div>

  <div v-else class="layout__button">
    <button
      type="button"
      class="button button--border"
      @click="isNewAddressFormOpened = true"
    >
      Добавить новый адрес
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AddressEditForm from '@/common/components/address/AddressEditForm.vue';
import AddressCard from '@/common/components/address/AddressCard.vue';
import { useAuthStore, useProfileStore } from '@/stores';
import { getPublicImage } from '@/common/helpers/public-image.js';

const authStore = useAuthStore();
const profileStore = useProfileStore();

const isNewAddressFormOpened = ref(false);

const addAddress = async (address) => {
  await profileStore.addAddress(address);
  isNewAddressFormOpened.value = false;
};

const updateAddress = (address, data) => {
  profileStore.updateAddress({
    ...address,
    ...data,
  });
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/user.scss';
</style>
