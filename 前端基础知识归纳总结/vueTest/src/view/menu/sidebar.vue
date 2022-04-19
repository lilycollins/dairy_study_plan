<template>
    <div class="sidebarbox">
        <el-menu :default-openeds="['1', '3']"  :default-active="this.$router.path" router>
           <template v-for="item in menuitem">
                <el-submenu :index="''+item.id" :key="item.id">
                    <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                    <template v-if="item.children.length>0">
                        <el-menu-item-group v-for="subitem in item.children" :key="subitem.id">
                            <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
                             <el-menu-item :index="''+subitem.directname">{{subitem.name}}</el-menu-item>
                        </el-menu-item-group>
                    </template>
                </el-submenu>
           </template>
        </el-menu>
    </div>
</template>
<style>
    .sidebarbox{
        /* position: fixed; */
        /* left: 0; */
        width:200px;
        background-color: #f1f1f1;
        float: left;
    }
  
</style>
<script>
export default {
    data(){
        return{
            menuitem:[
                {
                "id":"1",
                "name":"首页",
                "children":[
                    {
                        "id":"1-0",
                        "name":"拨打电话",
                        "directname":"/phonecall"
                    } ,
                    {
                        "id":"1-1",
                        "name":"首页子导航1",
                        "directname":"/first"
                    } ,
                     {
                        "id":"1-2",
                        "name":"首页子导航2",
                        "directname":"/second"
                    } ,
                    {
                        "id":"1-3",
                        "name":"拨打电话2",
                        "directname":"/phonecall2"
                    } 
                ],
                },
                 {
                "id":"2",
                "name":"案件管理",
                "children":[
                    {
                        "id":"2-1",
                        "name":"批次管理",
                        "child":[]
                    } ,
                     {
                        "id":"2-2",
                        "name":"涉案管理",
                        "directname":"/third"
                    } 

                ],
                }
            ]
        }
    },
    methods:{
    //     zhuandao:function(){
    //         this.$router.push({
    //             path: '/first'
    //         })
    //     },
    //     handleSelect(key,keyPath){
    //         console.log(this);
    //         console.log(key,keyPath);
    //     },
    //     handleSelect(key,keyPath) {
    //         console.log(key,keyPath);
    //         let id = keyPath[keyPath.length - 1];
    //         this.defaultActive = id;
    //         console.log(this.defaultActive);
    //   },
    },
    computed:{
        // activeIndex(){
        //     return this.$router.path.replace('/','')
        // }
    }


}
</script>


