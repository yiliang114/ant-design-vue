import PropTypes from '../_util/vue-types';
import Empty from '../empty';
import { ConfigConsumerProps } from './';

const RenderEmpty = {
  // 函数式组件
  functional: true,
  inject: {
    configProvider: { default: () => ConfigConsumerProps },
  },
  props: {
    componentName: PropTypes.string,
  },
  // 函数式的组件获取 props
  render(createElement, context) {
    const { props, injections } = context;
    function renderHtml(componentName) {
      const getPrefixCls = injections.configProvider.getPrefixCls;
      // 获取前缀
      const prefix = getPrefixCls('empty');
      // 这里看出，对于不同组件的空状态，是图片、css 名会不一致（或者没有~）
      switch (componentName) {
        case 'Table':
        case 'List':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} class={`${prefix}-small`} />;

        default:
          return <Empty />;
      }
    }
    return renderHtml(props.componentName);
  },
};

function renderEmpty(h, componentName) {
  return <RenderEmpty componentName={componentName} />;
}

export default renderEmpty;
