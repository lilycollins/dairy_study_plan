<template>
    <div>
        <el-form :model="formatterData" ref="formatterData" label-width="180px" :rules="rules">
                        <div style="width: 50%;" class="align_center"
                             v-for="(item,cfdIndex) in formatterData" :key="cfdIndex">
                          <div>
                            <span class="order-header">{{parseInt(cfdIndex)+1}} - {{item.name}}</span>
                            <hr>
                          </div>
                          <div>
                            <el-form-item
                              v-show="field.is_show == true"
                              :label="field.desc"
                              v-for="(field, index) in item.fields"
                              :key="index"
                              :prop="field.name"
                              :rules="{required: field.required === 'TRUE'?true:false, message: field.desc+'不能为空', trigger: 'blur'}"
                            >
                              <el-input
                                v-model="field.value"
                                v-if="field.type=='str' "
                                style="width: 80%"
                              />
                              <el-input
                                type="number"
                                v-model="field.value"
                                v-if="field.type=='int'"
                                style="width: 80%"
                              />
                              <el-switch
                                v-if="field.type=='bool'"
                                style="display: block"
                                v-model="field.bootValue"
                                active-value=true
                                inactive-value=false
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                              </el-switch>

                              <el-select
                                v-model="field.value"
                                v-else-if="field.type=='enum' && field.is_show"
                                placeholder="请选择 "
                                style="width: 80%"
                              >
                                <el-option
                                  v-for="(itemSelect,index) in field.values"
                                  :key="index"
                                  :label="itemSelect.label"
                                  :value="itemSelect.label">
                                </el-option>
                              </el-select>
                              <el-input type="textarea" v-model="field.value"
                                        v-if="field.type === 'textarea'"></el-input>
                            </el-form-item>
                          </div>
                        </div>
                      </el-form>
                      <el-button type="primary"  @click="submitForm('formatterData'),getdata()">立即创建</el-button> 
                  <input :value="mes"  @input="mes= $event.target.value"/>
        <!-- <el-form :model="formatterData" ref="formatterData" label-width="180px">
        <div style="width: 50%;" class="align_center"
                v-for="(item,cfdIndex) in formatterData" :key="cfdIndex">
            <div>
            <span class="order-header">{{parseInt(cfdIndex)+1}} - {{item.name}}</span>
            <hr>
            </div>
            <div>
                <el-form v-for="(field, index) in item.fields" :key="index" :model="field" ref="field" label-width="180px" :rules="rules"> 
                    <el-form-item
                    v-show="field.is_show == true"
                    :label="field.desc"                          
                    :prop="field.value"                                   
                    >
                    <el-input
                        v-model="field.value"
                        v-if="field.type=='str' "
                        style="width: 80%"
                    />
                    <el-input
                        type="number"
                        v-model="field.value"
                        v-if="field.type=='int'"
                        style="width: 80%"
                    />
                    <el-switch
                        v-if="field.type=='bool'"
                        style="display: block"
                        v-model="field.bootValue"
                        active-value=true
                        inactive-value=false
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>

                    <el-select
                        v-model="field.value"
                        v-else-if="field.type=='enum' && field.is_show"
                        placeholder="请选择 "
                        style="width: 80%"
                    >
                        <el-option
                        v-for="(itemSelect,index) in field.values"
                        :key="index"
                        :label="itemSelect.label"
                        :value="itemSelect.label">
                        </el-option>
                    </el-select>
                    <el-input type="textarea" v-model="field.value"
                                v-if="field.type === 'textarea'"></el-input>        
                    </el-form-item>
                </el-form>                              
            </div>
            <el-button type="primary"  @click="submitForm('field')">立即创建</el-button> 
        </div>
        </el-form> -->
    
    
    
    
    
    
    </div>
</template>

