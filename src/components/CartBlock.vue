<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <CartOrder v-for="order in products" :key="order.id"
                 :order="order"/>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ countCartProducts }}</b> товара на сумму
        <b>{{ cartTotalAmount | numberFormat }} ₽</b></p>
    </div>

    <slot/>
  </div>
</template>

<script>
import CartOrder from '@/components/CartOrder.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartBlock',
  components: { CartOrder },
  filters: { numberFormat },
  props: ['products'],
  computed: {
    countCartProducts() {
      return this.products
        .reduce((val, item) => val + item.quantity, 0);
    },
    cartTotalAmount() {
      return this.products
        .reduce((val, item) => val + item.price * item.quantity, 500);
    },
  },
};
</script>

<style scoped>

</style>
