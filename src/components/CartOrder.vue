<template>
  <li class="cart__order">
    <h3>{{ order.product.title }}</h3>
    <b>{{ amount | numberFormat }} ₽</b>
    <span>Артикул: {{ order.product.id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartOrder',
  props: ['order'],
  filters: {
    numberFormat,
  },
  computed: {
    amount() {
      return this.order.price * this.order.quantity;
    },
  },
};
</script>

<style scoped>

</style>
