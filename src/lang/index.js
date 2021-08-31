import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'

import zhLocale from './zhLocale'
import enLocale from './enLocale'

import eleenLocale from 'element-ui/lib/locale/lang/en'
import elezhLocale from 'element-ui/lib/locale/lang/zh-CN'


Vue.use(VueI18n)

//准备的语言环境
const messages = {
    en: {//英文
      ...enLocale,
      ...eleenLocale
    },
    zh: {//中文
      ...zhLocale,
      ...elezhLocale
    }
  }

  // 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages, // 设置地区信息
  })
//配置element支持i18n
Element.i18n((key,value)=>i18n.t(key,value))
export default i18n