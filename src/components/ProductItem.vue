<template>
  <div>
  <a class="catalog__pic" href="#">
    <img v-bind:src="product.pic" :alt="product.title">
  </a>

  <h3 class="catalog__title">
    <a href="#">
      {{ product.title }}
    </a>
  </h3>

  <span class="catalog__price">
          {{ product.price }} Р
      </span>

  <ColorList :colors="product.colors" class="colors--black"/>
  </div>
</template>

<script>
import ColorList from '@/components/ColorList.vue';

export default {
  name: 'ProductItem',
  components: {
    ColorList,
  },
  data() {
    return {
      color: '#000',
    };
  },
  props: ['product'],
};
</script>

<style scoped>

</style>
