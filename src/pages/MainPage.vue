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

        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          Произошла ошибка при загрузке товаров
          <button class="button" @click.prevent="loadProducts">Перезагрузить</button>
        </div>

        <ProductList :products="products"/>

        <AppPagination v-model="page" :per-page="productsPerPage" :count="countProducts"/>

      </section>

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import products from '@/data/products';
import colors from '@/data/colors';
import ProductList from '@/components/ProductList.vue';
import AppPagination from '@/components/AppPagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

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

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          pic: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      if (!this.productsData) {
        return 0;
      }
      return this.productsData.pagination.total || this.productsData.items.length || 0;
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
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    productsPerPage() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
};
</script>

<style scoped>

</style>