<script>
export default {
    name:'thirdIndex',
    data(){
        return{
            value:'',
            mes:'11',
            formatterData:{ "0": { "id": 4, "stage": 1, "status": "exception", "name": "数据采集", "fields": [ { "required": "TRUE", "type": "str", "name": "name", "desc": "名称", "show_key": "origin", "value": "", "is_show": true }, { "type": "enum", "required": "TRUE", "values": [ { "label": "BJ", "value": "" }, { "label": "NJ", "value": "" } ], "name": "cluster_location", "desc": "部署机房", "show_key": "origin", "value": "", "is_show": true }, { "type": "enum", "required": "TRUE", "values": [ { "label": "KAFKA", "value": "" }, { "label": "ROCKET_MQ", "value": "" }, { "label": "RABBIT_MQ", "value": "" } ], "name": "source_type", "desc": "source 类型", "show_key": "origin", "value": "", "is_show": true }, { "type": "enum", "required": "TRUE", "values": [ { "label": "KAFKA", "value": "" }, { "label": "HDFS", "value": "" } ], "name": "sink_type", "desc": "sink 类型", "show_key": "origin", "value": "", "is_show": true }, { "required": "TRUE", "type": "str", "name": "name_servers", "desc": "Rocket MQ name servers", "is_show": false, "show_key": "source_type.ROCKET_MQ" }, { "required": "TRUE", "type": "str", "name": "topic", "desc": "topic", "is_show": false, "show_key": "source_type.ROCKET_MQ" }, { "required": "TRUE", "type": "str", "name": "consumer_group", "desc": "消费组", "is_show": false, "show_key": "source_type.ROCKET_MQ" }, { "required": "TRUE", "type": "str", "name": "username", "desc": "topic", "is_show": false, "show_key": "source_type.ROCKET_MQ" }, { "required": "TRUE", "type": "str", "name": "password", "desc": "消费组", "is_show": false, "show_key": "source_type.ROCKET_MQ" }, { "required": "TRUE", "type": "str", "name": "addresses", "desc": "MQ 连接信息[ip:port]，多个逗号隔开", "is_show": false, "show_key": "source_type.RABBIT_MQ" }, { "required": "TRUE", "type": "str", "name": "exchange_name", "desc": "交换机", "is_show": false, "show_key": "source_type.RABBIT_MQ" }, { "required": "TRUE", "type": "str", "name": "queue_name", "desc": "队列", "is_show": false, "show_key": "source_type.RABBIT_MQ" }, { "required": "TRUE", "type": "str", "name": "bindings", "desc": "route key", "is_show": false, "show_key": "source_type.RABBIT_MQ" }, { "required": "TRUE", "type": "bool", "name": "durable_queue", "desc": "队列是否持久化", "is_show": false, "show_key": "source_type.RABBIT_MQ", "bootValue": "false" }, { "required": "TRUE", "type": "bool", "name": "durable_exchange", "desc": "交换机是否持久化", "is_show": false, "show_key": "source_type.RABBIT_MQ", "bootValue": "false" }, { "required": "TRUE", "type": "str", "name": "username", "desc": "topic", "is_show": false, "show_key": "source_type.RABBIT_MQ" }, { "required": "TRUE", "type": "str", "name": "password", "desc": "消费组", "is_show": false, "show_key": "source_type.RABBIT_MQ" }, { "type": "enum", "required": "TRUE", "values": [ { "label": "NJ_TEST", "value": "" }, { "label": "NJ_ODS", "value": "" }, { "label": "NJ_EXCHANGE", "value": "" }, { "label": "NJ_SDK", "value": "" }, { "label": "NJ_AD", "value": "" }, { "label": "NJ_MAJOR", "value": "" }, { "label": "BJ_MAJOR", "value": "" } ], "name": "cluster_name", "desc": "Kafka 集群", "is_show": false, "show_key": "source_type.KAFKA" }, { "required": "TRUE", "type": "str", "name": "topic", "desc": "topic", "is_show": false, "show_key": "source_type.KAFKA" }, { "type": "enum", "required": "TRUE", "values": [ { "label": "HOURLY", "value": "" }, { "label": "DAILY", "value": "" } ], "name": "partition_type", "desc": "分区类型", "is_show": false, "show_key": "sink_type.HDFS" }, { "type": "enum", "required": "TRUE", "values": [ { "label": "NJ_TEST", "value": "" }, { "label": "NJ_ODS", "value": "" }, { "label": "NJ_EXCHANGE", "value": "" }, { "label": "NJ_SDK", "value": "" }, { "label": "NJ_AD", "value": "" }, { "label": "NJ_MAJOR", "value": "" }, { "label": "BJ_MAJOR", "value": "" } ], "name": "cluster_name", "desc": "Kafka 集群", "is_show": false, "show_key": "sink_type.KAFKA" }, { "required": "TRUE", "type": "str", "name": "topic", "desc": "topic", "is_show": false, "show_key": "sink_type.KAFKA" } ] } },
            rules: {
                name:[
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
             }
        }
    },
    methods:{
       submitForm(formName) {
           console.log(this.$refs[formName])
        //    field.forEach((ele, index) => {
        //         this.$refs['formName'][index].validate((valid) => {
        //         if (valid) {
        //             console.log("submit")
        //         } else {
        //              console.log("error")
        //         }
        //         })
        // })
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     // alert('submit!');
        //     console.log(this.formatterData[0].fields)
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      getdata(){
        console.log('能触发')
      }
    },
    created(){
        console.log(this.formatterData)
    },
 
}
</script>

<style scoped>
.tangle{
    width:0;height:0;
    border-width: 100px 100px 0 0;
    border-style: solid;
    border-color:  green transparent transparent transparent;
}
.shine{
    font-size:26px;
    color: gray;
    /* box-shadow: 2px 0 3px red; */
}
</style>