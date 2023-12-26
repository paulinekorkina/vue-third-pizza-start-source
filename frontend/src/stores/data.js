import { defineStore } from 'pinia';
import resources from '@/services/resources';
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from '@/common/helpers/normalize';

const { dough, ingredient, misc, sauce, size } = resources;

export const useDataStore = defineStore('data', {
  state: () => ({
    doughs: [],
    ingredients: [],
    sauces: [],
    sizes: [],
    misc: [],
  }),
  getters: {
    isDataLoaded() {
      return (
        this.doughs.length > 0 &&
        this.ingredients.length > 0 &&
        this.sauces.length > 0 &&
        this.sizes.length > 0 &&
        this.misc.length > 0
      );
    },
  },
  actions: {
    async fetchData() {
      await Promise.all([
        this.fetchDoughs(),
        this.fetchIngredients(),
        this.fetchSauces(),
        this.fetchSizes(),
        this.fetchMisc(),
      ]);
    },
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
