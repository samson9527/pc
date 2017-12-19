import * as types from '../mutation-types'
import cookie from '../../utils/storage/cookie'
import router from '../../router'
import store from '../../store'
import api from '../../utils/api'


// initial state
const state = {
   user_info:{
      nav_menu_data:[],
      login:false,
      user_id:null,
   },
   _at:"",
   refresh_at:"",
   //登录未通过
   loginNoPass:false,
}

// getters
const getters = {
   getAcessToken: state => state._at,
   getUserInfo: state => state.user_info,
   getNavMenuData: state => state.user_info.nav_menu_data,
}

// actions
const actions = {
   loginIn({ commit },userinfo) {
    debugger
       if (userinfo.username=='admin' && userinfo.password=='123456') {
           commit(types.SET_USER_INFO, userinfo)
       }
   },
   deleteUserInfo({ commit },userinfo) {
       commit(types.DEL_USER_INFO, userinfo)
   },
}

// mutations
const mutations = {
  //设置用户信息和是否登录
  [types.SET_USER_INFO](state, userinfo){
    debugger
    router.push({
       path: '/home/homeComponent'
    })
  },
  [types.DEL_USER_INFO](state, userinfo){
  },
  // [types.SET_ACESS_TOKEN](state, userinfo){
  //    state._at=config.aes_encrypt(userinfo.access_token);
  // },
}

export default {
  state,
  getters,
  actions,
  mutations
}
