<template>
  <div>
  <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
    <img v-bind:src="product.pic" :alt="product.title">
  </a>

  <h3 class="catalog__title">
    <a href="#">
      {{ product.title }}
    </a>
  </h3>

  <span class="catalog__price">
          {{ product.price | numberFormat }} ₽
      </span>

  <ColorList :colors="product.colors" class="colors--black"/>
  </div>
</template>

<script>
import ColorList from '@/components/ColorList.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  filters: {
    numberFormat,
  },
  components: {
    ColorList,
  },
  data() {
    return {
      color: '#000',
    };
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
};
</script>

<style scoped>

</style>
