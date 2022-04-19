<template>
  <div class="hello">
     <el-input v-model="username" placeholder="请输入用户名"></el-input>
     <el-input v-model="password" placeholder="请输入密码"></el-input>
     <el-button type="primary" @click="tologin">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      username:'',
      password:''
    }
  },
  methods:{
    tologin:function(){
      console.log(11111111111);
       this.$router.push({
          path: '/index'
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-input{width: 180px;}
</style>
