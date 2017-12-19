<template>
    <div class="header-nav">
      <div class="logo fl">
        logo
      </div>
      <nav>
        <div @click="changePage('setReport')" :class="{active:activeArr[0]}">首页</div>
        <div @click="changePage('projectContract')" :class="{active:activeArr[1]}">项目</div>
        <div @click="changePage('userCenter')" :class="{active:activeArr[2]}">个人</div>
      </nav>
    </div>
</template>
<script>
	export default{
    data(){
      return {
       activeArr: [true, false, false]
      }
    },
    components:{
    },
    computed:{
    },
    methods:{
     changePage(url){
      this.$router.push(url);
      if (url == "setReport") {
        this.activeArr = [true, false,false];
      }else if (url == "projectContract"){
        this.activeArr = [false, true, false];
      }else{
        this.activeArr = [false, false, true];
      }
     }
    },
    mounted(){
    },
	}
</script>
<style lang='less'>
     @import "../assets/css/base.less";
    .header-nav {
      height: 80px;
      background-color: #dedede;
      .logo {
        width: 150px;
        height: 100%;
      }
      nav div{
        cursor: pointer;
        width: 80px;
        float: left;
      }
    }
</style>
