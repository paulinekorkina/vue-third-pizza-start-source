import { defineStore } from 'pinia';
import resources from '@/services/resources';

const { dough, ingredient, misc, sauce, size } = resources;

import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from '@/common/helpers/normalize';

export const useDataStore = defineStore('data', {
  state: () => ({
    doughs: [],
    ingredients: [],
    sauces: [],
    sizes: [],
    misc: [],
  }),
  actions: {
    async fetchDoughs() {
      const result = await dough.getDough();
      this.doughs = result.data.map(normalizeDough);
    },
    async fetchIngredients() {
      const result = await ingredient.getIngredients();
      this.ingredients = result.data.map(normalizeIngredients);
    },
    async fetchMisc() {
      const result = await misc.getMisc();
      this.misc = result.data;
    },
    async fetchSauces() {
      const result = await sauce.getSauces();
      this.sauces = result.data.map(normalizeSauces);
    },
    async fetchSizes() {
      const result = await size.getSizes();
      this.sizes = result.data.map(normalizeSize);
    },
  },
});
