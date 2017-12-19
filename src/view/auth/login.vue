<template>
    <div class="login">
          <div class="content">
                <div class="loginWarp" @keyup.enter="SignIn">
                          <div class="loginSignIn">登 录</div>
                          <div class="login-form">
                                <div class="login-item">
                                    <label for="YL_username" >
                                         <i class="icon-png icon-user"></i>
                                    </label>
                                    <input id="YL_username" @blur="check_user" v-model="form.username" placeholder="使用邮箱/手机号登陆" class="form-input" :autofocus="true" type="text" :class="{redInput:userCode}" />
                                    <span v-if="userCode" class="spot prompt">{{codeMsg}}</span>
                                </div>
                                <div class="login-item loginItem">
                                    <label for="YL_password">
                                         <i class="icon-lock icon-png"></i>
                                    </label>
                                    <input @blur="check_passwd" id="YL_password" type="password" v-model="form.password" placeholder="请输入密码" class="form-input" :class="{redInput:passWordCode}" />
                                    <span v-if="loginNoPass"  class="spot prompt">登录名或登录密码不正确</span>
                                    <span v-if="passWordCode"  class="spot prompt">{{codePass}}</span>
                                </div>
                                <!-- <div class="login-Password"><span>找回密码</span></div> -->
                                <div class="login-submit" @click="SignIn">登录</div>
                          </div>
                </div>
          </div>
    </div>
</template>
<script>
  import cookie from '../../utils/storage/cookie'
  // import { MessageBox } from 'mint-ui'
	export default{
    data(){
      return {
        activeName: 'first',
        form: {
          username: '',
          password: ''
        },
        passWordCode:'',
        userCode:'',
        codePass:"",
        codeMsg:"",
        // loginNoPass:false,
      }
    },
    components:{

    },
    created(){
        //首次正确登录后，记住用户名
        // let _username=cookieStorage.get('username');
        // var reg= /(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|7|5|8]\d{9}$)/;
        // if(reg.test(_username)){
        //     this.form.username=_username;
        // }
    },
    computed:{
            loginNoPass(){
                 // if (this.$store.getters.getLoginIsPass) {
                 //     this.userCode=false;
                 //     this.passWordCode=false;
                 // }
                 // return this.$store.getters.getLoginIsPass
                 return false
            },
    },
    methods:{
      check_passwd(){
          //密码验证
              var password =this.form.password;
              var reg = /^(\w){5,12}$/;
              if(!reg.exec(password)){
                this.passWordCode = true;
                this.$store.dispatch('upIsLogin',false);
                this.codePass="只能输入5-12个字母、数字、下划线"
              }else{
                this.passWordCode = false;
              }
              if(password == ""){
                this.passWordCode = true;
                this.$store.dispatch('upIsLogin',false);
                this.codePass="密码不能为空";
              }
      },
      check_user(){
        // 账户验证
              var user = this.form.username;
              var reg= /(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|7|5|8]\d{9}$)/;
                if(!reg.test(user)){
                  this.userCode=true;
                   this.$store.dispatch('upIsLogin',false);
                  this.codeMsg = "无效的手机号或邮箱";
                }else{
                  this.userCode=false;
                }
                if(user == ""){
                  this.userCode=true;
                  this.$store.dispatch('upIsLogin',false);
                  this.codeMsg = "用户名不能为空";
                }
      },
      SignIn(){
              var me=this;
              var username = 'admin';
              var password = '123456';
              // me.$loading('加载中')
              // if (!me.passWordCode && !me.userCode) {
                  let userInfo ={
                      "username":username,
                      "password":password
                  }
                  me.$store.dispatch('loginIn',userInfo);
               // }
      }
    },
    mounted(){
    },
	}
</script>
<style lang='less'>
     @import "../../assets/css/base.less";
     .login{
         font-family:"Microsoft YaHei";
         height: 100%;
         .content{
            position: absolute;
            min-height: 530px;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background:@white url(../../assets/image/login_bg.png) no-repeat;
            background-size:100% 100%;
            .loginWarp{
                border-radius: 4px;
                background: @white;
                margin-top: 25px;
                padding:0 20px ;
                z-index: 2;
                width: 300px;
                .positionCenter;
                .loginSignIn{
                    height: 100px;
                    padding-top: 30px;
                    text-align: center;
                    color: @Yellow;
                    font-size: 18px;
                    font-weight: bold;
                }
                .login-form{
                    font-size: 14px;
                    color: @black;
                    .login-item.loginItem{
                         margin-bottom: 40px;
                    }
                    .login-item{
                         position: relative;
                         margin-bottom: 20px;
                         .prompt{
                             position: absolute;
                             font-size: 12px;
                             color: #ff0000;
                             padding-left: 10px;
                         }
                         >label{
                             position: absolute;
                             height: 40px;
                             width: 36px;
                             left: 5px;
                             top: 0px;
                             .icon-png{
                                 .positionCenter;
                                 height:16px;
                                 width:16px;
                                 z-index: 2;
                             }
                             .icon-user{
                                 background:@white -25px 0 url(../../assets/image/yunlian_icon.png) no-repeat;
                             }
                             .icon-lock{
                                 background:@white -57px 0 url(../../assets/image/yunlian_icon.png) no-repeat;
                             }

                         }
                         input.form-input{
                             cursor: pointer;
                             width: 260px;
                             height: 40px;
                             border-radius: 0px;
                             border:1px solid @gray;
                             border-left: 5px solid @gray;
                             padding-left: 36px;
                             font-size: 14px;
                         }
                         input.redInput{
                             border-color: #ff0000;
                         }
                         input.form-input:hover,
                         input.form-input:focus{
                             border:1px solid @Yellow;
                             border-left: 5px solid @Yellow;
                         }
                         input::-webkit-input-placeholder{
                           color: @gray;
                         }
                         input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                           color: @gray;
                         }
                         input::-moz-placeholder { /* Mozilla Firefox 19+ */
                           color: @gray;
                         }
                         input:-ms-input-placeholder { /* Internet Explorer 10+ */
                           color: @gray;
                         }
                    }
                    .login-item.loginitem{
                         margin-bottom: 16px;
                    }
                    .login-Password{
                       margin-bottom: 30px;
                       text-align: right;
                       >span:hover{
                          cursor:pointer;
                          text-decoration: underline;
                       }
                   }
                   .login-submit{
                       height: 40px;
                       line-height: 40px;
                       font-size: 16px;
                       border-radius: 4px;
                       text-align: center;
                       margin-bottom: 20px;
                       cursor: pointer;
                       .bottomStyle;
                   }
                   .login-submit:hover{
                       background: @lightYellow;
                   }
                }
            }
         }
     }
</style>
