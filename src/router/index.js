import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import store from '../store'
import cookie from '../utils/storage/cookie'
//login
const login = r => require.ensure([], () => r(require('../view/auth/login')),'login')
//主页面结构

const setReport = r => require.ensure([], () => r(require('../view/home/set_report')),'setReport') //项目立项
const myBacklog = r => require.ensure([], () => r(require('../view/home/my_backlog')),'myBacklog') //我的待办



const projectContract = r => require.ensure([], () => r(require('../view/project/project_contract')),'setProject')
//开票
// const incoice=r=>require.ensure([],()=> r(require('../view/incoice/incoice')),'incoice');
//工作台
// const workbench=r=>require.ensure([],()=>r(require('../view/workbench/workbench')),'workbench')


Vue.use(Router)
const routes = [
      {path: '',redirect: '/setReport'},
      {path: '/setReport',name: 'setReport',component: setReport},
      {path: '/myBacklog',name: 'myBacklog',component: myBacklog},
      
      {path: '/projectContract',name: 'projectContract',component: projectContract},
      {path: '/login',name: 'login',component: login},
      // {path:'/invoice',name:'invoice',component:incoice}
      // {path:'/workbench',name:'workbench',component:workbench}
]

const router = new Router({
  // mode:'history',//default: hash ,history
  routes,
  linkActiveClass:"my-active",
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})


//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
      let toName = to.name
      // let login = store.state.login.user_info.login;
      // let _isMember = false;
      // if (login) {
      //     _isMember = true;
      // }
      // if ((_loginIn && _user.login) || login) {
      //     _isMember = true;
      // }
      // if (!_loginIn) {
      //     _isMember = false;
      // }
      // if (!_isMember && toName !== 'login') {
      //   //清除自动刷新token的功能
      //   // config.clearToken();
      //   next({
      //     name: 'login'
      //   })
      // } else {
        if (toName === 'login') {
          // next({
          //   path: '/'
          // })
           next()
        } else {
            // if (!toName) {
            //     // if (login) {
            //         if (store.state.login.user.group_name=="trader") {
            //             //贸易商
            //               next({
            //                   name: "homeComponent"
            //               })
            //         }else if (store.state.login.user.group_name=="provider") {
            //             //供应商
            //         }else if(store.state.login.user.group_name=="purchaser") {
            //             //采购方
            //         }else if(store.state.login.user.group_name=="platform") {
            //             //平台管理员
            //               next({
            //                 name: "platformSalesOrder"
            //               })
            //         }
            // }else{
                    next()
            // }
        }
})



//路由完成之后的操作
// router.afterEach(route => {
// })

export default router