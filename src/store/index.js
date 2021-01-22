import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 2 },
    ],
  },
  mutations: {
    addProductToCart(state, payload) {
      let item = state.cartProducts.find((record) => record.productId === payload.productId);
      if (item) {
        item.amount += payload.amount;
      } else {
        item = { productId: payload.productId, amount: payload.amount };
        state.cartProducts.push(item);
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((record) => record.productId === productId);

      if (item) {
        if (amount === 0) {
          this.commit('deleteCartItem', productId);
        } else {
          item.amount = amount;
        }
      }
    },
    deleteCartItem(state, productId) {
      const index = state.cartProducts.findIndex((record) => record.productId === productId);
      if (index !== -1) {
        state.cartProducts.splice(index);
      }
    },
  },
  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts.reduce((acc, item) => item.product.price
        * item.amount + acc, 0);
    },
    cartCountProducts(state, getters) {
      return getters.cartDetailsProducts.length;
    },
  },
});

export default store;
