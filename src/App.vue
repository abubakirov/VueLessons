<template>
<main class="content container">
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
      152 товара
    </span>
  </div>

  <div class="content__catalog">

    <ProductFilter :filter-category-id.sync="filterCategoryId"
                   :filter-price-from.sync="filterPriceFrom"
                   :filter-price-to.sync="filterPriceTo"
                   :filter-color.sync="filterColor"
                   :colors="allProductColors"
    />

    <section class="catalog">

      <ProductList :products="products"/>

      <AppPagination v-model="page" :per-page="productsPerPage" :count="countProducts"/>

    </section>

  </div>
</main>
</template>

<script>

import products from './data/products';
import ProductList from './components/ProductList.vue';
import AppPagination from './components/AppPagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    AppPagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 'None',

      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= this.filterPriceFrom,
        );
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= this.filterPriceTo,
        );
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        );
      }
      if (this.filterColor !== 'None') {
        filteredProducts = filteredProducts.filter(
          (product) => product.colors.includes(this.filterColor),
        );
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
    allProductColors() {
      const colors = new Set();
      products.forEach((product) => product.colors.forEach((color) => colors.add(color)));
      return colors;
    },
  },
};
</script>
