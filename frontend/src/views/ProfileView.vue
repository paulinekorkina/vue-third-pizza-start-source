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
          <button type="button" class="icon">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ address.fullAddress }}</p>
      <small>{{ address.comment }}</small>
    </div>
  </div>

  <div class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="addAddress"
    >
      <div class="address-form__header">
        <b>Адрес №{{ profileStore.addresses.length + 1 }}</b>
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
        <button type="button" class="button button--transparent">
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>

  <div class="layout__button">
    <button type="button" class="button button--border">
      Добавить новый адрес
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
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
const name = ref('');
const street = ref('');
const building = ref('');
const flat = ref('');
const comment = ref('');
const errorMessage = ref(null);

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

const clearAddressForm = () => {
  name.value = '';
  street.value = '';
  building.value = '';
  flat.value = '';
  comment.value = '';
};

const addAddress = async () => {
  const isValid = validateFields(
    { name: name.value, street: street.value, building: building.value },
    validations.value
  );

  if (!isValid) {
    return;
  }

  const resMsg = await profileStore.addAddress({
    name: name.value,
    street: street.value,
    building: building.value,
    flat: flat.value,
    comment: comment.value,
  });

  console.log(resMsg);

  if (resMsg === 'success') {
    clearAddressForm();
  } else {
    errorMessage.value = resMsg;
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/user.scss';
@import '@/assets/scss/blocks/address-form.scss';
</style>
