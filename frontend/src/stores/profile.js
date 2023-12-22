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
    sauce: sauces.find((i) => i.id === pizza.sauceId)?.name.toLowerCase(),
    size: sizes.find((i) => i.id === pizza.sizeId)?.name.toLowerCase(),
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

  const pizzaPrices =
    order.orderPizzas
      ?.map((item) => item.quantity * pizzaPrice(item))
      .reduce((acc, val) => acc + val, 0) || 0;

  const miscPrices =
    order.orderMisc
      ?.map(
        (item) =>
          item.quantity * dataMisc.find((i) => i.id === item.miscId).price
      )
      .reduce((acc, val) => acc + val, 0) || 0;

  return pizzaPrices + miscPrices;
};

export const useProfileStore = defineStore('profile', {
  state: () => ({
    addresses: [],
    orders: [],
  }),
  getters: {
    ordersExtended: (state) => {
      const orderAddress = ({ addressId }) => {
        if (addressId) {
          return state.addresses.find((address) => address.id === addressId);
        }
        return 'самовывоз'; //название адреса из профиля, полный адрес если новый, иначе самовывоз
      };

      return state.orders.map((order) => ({
        ...order,
        orderPizzas: order.orderPizzas?.map(getPizzasExtended),
        orderMisc: order.orderMisc?.map(getMiscExtended),
        orderTotal: getOrderTotal(order),
        orderAddress: orderAddress(order),
      }));
    },
    addressExtended: (state) => {
      const fullAddress = ({ street, building, flat }) => {
        return `${street}, д. ${building}${flat ? `, кв. ${flat}` : ``}`;
      };
      return state.addresses.map((address) => ({
        fullAddress: fullAddress(address),
        ...address,
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

      console.log(order);

      order.orderPizzas.forEach((pizza) => {
        cartStore.savePizza({ index: null, ...pizza });
      });

      order.orderMisc.forEach(({ miscId, quantity }) => {
        console.log(miscId, quantity);
        cartStore.setMiscQuantity(miscId, quantity);
      });

      router.push({ name: 'cart' });
    },
    async addAddress(address) {
      const res = await resources.address.addAddress(address);
      if (res.__state === 'success') {
        this.addresses = [...this.addresses, res.data];
        return 'success';
      }
      return res.data.message;
    },
    async updateAddress(address) {
      const res = await resources.address.updateAddress(address);
      if (res.__state === 'success') {
        const index = this.addresses.findIndex(({ id }) => id === address.id);
        if (~index) {
          this.addresses.splice(index, 1, address);
        }
        return 'success';
      }
    },
    async removeAddress(id) {
      const res = await resources.address.removeAddress(id);
      if (res.__state === 'success') {
        this.addresses = this.addresses.filter((address) => address.id !== id);
      }
    },
    async getOrders() {
      // TODO: костыль
      const res = await resources.order.getOrders();
      if (res.__state === 'success') {
        this.setOrders(res.data);
      }
    },
    async removeOrder(id) {
      await resources.order.removeOrder(id);
      this.orders = this.orders.filter((order) => order.id !== id);
    },
  },
});
