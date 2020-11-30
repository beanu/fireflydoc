module.exports = {
  base: '/doc/',
  dest: 'docs',
  locales: {
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
      title: '链联金服文档',
      description: '链联金服文档网站'
    }
  },

  themeConfig: {
    editLinks: true,
    docsDir: 'src',
    locales: {
      '/': {
        lang: 'zh-CN',
        label: '简体中文',
        selectText: 'Language',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/guide/': guideSideBar('指南'),
          '/jsapi/': jsAPISideBar('JS API'),
          '/urlschema/': urlSchemaSideBar('URL Schema'),
          '/stellar/': stellarSideBar('恒星基础知识')
        }
      }
    },

  }

}


function guideSideBar(title){
  return [
    {
      title: title,
      collapsable: false,
      children: [
        '',
        'example'
      ]
    }
  ]
}

function jsAPISideBar(title){
  return [
    {
      title: title,
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}

function urlSchemaSideBar (title) {
  return [
    {
      title: title,
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}

function stellarSideBar (title) {
  return [
    {
      title: title,
      collapsable: false,
      children: [
        ''
      ]
    }
  ]
}