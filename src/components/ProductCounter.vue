<template>
<div>
  <button type="button" aria-label="Убрать один товар" @click.prevent="counterChange(value - 1)">
    <svg width="10" height="10" fill="currentColor">
      <use xlink:href="#icon-minus"></use>
    </svg>
  </button>

  <input type="text" v-model.number="value" name="count">

  <button type="button" aria-label="Добавить один товар"
          @click.prevent="counterChange(value + 1)">
    <svg width="10" height="10" fill="currentColor">
      <use xlink:href="#icon-plus"></use>
    </svg>
  </button>
</div>
</template>

<script>
export default {
  name: 'ProductCounter',
  props: ['value', 'minValue'],
  model: {
    prop: 'value',
    event: 'change',
  },
  methods: {
    counterChange(newCounter) {
      if (newCounter >= this.minValue) {
        this.$emit('change', newCounter);
      }
    },
  },
};
</script>

<style scoped>

</style>
