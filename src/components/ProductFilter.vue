<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input"
                 type="text"
                 name="min-price"
                 value="0"
                 v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input"
                 type="text"
                 name="max-price"
                 value="12345"
                 v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select"
                  type="text"
                  name="category"
                  v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color"
                     :value="color" @click="currentColor = color">
              <span class="colors__value" v-bind:style="{ backgroundColor: color }">
                </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume"
                     value="8" checked="">
              <span class="check-list__desc">
                  8
                  <span>(313)</span>
                </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                  16
                  <span>(461)</span>
                </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                  32
                  <span>(313)</span>
                </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                  64
                  <span>(313)</span>
                </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume"
                     value="128">
              <span class="check-list__desc">
                  128
                  <span>(313)</span>
                </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume"
                     value="264">
              <span class="check-list__desc">
                  264
                  <span>(313)</span>
                </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import categories from '../data/categories';

export default {
  name: 'ProductFilter',
  props: ['filterPriceFrom', 'filterPriceTo', 'filterCategoryId', 'filterColor', 'colors'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: 'None',
    };
  },
  computed: {
    categories() {
      return categories;
    },
  },
  watch: {
    filterPriceFrom(value) {
      this.currentPriceFrom = value;
    },
    filterPriceTo(value) {
      this.currentPriceTo = value;
    },
    filterCategoryId(value) {
      this.currentCategoryId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:filterPriceFrom', this.currentPriceFrom);
      this.$emit('update:filterPriceTo', this.currentPriceTo);
      this.$emit('update:filterCategoryId', this.currentCategoryId);
      this.$emit('update:filterColor', this.currentColor);
    },
    reset() {
      this.currentCategoryId = 0;
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentColor = 'None';
      this.submit();
    },
  },
};
</script>

<style scoped>

</style>
