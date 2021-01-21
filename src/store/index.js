import Vue from 'vue';
import Vuex from 'vuex';

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
  },
});

export default store;
