<template>
    <!-- <div>
        <headerbox></headerbox>
        <sidebar></sidebar>
        <router-view></router-view>
    </div>     -->
    <div class="whole_body">
        <sidebar class="my-aside"></sidebar>
        <div class="my-body">
           <headerbox></headerbox>
           <div class="my-content">
              <router-view></router-view>
           </div>
        </div>
    </div>
</template>
<script>
import myHead from '../menu/header'
import sideBar from '../menu/sidebar'
  export default {
    name:'home',
    components:{
        'headerbox':myHead, 
        'sidebar':sideBar,
    },
    data() {
      
      return {
       
      }
    }
  };
  
</script>
<style lang="scss" scoped>
  *{padding:0;margin:0}  
  .whole_body {
      position: absolute;
      top:0;
      bottom:0;
      display: flex;
      width:100%;
      overflow-x: hidden;
      background: #f3f5f8;
  }
      .my-body {
          width: calc( 100% - 200px );
          margin: 62px 0 0 200px;
          position: absolute;
          top:0;
          bottom: 0;
          background: #fff;
      }
</style>
