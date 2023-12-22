<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div class="user">
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
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ index + 1 }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="editAddress(address)">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ address.fullAddress }}</p>
      <small>{{ address.comment }}</small>
    </div>
  </div>

  <div v-if="showForm" class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="addAddress"
    >
      <div class="address-form__header">
        <b>Адрес №{{ addressIndex }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <app-input
              v-model="name"
              name="name"
              placeholder="Введите название адреса"
              :error-text="validations.name.error"
              :required="true"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <app-input
              v-model="street"
              name="street"
              placeholder="Введите название улицы"
              :error-text="validations.street.error"
              :required="true"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <app-input
              v-model="building"
              name="building"
              placeholder="Введите номер дома"
              :error-text="validations.building.error"
              :required="true"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <app-input
              v-model="flat"
              name="flat"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <app-input
              v-model="comment"
              name="comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>

        <div v-if="errorMessage" class="server-error-message">
          {{ errorMessage }}
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="removeAddress"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>

  <div v-if="showForm === false" class="layout__button">
    <button
      type="button"
      class="button button--border"
      @click="showForm = true"
    >
      Добавить новый адрес
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import AppInput from '@/common/components/AppInput.vue';
import { validateFields, clearValidationErrors } from '@/common/validator';
import { useAuthStore, useProfileStore } from '@/stores';
import { getPublicImage } from '@/common/helpers/index.js';

const authStore = useAuthStore();
const profileStore = useProfileStore();

const resetValidations = () => {
  return {
    name: {
      error: '',
      rules: ['required'],
    },
    street: {
      error: '',
      rules: ['required'],
    },
    building: {
      error: '',
      rules: ['required'],
    },
  };
};

const validations = ref(resetValidations());
const id = ref('');
const name = ref('');
const street = ref('');
const building = ref('');
const flat = ref('');
const comment = ref('');
const addressIndex = computed(() => {
  if (id.value) {
    return (
      profileStore.addresses.findIndex((address) => address.id === id.value) + 1
    );
  }
  return profileStore.addresses.length + 1;
});
const errorMessage = ref(null);
const showForm = ref(false);

const watchField = (field) => () => {
  if (errorMessage.value) {
    errorMessage.value = null;
  }

  if (validations.value[field]?.error) {
    clearValidationErrors(validations.value);
  }
};

watch(name, watchField('name'));
watch(street, watchField('street'));
watch(building, watchField('building'));

const resetAddressForm = () => {
  id.value = '';
  name.value = '';
  street.value = '';
  building.value = '';
  flat.value = '';
  comment.value = '';
};

const editAddress = (address) => {
  id.value = address.id;
  name.value = address.name;
  street.value = address.street;
  building.value = address.building;
  flat.value = address.flat;
  comment.value = address.comment;
  showForm.value = true;
};

const addAddress = async () => {
  const isValid = validateFields(
    { name: name.value, street: street.value, building: building.value },
    validations.value
  );

  if (!isValid) {
    return;
  }

  const data = {
    userId: authStore.user.id,
    name: name.value,
    street: street.value,
    building: building.value,
    flat: flat.value,
    comment: comment.value,
  };

  let resMsg;

  if (id.value) {
    data.id = id.value;
    resMsg = await profileStore.updateAddress(data);
  } else {
    resMsg = await profileStore.addAddress(data);
  }

  if (resMsg === 'success') {
    resetAddressForm();
    showForm.value = false;
  } else {
    errorMessage.value = resMsg;
  }
};

const removeAddress = async () => {
  if (id.value) {
    await profileStore.removeAddress(id.value);
  }
  resetAddressForm();
  showForm.value = false;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/user.scss';
@import '@/assets/scss/blocks/address-form.scss';
</style>
