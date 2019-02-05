import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/login'
import home from '../pages/home/home'
import Main from '../pages/main/main'
import Form from '../pages/components/form/form'
import Table from '../pages/components/form/table'
import User from '../pages/components/form/user'
import Charts from '../pages/components/charts/charts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden: true
    },
    {
      path: '/',
      name: '列表',
      component: home,
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/main', component: Main, name: '主页', hidden: true },
        { path: '/table', name: 'Table', component: Table },
        { path: '/from', name: 'Form', component: Form },
        { path: '/user', name: 'User', component: User }
      ]
    },
    {
      path: '/',
      name: '图表',
      component: home,
      iconCls: 'fa fa-bar-chart',
      children: [
        { path: '/charts', name: 'Charts', component: Charts }
      ]
    }
  ]
})
