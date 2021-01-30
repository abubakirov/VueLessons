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
import products from '@/data/products';
import colors from '@/data/colors';
import ProductList from '@/components/ProductList.vue';
import AppPagination from '@/components/AppPagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
  name: 'MainPage',
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
      filterColor: null,

      page: 1,
      productsPerPage: 3,

      productsData: null,
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
      if (this.filterColor !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.colorIds.includes(this.filterColor.id),
        );
      }
      return filteredProducts;
    },
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          pic: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    allProductColors() {
      const allColors = new Set();
      products.forEach(
        (product) => product.colorIds.forEach(
          (colorId) => allColors.add(colors.find((color) => color.id === colorId)),
        ),
      );
      return allColors;
    },
  },
  methods: {
    loadProducts() {
      axios.get(`http://vue-study.dev.creonit.ru/api/products?page=${this.page}&limit=${this.productsPerPage}`)
        .then((response) => {
          this.productsData = response.data;
        });
    },
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
  },
};
</script>

<style scoped>

</style>
