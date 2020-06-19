import PropTypes from '../_util/vue-types';
import defaultLocaleData from './default';

export default {
  name: 'LocaleReceiver',
  props: {
    componentName: PropTypes.string.def('global'),
    // 默认的 区域设置
    defaultLocale: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    children: PropTypes.func,
  },
  inject: {
    localeData: { default: () => ({}) },
  },
  methods: {
    getLocale() {
      const { componentName, defaultLocale } = this;
      const locale = defaultLocale || defaultLocaleData[componentName || 'global'];
      const { antLocale } = this.localeData;

      const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
      return {
        ...(typeof locale === 'function' ? locale() : locale),
        ...(localeFromContext || {}),
      };
    },

    getLocaleCode() {
      const { antLocale } = this.localeData;
      const localeCode = antLocale && antLocale.locale;
      // Had use LocaleProvide but didn't set locale
      if (antLocale && antLocale.exist && !localeCode) {
        return defaultLocaleData.locale;
      }
      return localeCode;
    },
  },

  render() {
    const { $scopedSlots } = this;
    // 主动传入的 children 的优先级会高一些。 否则的话取作用域插槽函数
    const children = this.children || $scopedSlots.default;
    const { antLocale } = this.localeData;
    // TODO: 作用域插槽函数，能传那么多参数么...
    return children(this.getLocale(), this.getLocaleCode(), antLocale);
  },
};
