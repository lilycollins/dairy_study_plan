<template>
    <div>
        <div class="tangle"></div>
        <p class="shine" @click="setTime">rectangle</p>
        <el-input v-model="value" @input="changeVal"></el-input>
    </div>
</template>

<script>
export default {
    name:'secondIndex',
    data(){
        return{
            value:'',
            formatterData:[
                    {
                    updated_date: "2019-11-07 14:56:03",
                    parameter_scheme: {
                    fields: [
                    {
                    required: "TRUE",
                    type: "str",
                    name: "name",
                    desc: "名称"
                    },
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "BJ",
                    "NJ"
                    ],
                    name: "cluster_location",
                    desc: "部署机房"
                    },
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "KAFKA",
                    "ROCKET_MQ",
                    "RABBIT_MQ"
                    ],
                    name: "source_type",
                    desc: "source 类型"
                    },
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "KAFKA",
                    "HDFS"
                    ],
                    name: "sink_type",
                    desc: "sink 类型"
                    }
                    ],
                    groups: {
                    source_type: {
                    ROCKET_MQ: {
                    fields: [
                    {
                    required: "TRUE",
                    type: "str",
                    name: "name_servers",
                    desc: "Rocket MQ name servers"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "topic",
                    desc: "topic"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "consumer_group",
                    desc: "消费组"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "username",
                    desc: "topic"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "password",
                    desc: "消费组"
                    }
                    ]
                    },
                    RABBIT_MQ: {
                    fields: [
                    {
                    required: "TRUE",
                    type: "str",
                    name: "addresses",
                    desc: "MQ 连接信息[ip:port]，多个逗号隔开"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "exchange_name",
                    desc: "交换机"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "queue_name",
                    desc: "队列"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "bindings",
                    desc: "route key"
                    },
                    {
                    required: "TRUE",
                    type: "bool",
                    name: "durable_queue",
                    desc: "队列是否持久化"
                    },
                    {
                    required: "TRUE",
                    type: "bool",
                    name: "durable_exchange",
                    desc: "交换机是否持久化"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "username",
                    desc: "topic"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "password",
                    desc: "消费组"
                    }
                    ]
                    },
                    KAFKA: {
                    fields: [
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "NJ_TEST",
                    "NJ_ODS",
                    "NJ_EXCHANGE",
                    "NJ_SDK",
                    "NJ_AD",
                    "NJ_MAJOR",
                    "BJ_MAJOR"
                    ],
                    name: "cluster_name",
                    desc: "Kafka 集群"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "topic",
                    desc: "topic"
                    }
                    ]
                    }
                    },
                    sink_type: {
                    HDFS: {
                    fields: [
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "HOURLY",
                    "DAILY"
                    ],
                    name: "partition_type",
                    desc: "分区类型"
                    }
                    ]
                    },
                    KAFKA: {
                    fields: [
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "NJ_TEST",
                    "NJ_ODS",
                    "NJ_EXCHANGE",
                    "NJ_SDK",
                    "NJ_AD",
                    "NJ_MAJOR",
                    "BJ_MAJOR"
                    ],
                    name: "cluster_name",
                    desc: "Kafka 集群"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "topic",
                    desc: "topic"
                    }
                    ]
                    }
                    }
                    }
                    },
                    created_date: "2019-11-07 14:56:03",
                    id: 4,
                    name: "数据采集"
                    },
                    {
                    updated_date: "2019-11-07 14:56:03",
                    parameter_scheme: {
                    fields: [
                    {
                    required: "TRUE",
                    type: "str",
                    name: "topic",
                    desc: "topic"
                    },
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "NJ_TEST",
                    "NJ_ODS",
                    "NJ_EXCHANGE",
                    "NJ_SDK",
                    "NJ_AD",
                    "NJ_MAJOR",
                    "BJ_MAJOR"
                    ],
                    name: "src_cluster",
                    desc: "源集群"
                    },
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "NJ_TEST",
                    "NJ_ODS",
                    "NJ_EXCHANGE",
                    "NJ_SDK",
                    "NJ_AD",
                    "NJ_MAJOR",
                    "BJ_MAJOR"
                    ],
                    name: "dest_cluster"
                    }
                    ]
                    },
                    created_date: "2019-11-07 14:56:03",
                    id: 3,
                    name: "Kafka Topic 同步"
                    },
                    {
                    updated_date: "2019-11-07 14:56:03",
                    parameter_scheme: {
                    fields: [
                    {
                    required: "TRUE",
                    type: "str",
                    name: "name",
                    desc: "名称"
                    },
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "NJ_TO_BJ",
                    "BJ_TO_NJ"
                    ],
                    name: "route",
                    desc: "路由"
                    },
                    {
                    required: "TRUE",
                    type: "str",
                    name: "src",
                    desc: "源路径"
                    },
                    {
                    required: "FALSE",
                    type: "str",
                    name: "dest",
                    desc: "目的路径"
                    },
                    {
                    name: "type",
                    default: "CRON",
                    required: "TRUE",
                    values: [
                    "CRON",
                    "CUSTOM"
                    ],
                    type: "enum",
                    desc: "同步类型"
                    },
                    {
                    required: "FALSE",
                    type: "str",
                    name: "notification_emails",
                    desc: "邮件通知人"
                    }
                    ],
                    groups: {
                    type: {
                    CRON: {
                    fields: [
                    {
                    required: "TRUE",
                    type: "str",
                    name: "cron_expression",
                    desc: "调度 crontab 表达式"
                    },
                    {
                    default: 1,
                    required: "FALSE",
                    type: "int",
                    name: "schedule_time_shift",
                    desc: "调度时间移动"
                    }
                    ]
                    }
                    }
                    }
                    },
                    created_date: "2019-11-07 14:56:03",
                    id: 2,
                    name: "跨机房 HDFS 文件同步"
                    },
                    {
                    updated_date: "2019-11-07 14:56:03",
                    parameter_scheme: {
                    fields: [
                    {
                    required: "TRUE",
                    type: "str",
                    name: "topic",
                    desc: "Topic"
                    },
                    {
                    type: "enum",
                    required: "TRUE",
                    values: [
                    "NJ_TEST",
                    "NJ_ODS",
                    "NJ_EXCHANGE",
                    "NJ_SDK",
                    "NJ_AD",
                    "NJ_MAJOR",
                    "BJ_MAJOR"
                    ],
                    name: "cluster_name",
                    desc: "集群"
                    }
                    ]
        },
created_date: "2019-11-07 14:56:03",
id: 1,
name: "Kafka Topic 创建"
}
]
        }
    },
    methods:{
        getValue(url,vari){
            let search=url.substring(url.indexOf('?')+1);
            let arr=search.split('&')
            for(var i=0;i<arr.length;i++){
                let pair=arr[i].split('=');
                if(pair[0]==vari){return pair[1]}
            }
            return false;

        },
        setTime(){
            console.log(arguments);
            setTimeout(()=>{alert(11111)},3000)
        },
        changeVal(){
            this.debounce(function(){
                console.log(this.value);
            },1000)
            
        },
        debounce(fn,t){
            let delay = t || 500;
            let timer;
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this,arguments)
            }, delay);
            if(timer){
                clearTimeout(timer)
            }
        }
    },
    created(){
        // console.log(this.getValue("http://127.0.0.1/e/action/ShowInfo.php?classid=9&id=2&hh=jj1245","hh"));
        // this.setTime('fjsf',[12,45,4],{name:'jsafj'})
        this.bus.$on('getMessage',target =>{
            console.log(target);
        })

        console.log(this.formatterData)
    },
    destroyed(){
         this.bus.$off('getMessage')
    },

    // // 防抖函数
    // var _debounce = function (fn, t) {
    //     let delay = t || 500;
    //     let timer;
    //     return function () {
    //         let args = arguments;
    //         if (timer) {
    //             clearTimeout(timer);
    //         }
    //         timer = setTimeout(() => {
    //             timer = null;
    //             fn.apply(this, args);
    //         }, delay);
    //     }
    // }
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