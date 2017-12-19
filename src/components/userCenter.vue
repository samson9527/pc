<template>
    <div>
      <header-nav></header-nav>
      <div>
        <left-side :tit="arr"></left-side>
        <slot></slot>  
      </div>
      
    </div>
</template>
<script>
  import headerNav from '../components/headerNav'
  import leftSide from '../components/leftSlide'
  export default{
    data(){
      return {
       arr:[
          {
            name:'经营责任书',
            path:'/setReport'
          },
          {
            name:'我的客户',
            path:'/myBacklog'
          },
          {
            name:'工作状态',
            path:'/'
          },
          {
            name:'我关注的',
            path:'/'
          },
       ]
      }
    },
    components:{
      leftSide,headerNav
    },
    computed:{
    },
    methods:{
     
    },
    mounted(){
    },
  }
</script>
<style lang='less'>
     @import "../assets/css/base.less";
    
</style>
