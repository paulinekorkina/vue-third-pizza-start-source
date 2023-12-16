import { defineStore } from 'pinia';
import { useDataStore, useCartStore } from '@/stores';
import resources from '@/services/resources';
import { pizzaPrice } from '@/common/helpers/pizza-price';
import router from '../router';

const getPizzasExtended = (pizza) => {
  const { doughs, sauces, sizes } = useDataStore();
  return {
    dough: doughs.find((i) => i.id === pizza.doughId).name.toLowerCase(),
    ingredients: pizza.ingredients.map(getPizzaIngredients).join(', '),
    sauce: sauces.find((i) => i.id === pizza.sauceId).name.toLowerCase(),
    size: sizes.find((i) => i.id === pizza.sizeId).name.toLowerCase(),
    name: pizza.name,
    quantity: pizza.quantity,
    price: pizzaPrice(pizza),
  };
};

const getPizzaIngredients = (pizzaIngredient) => {
  const { ingredients } = useDataStore();
  return ingredients
    .find((i) => i.id === pizzaIngredient.ingredientId)
    .name.toLowerCase();
};

const getMiscExtended = (orderMisc) => {
  const dataMisc = useDataStore().misc.find((i) => i.id === orderMisc.miscId);
  const { name, image, price } = dataMisc;
  const { quantity, id } = orderMisc;
  return {
    name,
    image,
    price,
    quantity,
    id,
  };
};

const getOrderTotal = (order) => {
  const dataMisc = useDataStore().misc;

  const pizzaPrices = order.orderPizzas
    .map((item) => item.quantity * pizzaPrice(item))
    .reduce((acc, val) => acc + val, 0);

  const miscPrices = order.orderMisc
    .map(
      (item) => item.quantity * dataMisc.find((i) => i.id === item.miscId).price
    )
    .reduce((acc, val) => acc + val, 0);

  return pizzaPrices + miscPrices;
};

export const useProfileStore = defineStore('profile', {
  state: () => ({
    addresses: [],
    orders: [],
  }),
  getters: {
    ordersExtended: (state) => {
      return state.orders.map((order) => ({
        ...order,
        orderPizzas: order.orderPizzas.map(getPizzasExtended),
        orderMisc: order.orderMisc.map(getMiscExtended),
        orderTotal: getOrderTotal(order),
      }));
    },
  },
  actions: {
    setAddresses(addresses) {
      this.addresses = addresses;
    },
    setOrders(orders) {
      this.orders = orders;
    },
    repeatOrder(id) {
      const order = this.orders.find((item) => item.id === id);
      const cartStore = useCartStore();

      order.orderPizzas.forEach((pizza) => {
        cartStore.savePizza({ index: null, ...pizza });
      });

      order.orderMisc.forEach(({ miscId, quantity }) => {
        cartStore.setMiscQuantity(miscId, quantity);
      });

      router.push({ name: 'cart' });
    },
    async removeOrder(id) {
      await resources.order.removeOrder(id);
      this.orders = this.orders.filter((order) => order.id !== id);
    },
  },
});
