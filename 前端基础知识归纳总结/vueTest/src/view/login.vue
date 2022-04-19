<template>
    <div class="loginBox">
        <el-form ref="form" :model="loginform" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="loginform.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginform.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="tologin">登录</el-button>
                <el-button>取消</el-button>
            </el-form-item>
         </el-form>
    </div>
</template>
<script>
export default {
    name: 'login',
    data(){
         return {
            loginform:{
                username:'',
                password:'' 
             }
        }
    },
    methods:{
        tologin:function(){
            console.log(11);
            this.$router.push({
                path: '/home'
            })
        }
    }
}
</script>

<style scoped>
.el-form{width: 350px;margin: 0 auto}
</style>

