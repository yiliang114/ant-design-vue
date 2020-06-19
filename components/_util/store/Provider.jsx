import { storeShape } from './PropTypes';
export default {
  name: 'StoreProvider',
  props: {
    store: storeShape.isRequired,
  },
  provide() {
    return {
      storeContext: this.$props,
    };
  },
  render() {
    // 默认只会渲染第一个插槽的元素值。
    // default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
    return this.$slots.default[0];
  },
};
