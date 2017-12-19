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
            name:'项目合同',
            path:'/projectContract'
          },
          {
            name:'支出合同',
            path:'/'
          },
          {
            name:'开票申请',
            path:'/'
          },
          {
            name:'发票登记',
            path:'/'
          }
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
