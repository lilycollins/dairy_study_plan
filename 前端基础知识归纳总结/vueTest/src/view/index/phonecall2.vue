<template>
    <div>
        <span>目标参数（要拨打的电话）：</span><el-input v-model="phoneNum"></el-input>
        <span>附加参数（不清楚是什么）：</span><el-input v-model="phoneNum2"></el-input>
        <el-button @click="funInitial()">初始化登录</el-button>
        <el-button @click="makeCall()">呼叫</el-button>
        <el-button @click="stopCall()">挂断</el-button>

        <DIV style='position:absolute;border:0px solid #00ff00; left:10px;top:170px;'>	
		<TEXTAREA id="TextareaInfo" name="TextareaInfo" rows="32" cols="160" value="" style="overflow:auto;font-family:verdana;font-size:12px"></TEXTAREA>
		</DIV>
        
        <el-button @click="addCart">触发广播</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            phoneNum:'15879082735',
            phoneNum2:'',
        }
    },
    methods:{
        addCart(){
            this.bus.$emit('getMessage',"从这边获取到的信息内容");
        },
        makeCall(){
            console.log('开始打电话了！');
            console.log(11111111,this.phoneNum,this.phoneNum2);
            application.oJVccBar.MakeCall(this.phoneNum,2,'','',this.phoneNum2);
        },
        stopCall(){
            console.log('挂断电话！');
            application.oJVccBar.ReleaseThirdOne(parseInt(this.phoneNum));
        },
        funInitial(){
            console.log('点击开始初始化');
            var  MainIP = '10.30.1.151';
            var  vccID    = '123456';
            var  agentID  = '2003';
            var  agentPassword = '123abc';
            var  sipPassword = 'Mk2P6yg!4ZJE@13';
            var  SipXPath = 'acd';
            var  ctiPort    = '5049';
            var  monitorPort     = '5049';
            var  sipPort     = '5049';
            var  logXPath = 'log';
            var  AppTypes = 0;
            var  PhoneTypes = 1;
            var  ProtocolTypes = 1;
            var  TransportType = 0;

            application.oJVccBar.SetAttribute("MainIP",MainIP);  //MainIP
            application.oJVccBar.SetAttribute("MainPortID",ctiPort);  //MainPort
            application.oJVccBar.SetAttribute("BackIP",MainIP);  //BackIP
            application.oJVccBar.SetAttribute("MonitorIP",MainIP);  //MonitorIP
            application.oJVccBar.SetAttribute("MonitorPort",4502);  //MainPort
            application.oJVccBar.SetAttribute("MonitorPort",monitorPort);  //MainPort
            application.oJVccBar.SetAttribute("SipServerIP",MainIP);
            application.oJVccBar.SetAttribute("SipServerPort",sipPort);
            application.oJVccBar.SetAttribute("SipProtocol","wss");
            application.oJVccBar.SetAttribute("PhonType",1);  //0:内置坐席卡；1：内置Sip；2：外置其他终端 3：远程sip电话; 4：软交换前传号码; 5：yealink话机 6：agora
            application.oJVccBar.SetAttribute("AgentType",1);
            application.oJVccBar.SetAttribute("SelfPrompt",0);
            application.oJVccBar.SetAttribute("MediaFlag",vccID);
            application.oJVccBar.SetAttribute("AppType",0);  //0:agent 1:monitor 2:agent+monitor
            application.oJVccBar.SetAttribute("PassWord",agentPassword);
            application.oJVccBar.SetAttribute("AgentID","000010"+vccID+agentID);
            application.oJVccBar.SetAttribute("Dn","000002"+vccID+agentID);
            application.oJVccBar.SetAttribute("SipXPath", SipXPath);
            application.oJVccBar.SetAttribute("SipPassWord", sipPassword);
            application.oJVccBar.SetAttribute("WeChatServer", MainIP+":8000");
            application.oJVccBar.SetAttribute("LogXPath",logXPath);
            application.oJVccBar.SetAttribute("AppType",AppTypes);
            application.oJVccBar.SetAttribute("PhonType",PhoneTypes);
            application.oJVccBar.SetAttribute("ProtocolType",ProtocolTypes);
            application.oJVccBar.SetAttribute("CtiXPath", "cti");
		    application.oJVccBar.SetAttribute("MonitorXPath", "monitor");
            // this.CheckVccBarXPath();
            application.oJBarDisplayer = appVccBar;
            application.oJVccBar.Initial();
            // 坐席置闲，为了监听呼入
            application.oJVccBar.SetIdle();
        },
        // CheckVccBarXPath(){
        //     var ctiPort = application.oJVccBar.GetAttribute("MainPortID");
        //     var monitorPort = application.oJVccBar.GetAttribute("MainPortID");

        //     if(ctiPort == 5049 || ctiPort == 14900){
        //         application.oJVccBar.SetAttribute("CtiXPath", "cti");
        //     }		
        //     else{
        //         application.oJVccBar.SetAttribute("CtiXPath", "");
        //     }
                
        //     if(monitorPort == 5049 || monitorPort == 14900){
        //         application.oJVccBar.SetAttribute("MonitorXPath", "monitor");
        //     }     
        //     else{
        //         application.oJVccBar.SetAttribute("MonitorXPath", "");
        //     }  
        // },
        
        // 创建对象成功，绑定电话条事件
        OnAfterVccBarCreate()
            { 
                //3
                application.oJVccBar.OnCallRing = onOnCallRing;
                application.oJVccBar.AnswerCall = onOnAnswerCall;
                application.oJVccBar.OnCallEnd = onOnCallEnd;
                //18
                application.oJVccBar.OnPrompt = onOnPrompt;
                application.oJVccBar.OnReportBtnStatus = onReportBtnStatus;
                application.oJVccBar.OnInitalSuccess = onOnInitalSuccess;
                application.oJVccBar.OnInitalFailure = onOnInitalFailure;
                application.oJVccBar.OnEventPrompt = onOnEventPrompt;
                application.oJVccBar.OnAgentWorkReport = onOnAgentWorkReport;
                application.oJVccBar.OnCallDataChanged = onOnCallDataChanged;
                application.oJVccBar.OnBarExit = onOnBarExit;
                application.oJVccBar.OnCallQueueQuery = onOnCallQueueQuery;
                application.oJVccBar.OnQueryGroupAgentStatus = onOnQueryGroupAgentStatus;
                application.oJVccBar.OnSystemMessage  = onOnSystemMessage;
                application.oJVccBar.OnRecvWeiboMsg = onOnRecvWeiboMsg;
                application.oJVccBar.OnIMMessage = onOnIMMessage
                application.oJVccBar.OnRecvWeChatMessage = onOnRecvWeChatMessage;
                application.oJVccBar.OnSendWeChatMsgReport = onOnSendWeChatMsgReport;
                application.oJVccBar.OnUploadFileToMMSReport = onOnUploadFileToMMSReport;
                application.oJVccBar.OnDownloadFileToMMSReport = onOnDownloadFileToMMSReport;
                application.oJVccBar.OnWorkStaticInfoReport = onOnWorkStaticInfoReport;
            
                //14	
                application.oJVccBar.OnAgentReport = onOnAgentReport;
                application.oJVccBar.OnTelReport = onOnTelReport;
                application.oJVccBar.OnServiceReport = onOnServiceReport;
                application.oJVccBar.OnIvrReport = onOnIvrReport;
                application.oJVccBar.OnTaskReport = onOnTaskReport;
                application.oJVccBar.OnOutboundReport = onOnOutboundReport;
                application.oJVccBar.OnCallReportInfo = onOnCallReportInfo;
                application.oJVccBar.OnQueueReport = onOnQueueReport;
                application.oJVccBar.OnQueryMonitorSumReport = onOnQueryMonitorSumReport;
                application.oJVccBar.OnWallServiceReport = onOnWallServiceReport;
                application.oJVccBar.OnWallQueueReport = onOnWallQueueReport;
                application.oJVccBar.OnServiceStaticReport = onOnServiceStaticReport;
                application.oJVccBar.OnAgentStaticReport = onOnAgentStaticReport;
                application.oJVccBar.OnMethodResponseEvent = onOnMethodResponseEvent;
                application.OnDebug = onOnDebug;
                
            // application.oJVccBar.SetAttribute("AutoUpdateURL","http://192.168.2.136:8080/cin-dcp/BarUpdate");  //AutoUpdateURL

                //application.oVccBarAssist.oBarBtnControl.SetUpdateType(1);
                
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnSetBusy",1);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnSetIdle",2);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnMakeCall",3);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnCallIn",3);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnHold",4);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnRetrieveHold",5);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnDisconnect",6);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnTransfer",7);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnConference",8);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnAnswer",9);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnTransferOut",10);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnConsult",11);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnSendDTMF",12);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnBridge",13);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnAlterNate",14);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnConfigurate",15);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnFroceReset",16);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnBeginRecord",17);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnStopRecord",18);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnListen",19);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnInsert",20);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnIntercept",21);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnForeReleaseCall",22);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnBeginPlay",23);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnStopPlay",24);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnLock",25);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnUnLock",26);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnMute",27);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnCallBack",28);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnReCall",29);
                application.oVccBarAssist.oBarBtnControl.AttachBtnByUIID("btnHelp",30);
                
                // if(application.oVccBarAssist.oBarAgentStatus != null)
                // {
                //     application.oVccBarAssist.oBarAgentStatus.OnAgentStatusTime = function(agentStatus,agentStatusText,timerCount){
                //         if(agentTime != null)
                //             agentTime.innerHTML  = "【"+agentStatusText+"】:【"+timerCount+"】";		    
                //     }
                // }

                displayCtrl();
            } 
    },
    created(){
        // 创建对象成功，绑定电话条事件
        // applicationLoad(0,0,200,50,showStyleNONE,"",this.OnAfterVccBarCreate);	
        applicationUILoad(10,10,1000,40,"");
        applicationLoad("",setVccBarEvent,"",this.OnAfterVccBarCreate);
    },
}
</script>

<style>

</style>
