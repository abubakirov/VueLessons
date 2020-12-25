<template>
<ul class="colors">
  <li v-for="availableColor in colors" :key="availableColor.id" class="colors__item">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        v-model="currentColor"
        :value="availableColor"
      >
      <span class="colors__value" :style="{ backgroundColor: availableColor.code }">
            </span>
    </label>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ColorList',
  props: ['colors', 'color'],
  computed: {
    currentColor: {
      get() {
        return this.color;
      },
      set(value) {
        this.$emit('update:color', value);
      },
    },
  },
};
</script>

<style scoped>

</style>
