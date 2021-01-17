<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="product in products" :key="product.title">
      <ProductItem :product="product"
                   @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"
      />
    </li>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products'],
};
</script>

<style scoped>

</style>
