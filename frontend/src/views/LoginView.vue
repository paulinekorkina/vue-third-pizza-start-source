<template>
  <div class="sign-form">
    <router-link :to="{ name: 'home' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <app-input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            :error-text="validations.email.error"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <app-input
            v-model="password"
            type="password"
            name="password"
            placeholder="Пароль"
            :error-text="validations.password.error"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
      <div v-if="errorMessage" class="server-error-message">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AppInput from '@/common/components/AppInput.vue';
import { validateFields, clearValidationErrors } from '@/common/validator';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const resetValidations = () => {
  return {
    email: {
      error: '',
      rules: ['required', 'email'],
    },
    password: {
      error: '',
      rules: ['required'],
    },
  };
};

const email = ref('');
const password = ref('');
const validations = ref(resetValidations());
const errorMessage = ref(null);

const watchField = (field) => () => {
  if (errorMessage.value) {
    errorMessage.value = null;
  }

  if (validations.value[field]?.error) {
    clearValidationErrors(validations.value);
  }
};

watch(email, watchField('email'));
watch(password, watchField('password'));

const login = async () => {
  const isValid = validateFields(
    { email: email.value, password: password.value },
    validations.value
  );

  if (!isValid) {
    return;
  }

  const resMsg = await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (resMsg === 'success') {
    await authStore.whoAmI();
    const routeName = route.query?.redirect || '/';
    await router.push({ path: routeName });
  } else {
    errorMessage.value = resMsg;
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';
@import '@/assets/scss/layout/sign-form.scss';
</style>
