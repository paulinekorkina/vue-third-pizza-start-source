<template>
  <div v-if="!editMode" class="sheet address-form">
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">
        <button type="button" class="icon" @click="editMode = true">
          <span class="visually-hidden"> Изменить адрес </span>
        </button>
      </div>
    </div>
    <p>{{ address.fullAddress }}</p>
    <small>{{ address.comment }}</small>
  </div>

  <address-edit-form
    v-else
    :address="address"
    :title="`Адрес ${index}`"
    @remove-address="emit('removeAddress')"
    @save="save"
  />
</template>

<script setup>
import { ref } from 'vue';
import AddressEditForm from '@/common/components/address/AddressEditForm.vue';

defineProps({
  address: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['removeAddress', 'save']);

const editMode = ref(false);

const save = (address) => {
  emit('save', address);
  editMode.value = false;
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds.scss';
@import '@/assets/scss/mixins/mixins.scss';

@import '@/assets/scss/blocks/address-form.scss';
</style>
