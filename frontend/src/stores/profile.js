import { defineStore } from 'pinia';
import { useDataStore, useCartStore, useAuthStore } from '@/stores';
import { pizzaPrice } from '@/common/helpers/pizza-price';
import resources from '@/services/resources';
import router from '@/router';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    addresses: [],
    orders: [],
  }),
  getters: {
    ordersExtended: (state) => {
      const { doughs, sauces, sizes, ingredients, misc } = useDataStore();

      return state.orders.map((order) => {
        const pizzaIngredients = (pizzaIngredient) => {
          return ingredients
            .find((i) => i.id === pizzaIngredient.ingredientId)
            .name.toLowerCase();
        };

        const orderPizzas = order.orderPizzas?.map((pizza) => ({
          dough: doughs.find((i) => i.id === pizza.doughId).name?.toLowerCase(),
          ingredients: pizza.ingredients.map(pizzaIngredients).join(', '),
          sauce: sauces.find((i) => i.id === pizza.sauceId).name?.toLowerCase(),
          size: sizes.find((i) => i.id === pizza.sizeId).name,
          name: pizza.name,
          quantity: pizza.quantity,
          price: pizzaPrice(pizza),
        }));

        const orderMisc =
          order.orderMisc?.map((miscItem) => ({
            ...misc.find((item) => item.id === miscItem.miscId),
            quantity: miscItem.quantity,
          })) ?? [];

        const pizzaPrices =
          order.orderPizzas
            ?.map((item) => item.quantity * pizzaPrice(item))
            .reduce((acc, val) => acc + val, 0) ?? 0;

        const miscPrices =
          order.orderMisc
            ?.map(
              (item) =>
                item.quantity * misc.find((i) => i.id === item.miscId).price
            )
            .reduce((acc, val) => acc + val, 0) ?? 0;

        const orderAddressText = () => {
          const { addressId, orderAddress } = order;

          if (orderAddress?.name) {
            return orderAddress.name;
          }

          const address = state.addresses.find(
            (address) => address.id === addressId
          );

          if (addressId && address?.name) {
            return address.name;
          }

          return 'самовывоз';
        };

        return {
          ...order,
          orderPizzas,
          orderMisc,
          orderTotal: pizzaPrices + miscPrices,
          orderAddress: orderAddressText(),
        };
      });
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

      order.orderPizzas.forEach((pizza) => {
        cartStore.savePizza({ index: null, ...pizza });
      });

      order.orderMisc.forEach(({ miscId, quantity }) => {
        cartStore.setMiscQuantity(miscId, quantity);
      });

      router.push({ name: 'cart' });
    },
    async addAddress(address) {
      const authStore = useAuthStore();
      if (!authStore.isAuthenticated) {
        return;
      }

      const res = await resources.address.addAddress({
        ...address,
        userId: authStore.user.id,
      });
      if (res.__state === 'success') {
        this.addresses.push(res.data);
        return 'success';
      }
      return res.data.message;
    },
    async updateAddress(address) {
      delete address.fullAddress;
      const res = await resources.address.updateAddress(address);
      if (res.__state === 'success') {
        this.addresses = this.addresses.map((i) =>
          i.id === address.id ? address : i
        );
        return 'success';
      }
    },
    async removeAddress(addressId) {
      const res = await resources.address.removeAddress(addressId);
      if (res.__state === 'success') {
        this.addresses = this.addresses.filter(
          (address) => address.id !== addressId
        );
      }
    },
    async getOrders() {
      const res = await resources.order.getOrders();
      if (res.__state === 'success') {
        this.setOrders(res.data);
      }
    },
    async removeOrder(orderId) {
      const res = await resources.order.removeOrder(orderId);
      if (res.__state === 'success') {
        this.orders = this.orders.filter((order) => order.id !== orderId);
      }
    },
  },
});
