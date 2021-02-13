import BaseFormField from '@/components/BaseFormField.vue';

export default {
  name: 'BaseFormText',
  components: { BaseFormField },
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },
  },
};
