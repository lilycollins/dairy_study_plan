<template>
    <div>
            <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline" :rules="rules">
                <el-form-item label="审批人" prop="user">
                    <el-input v-model="formInline.user" placeholder="审批人" :maxlength=5></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
                </el-form-item>

                <el-form-item label="案件上传" prop="file" style="position:relative;">
                      <el-input v-model="formInline.filename" readonly="readonly"></el-input>
                      <a href="javascript:;" class="upload_input">
                          <input type="file" name="files" @change="uploadFile" id="logo_img" title=" "  clearable>
                      </a>                 
              </el-form-item>
            </el-form>
            <div>
                <input type="text" v-model="msg" />
                {{msg| filtername }}
                {{test| filterOne }}
            </div>
            <div> {{message}} =={{reverseMessage}}</div>
            <!-- 实现三栏布局之table -->
             <!-- <div style="display:table;width:100%">
               <div style="width:200px;background:pink;display:table-cell">111</div>
               <div class="second" style="display:table-cell;"></div>
               <div style="width:200px;background:green;display:table-cell">333</div>
            </div> -->
           <!-- 实现三栏布局之flex -->
            <!-- <div style="display:flex;width:100%;">
               <div style="width:200px;background:pink;">111</div>
               <div style="width: calc(100% - 400px)">hfghfghfhfgh</div>
               <div style="width:200px;background:green;">333</div>
            </div> -->
            <!-- 实现三栏布局之网格,不设置高度的时候高度统一为最高的高度-->
            <!-- <div style="display:grid;width:100%;grid-template-columns:200px auto 200px">
               <div style="background:pink;">sfdj<br />fsafasf<br />fsdfsf</div>
               <div>hfghfghfhfgh</div>
               <div style="background:green;">333</div>
            </div> -->

            <template>
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                </el-table>
            </template>
            <el-input  v-model="inputvalue" @input="inputChange" style="width:280px"></el-input>
            <!-- 搜索框内容 -->
            <div class="search-box" style="width:280px;border:1px solid #ccc;">

            </div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>

    </div>    
</template>
<script>
import {mapActions,mapState,mapGetters} from 'vuex'
  export default {
    name:'firstIndex',
    data() {
      return {
       inputvalue:"",
       

       formInline: {
          user: '',
          region: '',
          filename:'',
        },
        msg:1111111,
        test:1,
        message:'hello',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
    },
    filters:{
        filtername:function(value){
            // console.log(value);
            return value+22222;
        }
    },
    computed:{
        reverseMessage(){
            return this.message.split('').reverse().join('')
        },
    },
    methods:{
         submitForm(formName) {
             console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
         // 上传文件
      uploadFile() {
        var files = document.getElementById("logo_img").files;
        console.log(files);
        // this.sendForm.file=files[0];
        // this.sendForm.filename=this.sendForm.file.name;
        // // 获取到图片后把input框内的图片删除,这样选同一张图片上传时才会触发change事件
        // document.getElementById("logo_img").value="";
      },
        inputChange(){
            console.log(this.inputvalue);

        },
      onSubmit(formName) {
          console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getList(a){
          console.log(a,arguments[1]);
      },
      resolve(e){
          console.log('resolve',e);
      },
      reject(e){
          console.log('error',e)
      }
    },
    created(){
        // this.getList(1,2,3);
        // const promise= new Promise((resolve,reject) => {
        //     if(Math.random()>0.5){
        //         resolve(1)
        //     }
        //     else{
        //         reject(2)
        //     }
        // })
        // js单线程的任务执行顺序.setTimeout属于注册事件,绑定的事件是当前事件队列(同步事件)执行完毕后再执行.
        // for(var i = 0; i < 6; i ++){
        // setTimeout(function(){
        // console.log(i);
        // },1000);
        // }
        // // 一秒钟后输出 6 6 6 6 6 

        // //一秒钟后输出0 1 2 3 4 5
        // for(let i = 0; i < 6; i ++){
        // setTimeout(function(){
        // console.log(i);
        // },1000);
        // }
        // for(var i=0;i<6;i++){
        // (function(j){
        // setTimeout(function(){
        // console.log(j)
        // },1000)
        // })(i)
        // }

        //最先输出0，然后每间隔一秒输出1，2，3，4，5
        // for(let i=0;i<6;i++){
        // setTimeout(function(){
        // console.log(i) 
        // },1000*i)
        // }
        // var arr = [];
        // for(let i=0;i<6;i++){
        // arr[i] = new Promise((resolve,reject)=>{
        // setTimeout(()=>{
        // console.log(i);
        // resolve();
        // },1000*i)
        // })
        // }
        // Promise.all(arr)

        // for(let i=0;i<6;i++){
        // await (async ()=>{
        // setTimeout(()=>{
        // console.log(i)
        // },1000*i) 
        // })()
        // }
        var resources = [
            { name: "张三", age: "18" },
            { name: "张三", age: "19" },
            { name: "张三", age: "20" },
            { name: "李四", age: "19" },
            { name: "王五", age: "20" },
            { name: "赵六", age: "21" }
        ]
            // 去除重复数据
            var cloneObj1 = {};
            resources.reduce(function(item,next){
                cloneObj1[next.id] ? '' :cloneObj1[next.id] = true && item.push(next);
                return item;
            },[])

    }
  };
  
</script>
<style>
.search-box{
    animation: collapse 1s alternate;
    position: relative;
}
.search-box:before{
    content: "/////";
    position: absolute;
    top: 0;
}
.search-box:after{
    position: absolute;
    display: block;
    left: 20px;
    top: 20px;
    content: " ";
    width: 20px;
    height: 20px;
    background: #6F3;
}
@keyframes collapse {
    0%{height: 0px;}
    100%{height: 200px}
    
}
</style>
