import doughSizes from '@/common/data/doughSizes';
import ingredients from '@/common/data/ingredients';
import sauces from '@/common/data/sauces';
import sizes from '@/common/data/sizes';
import miscs from '@/common/data/miscs';

export const normalizeDough = (dough) => {
  return {
    ...dough,
    value: doughSizes[dough.id],
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    value: ingredients[ingredient.id],
  };
};

export const normalizeSauces = (sauce) => {
  return {
    ...sauce,
    value: sauces[sauce.id],
  };
};

export const normalizeSizes = (size) => {
  return {
    ...size,
    value: sizes[size.id],
  };
};

export const normalizeMisc = (misc) => {
  return {
    ...misc,
    value: miscs[misc.id],
  };
};
