<template>
  <form class="address-form address-form--opened sheet" @submit.prevent="save">
    <div class="address-form__header">
      <b>{{ title }}</b>
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
        @click="emit('removeAddress')"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import AppInput from '@/common/components/AppInput.vue';
import { validateFields, clearValidationErrors } from '@/common/validator';

const props = defineProps({
  address: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['save', 'removeAddress']);

const name = ref(props.address?.name ?? '');
const street = ref(props.address?.street ?? '');
const building = ref(props.address?.building ?? '');
const flat = ref(props.address?.flat ?? '');
const comment = ref(props.address?.comment ?? '');

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

const save = () => {
  const isValid = validateFields(
    { name: name.value, street: street.value, building: building.value },
    validations.value
  );

  if (!isValid) {
    return;
  }

  emit('save', {
    name: name.value,
    street: street.value,
    building: building.value,
    flat: flat.value,
    comment: comment.value,
  });
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/address-form.scss';
</style>
