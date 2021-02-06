import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
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
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            pic: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailsProducts.reduce((acc, item) => item.product.price
        * item.amount + acc, 0);
    },
    cartCountProducts(state, getters) {
      return getters.cartDetailsProducts.length;
    },
  },
  actions: {
    loadCart(context) {
      axios.get(`${API_BASE_URL}/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});

export default store;
