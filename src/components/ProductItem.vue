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

  <ul class="colors colors--black">

    <li v-for="availableColor in product.colors" :key="availableColor" class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" v-model="color"
               value="availableColor">
        <span class="colors__value" :style="{ backgroundColor: availableColor }">
              </span>
      </label>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  data() {
    return {
      color: '#73B6EA',
    };
  },
  props: ['product'],
};
</script>

<style scoped>

</style>
