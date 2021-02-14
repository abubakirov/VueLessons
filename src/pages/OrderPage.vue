<template>
  <main v-if="orderSending">
    Заказ отправляется...
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText title="ФИО" :error="formError.name" type="text"
                          placeholder="Введите ваше полное имя" v-model="formData.name"/>

            <BaseFormText title="Адрес доставки" :error="formError.address" type="text"
                          placeholder="Введите ваш адрес" v-model="formData.address"/>

            <BaseFormText title="Телефон" :error="formError.phone" type="tel"
                          placeholder="Введите ваш телефон" v-model="formData.phone"/>

            <BaseFormText title="Email" :error="formError.email" type="email"
                          placeholder="Введите ваш Email" v-model="formData.email"/>

            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment"
                              placeholder="Ваши пожелания" v-model="formData.comment"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery"
                         value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <CartBlock :products="$store.state.cartProductsData">
          <button class="cart__button button button--primery" type="submit" :disabled="cartIsEmpty">
            Оформить заказ
          </button>
        </CartBlock>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import numberFormat from '@/helpers/numberFormat';
import CartBlock from '@/components/CartBlock.vue';

export default {
  name: 'OrderPage',
  components: {
    CartBlock,
    BaseFormText,
    BaseFormTextarea,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderSending: false,
    };
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderSending = true;

      axios
        .post(`${API_BASE_URL}/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message || '';
          this.orderSending = false;
        });
    },
  },
  computed: {
    cartIsEmpty() {
      return this.$store.state.cartProducts.count === 0;
    },
    countCartProducts() {
      return this.$store.state.cartProductsData
        .reduce((val, item) => val + item.quantity, 0);
    },
    cartTotalAmount() {
      return this.$store.state.cartProductsData
        .reduce((val, item) => val + item.price * item.quantity, 500);
    },
  },
};
</script>

<style scoped>

</style>
