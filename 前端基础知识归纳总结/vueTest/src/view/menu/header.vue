<template>
    <div class="headerbox">
        <ul class="leftNav"> 
            <!-- <li>生活圈</li>
            <li>个人圈</li>
            <li>工作圈</li> -->
            <li @click="addCart">首页</li>
            <li>首页</li>
            <li>首页</li>
        </ul>
        <ul class="rightNav">
            <!-- <li>首页</li>
            <li>涨知识</li>
            <li>留言板</li>
            <li>关于</li> -->
            <li>首页</li>
            <li>首页</li>
            <li>首页</li>
            <li>首页</li>
        </ul>

    </div>
</template>
<script>
export default {
    data(){
        return{
            callData:{
            ServiceDirect:null,
            callId:null,         
          },
        }       
    },
    methods:{
         addCart(){
             this.callData.ServiceDirect=5;
             this.callData.callId=100;
            this.bus.$emit('getMessage',this.callData);
             this.$axios.post('/api/login', {userAccount:'admin',password: 'Aa123456'}).then((response)=> {
                 console.log(response);
                  if(response.data.code==0){
                      console.log(response);
                  }
                  else{
                     
                  }
              }).catch( (error)=> {
                  console.log(error);
              });
        },
    },
}
</script>
<style>
    *{padding:0;margin:0}
    .headerbox{
        width: 100%;
        height: 62px;
        background-color: #f8f8f8;
        line-height: 62px;
        vertical-align: middle;
        position: fixed;
        top: 0;
    }
    .leftNav{
        width:40%;float:left;display:flex;list-style: none;
    }
    .leftNav :first-child{
        padding-left: 100px;
    }
    .leftNav li{padding-right: 30px;}
    .rightNav{
        width:60%;float:left;display:flex;list-style-type: none;background-color: transparent;
    }
    .rightNav :first-child{
        padding-left: 100px;
    }
    .rightNav li{padding-right: 30px;}
</style>


