<template>
  <section class="catalog">

    <ProductList :products="products"/>

    <AppPagination v-model="page" :per-page="productsPerPage" :count="countProducts"/>

  </section>
</template>

<script>

import products from './data/products';
import ProductList from './components/ProductList.vue';
import AppPagination from './components/AppPagination.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    AppPagination,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
