<template>
  <div class="left-side">
    <ul>
      <router-link :to="item.path" tag="li" v-for="(item,index) in tit" :key="index">{{item.name}}</router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'leftSlide',
    props:[
      'tit'
    ],
    data:function(){
    	return{

    	}
    },
    created(){
                
    },
    mounted(){
    },
    methods:{
     
    }
  }
</script>

<style lang="less" scoped>
  .left-side{
    float: left;
    width: 150px;
    height: 500px;
    background-color: gray;
  }

</style>
