// 所写者hj
import router from '../router'
import store from '../store'
import cookie from '../utils/storage/cookie'
import { Loading } from 'element-ui';
// const baseUrl ='http://192.168.2.17:8069
// const baseUrl = 'http://120.76.214.182:8086'

const baseUrl = 'http://192.168.4.199:8069'



Date.prototype.format=function(fmt){
    var o={
        "M+":this.getMonth()+1, //月份
        "d+":this.getDate(), //日
        "h+":this.getHours(), //小时
        "m+":this.getMinutes(), //分
        "s+":this.getSeconds(), //秒
        "q+":Math.floor((this.getMonth()+3)/3), //季度
        "S":this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+k+")").test(fmt)) fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)));
    return fmt;
}

String.prototype.format=function(){
    var args=arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m,i){
            return args[i];
        });
}
export default {
    request(obj) {
        var access_token = localStorage.getItem('access_token')
            // var user_id = localStorage.getItem('uid')
        if (!obj.type) { obj.type = "POST" }
        if (!obj.dataType) { obj.dataType = "JSON" }
        if (!obj.data) { obj.data = {} }
        if (!obj.complete) { obj.complete = function() {} }
        if (!obj.urlKey) {
            if (!access_token) {
                MessageBox.alert('登录过期，请重新授权！').then(action => {
                    localStorage.setItem('access_token', '');
                    // router.push('/login')
                })
                return
            } else {
                obj.data.access_token = access_token
                    // obj.data.partner_id = user_id
            }
        }
        $.ajax({
            type: obj.type,
            url: baseUrl + obj.url,
            data: obj.data,
            dataType: obj.dataType,
            beforeSend: function() {
                // Indicator.open({
                //     // text: '加载中...',
                //     spinnerType: 'fading-circle'
                // });
            },
            success: function(data) {
                if ((typeof data) === 'string') {
                    data = JSON.parse(data);
                    data = JSON.parse(data.data);
                }
                return obj.callBack(data)

                // if (data.status == 200) {
                //     return obj.callBack(data)
                // } else if (data.status == 1001) {
                //     MessageBox.alert('登录过期，请重新登录！').then(action => {
                //         localStorage.setItem('access_token', '');
                //         router.push('/login')
                //     })
                // } else {
                //     MessageBox.alert(data.message).then(action => {
                //         return obj.complete(data)
                //     });
                // }
            },
            error: function() {
                Indicator.close()
                MessageBox.alert('网络请求错误！')
            }
        })
    },
    setTitle(text) {
        var $body = $('body');
        document.title = text;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe style="display:none;" src="./static/image/logo.ico"></iframe>').on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    },
    getUrl() {
        return baseUrl
    },
    //加密
    aes_encrypt(s) {
          let encrypt = JSON.stringify(s);
          return '' + CryptoJS.AES.encrypt(encrypt, CryptoJS.enc.Utf8.parse("main__secret_key"), {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding});
    },
    //解密
    aes_decrypt(s) {
          let decrypt = '' + CryptoJS.AES.decrypt(s, CryptoJS.enc.Utf8.parse("main__secret_key"), {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding}).toString(CryptoJS.enc.Utf8);
          return JSON.parse(decrypt);
    },
    //跳转路由事件
    pushRouter(url,query,type) {
        var _query={},_date=new Date();
        if (query) {_query=query;}
        _query.nowDate=_date.format("yyyy-MM-dd hh:mm:ss").replace(/-/g,'').replace(/:/g,'').replace(" ",'');
        cookie.set('routerNowDate', _query.nowDate, {expires: 1});
        console.log(_query.nowDate)
        if(type=='replace'){
            router.replace({path:url,query:_query});
        }else{
            router.push({path:url,query:_query});
        }
    }
}