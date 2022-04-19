<template>
<div class="my-boby">
  <!-- <my-head></my-head> -->
  <div class="paddingBtm" element-loading-text="拼命加载中" ref="scroll" style="position:relative;">
    <el-row class="content bg-gray">
    <el-col :span="expansionMode=='OPEN'?19:24" :class="isCollapse?'collapseAside':'expandAside'" :style="caseWidth">
    <div style="width:100%" :class="bg=='bgShow'?'asidecol':'asideexp'">
    <div class="content-body" ref="topBox">
      <!-- 顶部，包括标题，操作按钮-->
      <!-- <div class="bd-top" style="border:none" >
        <div class="flex-between">
          <div >
            <span class="prev">{{title}}</span> <span class="symbol">></span>
            <span class="current">案件详情查看</span>
          </div>
          <div class="md-right">
            <el-button type="primary" @click="addnote" >添加备忘</el-button>
          </div>
        </div>
      </div> -->
      <div >
        <!-- <el-row :gutter="10" > -->
        <div class="top-box-wrap">
          <!-- <el-col :span="this.dropDownShow?19:24"> -->
          <div class="top-box-left">
            <div class="grid-content-1 flex-between bg-white">
              <div>
                <span class="">案件编号：</span>
                <span class="contentBg">{{billCode}}</span>
                <span  v-if="caseData.billStatusName=='停催'">{{caseData.billStatusName}}</span>
                <span class="marginlf-20">催收员：</span>
                <span class="contentBg">{{caseData.colStaffName}}</span>
              
                <el-tag type="danger" >{{caseData.billStatusName}}</el-tag>
              </div>
              <div>
                案件归类
             
                <el-select v-model="caseData.billClassifyId" size="small" clearable placeholder="请选择" style="width:200px" @change="updateClassify">
                   <el-option
                    v-for="item in caseClassifyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <!-- <el-tag size="mini" round >{{caseData.billRepayStatusName}}</el-tag> -->
            </div>
            <el-row class="grid-content-2">
              <el-col :span="6" style="padding-right:10px;">
                <div class="name-box">{{ caseData.clientName }}</div>
                <div class="ID-box">
                  <div>
                    <img src="../../../assets/idCard.png" alt="" style="width:19px;height:14px;" />
                    {{ caseData.certificateNum }}
                    <el-button type="text" v-if="caseData.certificateNum" @click="goToSearch=true">查询</el-button>
                    </div>
                  <div>
                    <img src="../../../assets/telphone.png" alt="" style="width:19px;height:14px;" />
                    {{ caseData.borrowerPhone }}
                    </div>
                </div>
              </el-col>
              <el-col :span="18"  class="bg-white col-left-1">
                <el-row>
                  <el-col :span="8">
                     <el-row>
                      <el-col class="label-right gray-word" :span="9">贷款机构:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.secondLendingName}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="label-right gray-word" :span="9">产品名称:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.productNum}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="label-right gray-word" :span="9">银行卡号:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.cardNum}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="8">
                     <el-row>
                      <el-col class="label-right gray-word" :span="9">委案时间:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.commitDateStr}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="label-right gray-word" :span="9">最近催收日期:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.lastCollectionDate}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="label-right gray-word" :span="9">退案时间:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.limitDateStr}}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="8">
                     <el-row>
                      <el-col class="label-right gray-word" :span="9">委案金额:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.commitMoney}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="label-right gray-word" :span="9">已还款总额:</el-col>
                      <el-col class="text-left" :span="15">{{caseData.totalRepayMoney}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="label-right gray-word" :span="9">最新欠款金额:</el-col>
                      <el-col class="text-left green-word"  :span="15">{{caseData.latestDebtMoney}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <!-- </el-col> -->
           <!-- :span="this.dropDownShow?5:0" -->
          <!-- <el-col style="position: relative; width:390px" v-if="this.dropDownShow"> -->
          <div style="position: relative; width:390px;margin-left:10px" v-if="this.dropDownShow">
            <div class="name-list">
              <el-row v-for="item in dropdownData.batchColBillInfoVos" :key="item.billId" @click.native="changePerson(item.billId,dropdownData.batchColBillInfoVos)" :class="item.billId==billId?'onchoose':'unchoose'">
                <el-col :span="8">{{item.name?item.name:'&nbsp;'}}</el-col>
                <el-col :span="8">{{item.billClassifyName?item.billClassifyName:'&nbsp;'}}</el-col>
                <el-col :span="8" style="text-align:right;">{{item.commitMoney}}</el-col>
              </el-row>
            </div>
            <div class="float-box">
              <div><span>案件数：</span>{{dropdownData.sumBillNum}}</div>
              <div><span>总委案金额：</span>{{dropdownData.sumCommitMoney}}</div>
            </div>
          </div>
          <!-- </el-col> -->
        <!-- </el-row> -->     
        </div>
        <!--信息查找-->
        <information-search v-if="goToSearch" :certificateNum="caseData.certificateNum"></information-search>
        <div class="bg-white mar-top">
          <div class="flex-between btn-box-1">
            <div class="title-bold">联系人信息</div> 
            <div v-show="!boxShow.concatShow" class="open-btn" @click="boxShow.concatShow=true"><a>展开更多 <span class="el-icon-d-arrow-right"></span></a></div>
            <div >
              <a v-show="boxShow.concatShow" class=" blue-word"  style="margin-right:30px;"  @click="addUser">添加联系人</a>
              <!-- <router-link v-show="boxShow.concatShow" class="fontSize12 blue-word" :to="{path:'/assignee_more_infomation'}">更多详情</router-link> -->
            </div>
          </div>
          <caseConcat
          ref="caseConcat"
          v-show="boxShow.concatShow"
          :handleStatus="handleStatus"
          :billId.sync="billId"
          :makeCallStatus.sync="callCondition.makecall"
          :caseData="caseData"
          :relationsList="relationsList"
          :typeList="typeList"
          @takeCall="implementCalling"
        ></caseConcat>
         <div class="btn-box-2" v-show="boxShow.concatShow" @click="boxShow.concatShow=false"><a>收起 <span class="el-icon-d-arrow-right"></span></a></div>
        </div>
        <div class="mar-top bg-white" style="position:relative">
          <div v-for="buni in bunis" :key="buni.name" class="buni-btn">
            <el-button type="primary" v-if="buni.code==activeName" @click="chooseApplyDialog(buni.key)">{{buni.name}}</el-button>
          </div>        
          <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-box">
            <el-tab-pane label="案件信息" name="information">
              <information
                :moreInfo="moreInfo"
                :stopList="stopList"
                @toMoreInfo="toMoreInfo"
                @callPhone="callPhone"
                @smsSend="smsSend"
                @qqSend="qqSend"
                @wechatSend="wechatSend"
                ref="information"
                @changeCustomer="changeCustomer"
                @addUser="addUser"
                :userInfoList="userInfoList"
                :qqUniqId="qqUniqId"
                :wechatUniqId="wechatUniqId"
                :phoneUniqId="phoneUniqId"
                :tabIndex2="2"
                :emptys="emptys"
                :billId.sync="billId"
                :caseData="caseData"

              ></information>
            </el-tab-pane>
            <el-tab-pane label="还款流水" name="repayFlow">
              <repayFlow :billId.sync="billId" ref="repayFlow"></repayFlow>
            </el-tab-pane>
            <el-tab-pane label="共案" name="commonCase">
              <commonCase :billId.sync="billId" ref="commonCase"></commonCase>
            </el-tab-pane>
            <el-tab-pane label="自查" name="selfCheck">
              <!-- <h5 ref="selfCheck" class="infoTitle">自查 <a class="fontSize15 addUser"  @click.prevent="uplaod_self" v-show="handleStatus">上报</a></h5> -->
              <selfCheck :billId.sync="billId" :uploadShow="uploadShow" @close="closeUpload" ref="selfCheck"></selfCheck>
            </el-tab-pane>
            <el-tab-pane label="外访" name="outVisit">
              <outVisit
                :billId.sync="billId"
                :modeList="modeList"
                :resultList="resultList"
                :lengingAgencyId="caseData.secondLendingId"
                ref="outVisit"
              ></outVisit>
            </el-tab-pane>
            <el-tab-pane label="函件" name="justice">
              <justice
                :caseDisable="caseDisable"
                :billId.sync="billId" 
                :lengingAgencyId="caseData.secondLendingId"
                ref="justice"
              ></justice>
            </el-tab-pane>
            <el-tab-pane label="减免" name="applyDerate">
              <applyDerate
                :billId.sync="billId"
                ref="applyDerate"
              ></applyDerate>
            </el-tab-pane>
            <el-tab-pane label="留案" name="caseLeave">
              <caseLeave
                :caseDisable="caseDisable"
                :billId.sync="billId"
                ref="caseLeave"
              ></caseLeave>
            </el-tab-pane>
            <el-tab-pane label="报案" name="police">
              <police
                :billId.sync="billId"
                :caseDisable="caseDisable"
                ref="police"
              ></police>
            </el-tab-pane>
            <el-tab-pane label="撤案" name="stopCollection">
              <stopCollection
                :caseDisable="caseDisable"
                :caseStopVisible="caseStopVisible"
                :billId.sync="billId"
                ref="stopCollection"
              ></stopCollection>
            </el-tab-pane>
            <!-- <el-tab-pane label="查找" name="search">
              <search
                :caseDisable="caseDisable"
                :clientName="caseData.clientName"
                :certificateNum="caseData.certificateNum"
                :billId.sync="billId"
                ref="search"
              ></search>
            </el-tab-pane> -->
          </el-tabs>
        </div>
        <div class="mar-top bg-white">
          <div class="btn-box-1 flex-between">
            <div class="title-bold">催记</div> 
          </div>
           <el-checkbox-group v-model="recordArr" class="checkbox-group" @change="markChange">
            <el-checkbox label="diancui">电催</el-checkbox>
            <el-checkbox label="waifang">外访</el-checkbox>
            <el-checkbox label="xinhan">信函</el-checkbox>
            <el-checkbox label="workOrder">普通工单</el-checkbox>
            <el-checkbox label="complaint">投诉</el-checkbox>
            <el-checkbox label="stop">停催</el-checkbox>
            <el-checkbox label="zhuji" v-if="isEmergency == 'false'">注记</el-checkbox>
            <el-checkbox label="originRecord">原始催记</el-checkbox>
          </el-checkbox-group>
        </div>
        <collectionRecord
          ref="collectRecord"
          :caseDisable="caseDisable"
          :billId.sync="billId"
          :recordArr="recordArr"
        ></collectionRecord>
      </div>
      
    </div>
    <div class="content-body"  ref="boxScroll">
      <!-- 添加微信 -->
      <add-weChat
        :wechatAddVisible="wechatAddVisible"
        v-if="wechatAddVisible"
        :onLineData="onLineData"
        :wechatCode="wechatCode"
        :mywechatAccount="this.mywechatAccount"
        @addwechatclose="addwechatclose"
        :billId.sync="billId"
      ></add-weChat>
      <send-weChat
        :wechatSendVisible="wechatSendVisible"
        v-if="wechatSendVisible"
        :onLineData="onLineData"
        :wechatCode="wechatCode"
        :mywechatAccount="this.mywechatAccount"
        @sendwechatclose="sendwechatclose"
        :mywechatAddAccount="mywechatAddAccount"
        :billId.sync="billId"
      ></send-weChat>
      <!-- QQ-->
      <qqAdd
        :qqAddVisible="qqAddVisible"
        :onLineData="onLineData"
        :qqCode="qqCode"
        :myQQAccount="this.myQQAccount"
        @addQQclose="addQQclose"
        v-if="qqAddVisible"
        :billId.sync="billId"
      ></qqAdd>
      <qqSend
        :qqSendVisible="qqSendVisible"
        :onLineData="onLineData"
        :qqCode="qqCode"
        :myQQAccount="this.myQQAccount"
        @sendQQclose="sendQQclose"
        v-if="qqSendVisible"
        :myQQAddAccount="myQQAddAccount"
        :billId.sync="billId"
      ></qqSend>
      <!-- 短信 -->
      <sms
        v-if="smsVisible"
        :smsVisible="smsVisible"
        :onLineData="onLineData"
        :phoneInfo="phoneInfo"
        @smsClose="smsClose"
        :billId.sync="billId"
      ></sms>
      <!-- 失联修复短信 -->
      <sms2
        v-if="smsVisible2"
        ref="sms2"
        :smsVisible="smsVisible2"
        :onLineData="onLineData"
        :phoneInfo="phoneInfo2"
        @smsClose="smsClose2"
        :billId.sync="billId"
      ></sms2>
    </div>
    <complain
      v-if="complainVisible"
      :complainVisible="complainVisible"
      :billId.sync="billId"
      @complainClose="complainClose"
      :phone="callData.contactPhone"
      :phoneType="callData.phoneType"
      :encryptPhone="callData.encryptPhone"
      :callId="callId"
    ></complain>
    <!-- 备忘http: //192.168.10.211/userweb_pro/webapi.php?module=index&action=index&username=8008&password=8008-->
    <note
      :noteVisible="noteVisible"
      @noteClose="noteClose"
      :noteParam="params"
      :billId.sync="billId"
      :billCode="billCode"
      :callId="callId"
      v-if="noteVisible"
    ></note>
    <!-- <iframe :src="callSrc" id="iframeID" name="a" style="width:100%;height:200px" v-show="false"></iframe> -->
    <addContacts
      :handleType="handleType"
      :billId.sync="billId"
      :userId.sync="userId"
      :organId.sync="organId"
      :relationsList="relationsList"
      :typeList="typeList"
      title='添加联系人'
      :contactsvisible.sync="contactsvisible"
      @closedialog="closedialog"
      ref="addContacts"
      @refreshUserList="refreshUserList"
    ></addContacts>
      <h6 :class="bg" class="fixed-btn" @click="closeFix">
        <p>{{ fixedTitle }}</p>
      </h6>
      </div>
    </el-col>
    <el-col :span="expansionMode=='OPEN'?5:0" style="height:100%;">
      <div class="fixed-area">
        
      <div>      
        <div class="fixed-contentForm">
          <h5>催收记录</h5>
          <div class="auto-box">
            <el-form
              label-position="right"
              :model="callData"
              :rules="saveMoreMarkRule"
              ref="callData"
              label-width="80px"
            >
              <el-form-item label="联系人:" prop="contactName">
                <el-select v-model="callData.contactName" size="mini" @change="chooseContactMan" clearable placeholder="请选择" >
                  <el-option
                    v-for="item in concatList"
                    :key="item.relationId"
                    :label="item.contactName"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话:" prop="contactPhone">
                <div>
                  <div style="display:flex;">
                    <div style="width:115px;" >
                      <el-input v-model="callData.contactPhone" style="width:115px;color:#5D72F5!importent;" :disabled="callCondition.makecall" size="small" @blur="changeContactPhone"></el-input>
                    </div>
                    <el-dropdown size="mini" v-if="!callCondition.makecall"  @command="callHandleClick" style="margin-left:5px;">
                      <el-button type="primary" size="mini">
                        拨打<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="defaultNumber">默认电话</el-dropdown-item>
                        <el-dropdown-item command="intelligentMatch">智能匹配</el-dropdown-item>
                        <el-dropdown-item command="manualSelection">手动选择</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                      <el-button
                      size="small"
                      type="danger"
                      style="margin-left:18px;"
                      @click="cancelCall"
                      v-if="callCondition.makecall"
                    >
                      挂断</el-button>  
                    </div>     
                  </div>
                  
                  <div style="font-size:12px;" v-if="callData.contactPhone">{{mobileInfo.serviceProviderName?mobileInfo.serviceProviderName:'未知'}}&nbsp;&nbsp;<span v-if="mobileInfo.province||mobileInfo.city">({{mobileInfo.province}}{{mobileInfo.city}})</span><span v-else>(未知)</span></div>
                </div>
                    
              </el-form-item>
               <div class="el-form-item__error" v-if="isStop">此号码已停催</div>
              <el-form-item
                label="类型:"
                prop="collectionTypeId"
              >
               <el-select v-model="callData.collectionTypeId" size="mini" clearable placeholder="请选择" style="width:200px">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.location"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="关系:"
                prop="contactRelationId"
              >
               <el-select v-model="callData.contactRelationId" size="mini" clearable placeholder="请选择" style="width:200px">
                  <el-option
                    v-for="item in relationsList"
                    :key="item.id"
                    :label="item.relationName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="结果:"
                prop="collectionResultId"
              >
               <el-select v-model="callData.collectionResultId" size="mini" clearable placeholder="请选择" style="width:200px">
                  <el-option
                    v-for="item in resultList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="催收方式:"
                prop="collectionWayId"
              >
               <el-select v-model="callData.collectionWayId" size="mini" clearable placeholder="请选择" style="width:200px">
                  <el-option v-for="item in modeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="通话号:"
                prop="callId"
              >
              <div style="display:flex;align-items:center">
               <el-select v-model="callData.callId" :disabled="callCondition.makecall" size="mini" @change="selectCallRecord" clearable placeholder="请选择" style="width:192px">
                  <el-option
                    v-for="item in callRecordList"
                    :key="item.callId"
                    :label="item.callType=='called'?'【呼入】'+item.calledName+item.phone:'【呼出】'+item.calledName+item.phone"
                    :value="item.callId">
                  </el-option>
                  <el-option label="空" value='0'></el-option>
                </el-select>
                <i class="el-icon-download" style="color:#5E72F5;font-size:20px;" @click="dowloadCallSound" v-if="resourceId"></i>
                <img src="../../../assets/video-play.png" v-if="videoStatus=='pause'" alt="" style="width:20px;height:20px;" />
                <img src="../../../assets/video-pause.png" v-else-if="videoStatus=='play'" alt="" style="width:20px;height:20px;" />
              </div>
              </el-form-item>
               <p class="form-item-p form-text-p">催记内容：</p>
              <el-form-item
                style="width:90%;margin:0 auto 0"
                prop="collectionContent"
                label-width="0"
              >
                <el-input
                  type="textarea"
                  placeholder="添加催记内容"
                  v-model="callData.collectionContent"
                  :rows="5"
                ></el-input>
                <div style="margin-top: 20px">
                  <el-radio-group v-model="radioRemark" size="mini" @change="chooseRadioRemark"> 
                    <el-radio-button v-for="item in callCondition.callType=='called'?calledRemarkList:callingRemarkList" :label="item" :key="item" style="margin-bottom:5px;"></el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
              <p class="form-item-p form-text-p" style="margin-top:10px" v-if="isEmergency=='false'">备注内容：</p>
              <el-form-item style="width:90%;margin:0 auto 0" prop="markContent" label-width="0">
                <el-input
                  type="textarea"
                  placeholder="添加备注内容"
                  v-model="callData.markContent"
                  :rows="5"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="15px" prop="isPtp">
                <el-checkbox v-model="callData.isPtp">承诺还款<span style="font-size:13px;color:#fff">（选填）</span></el-checkbox>
              </el-form-item>
              <el-form-item v-if="callData.isPtp" label="承诺日期:" prop="ptpDate" >
                  <el-date-picker
                    v-model="callData.ptpDate"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"></el-date-picker>
              </el-form-item>
               <el-form-item v-if="callData.isPtp" label="承诺金额:" prop="ptpAmt">
                  <el-input v-model="callData.ptpAmt" type="text" size="mini"></el-input>
              </el-form-item>
              <el-form-item label-width="15px" prop="isPtp">
                <el-checkbox v-model="callData.isComplaint">投诉预警<span style="font-size:13px;color:#fff">（选填）</span></el-checkbox>
              </el-form-item>
               <el-form-item v-if="callData.isComplaint" style="width:90%;margin:0 auto 0" prop="complaintReason" label-width="0">
                  <el-input
                  type="textarea"
                  v-model="callData.complaintReason"
                  :rows="5"
                ></el-input>
              </el-form-item>
            </el-form>
             <div class="addBtn" style="width:96%;margin:0 auto">
            
                <el-form
                  class="form-detail condition-form "
                  label-position="right"
                  style="margin-top:20px"
                >
                  <el-button type="primary" size="mini" @click.prevent.native="submit()" :disabled="submitDisabled"
                    >保存</el-button
                  >
                </el-form>
              </div>
          </div>
         
        </div>
      </div>
    </div>
    </el-col>
    </el-row>
    <!-- 号码池 -->
    <number-pool v-if="manualSelectionNumber" :manualSelectionNumber.sync="manualSelectionNumber" @manualMakeCall="manualMakeCall"  :billId="billId" ></number-pool>
</div>
</div>
</template>

<script>
import myHead from '../../../components/head';
import pagination from '../../public-components/pagination';
import information from '../detail-components/information';
import informationSearch from './information-search/information-search';// 信息查找
import addWeChat from '../realtime-link/wechat/addweChat.vue'; // 实时联系
import sendWeChat from '../realtime-link/wechat/sendweChat.vue'; // 实时联系
import qqAdd from '../realtime-link/QQ/addQQ';// 添加qq
import qqSend from '../realtime-link/QQ/sendQQ';// 发送qq
import sms from '../realtime-link/sms/sms.vue';// 短信
import sms2 from '../realtime-link/sms/sms2.vue';// 失联修复短信
import MyTabs from '../../public-components/my-tabs.vue';// 更多操作
import caseConcat from './case-concat/case-concat'// 联系信息
import collectionRecord from './collection-record/collection_record';// 催收记录
// import repaireConnection from './repaire-connection/repaire_connection';// 失联修复
import applyDerate from './apply-derate/apply_derate';// 申请减免
import outVisit from './out-visit/out_visit';// 外访
import justice from './justice/justice';// 函件
import police from './police/police';// 公安协催
// import accountChecking from './account-checking/account_checking';//  对账
import accountLooking from './account-looking/account_looking';//  查账
import caseLeave from './case-leave/case_leave';//  留案
import complain from './complain/add_complain';// 投诉
import note from './note/add_note';// 备忘
import commonCase from './common-case/common_case.vue';// 共案
import stopCollection from './stop-collection/stop_collection';// 申请停催
import addContacts from './addContacts_dialog';// 添加联系人
import myTabs from '../../public-components/my-tabs3';// tab组件
import repayFlow from './repay-flow/repay-flow'// 还款流水
import selfCheck from './self-checking/self-checking'// 自查
import numberPool from './number-pool/number_pool'// 号码池
import { mapGetters, mapActions } from 'vuex';
import API from '../../../api/index.js'
import { setTimeout } from 'timers';
const fields3 = [
  {
    key: 'createTime',
    label: '类型',
    width: 'auto',
  },
  {
    key: 'callName',
    label: '关系',
    width: 'auto',
  },
  {
    key: 'relation',
    label: '姓名',
    width: 'auto',
  },
  {
    key: 'contactPhone',
    label: '联系电话',
    width: 'auto',
  },
  {
    key: 'collectionRemark',
    label: '联系地址',
    width: 'auto',
  },
  {
    key: 'workCompany',
    label: '工作单位',
    width: 'auto',
  },
  {
    key: 'phoneStatus',
    label: '邮箱',
    width: 'auto',
  },
];
const callingRemarkList = ['无人接听','空号','来电提醒','关机','通话中','拒接','停机','设限']
const calledRemarkList = ['称已还款','称不是本人','敏感号码','不承认有欠款','资金困难','投诉','无效第三方','骂人']
const bunis = [
  {key:'0',name:'申请外访',code:'outVisit'},
  {key:'1',name:'申请减免',code:'applyDerate'},
  {key:'2',name:'申请撤案',code:'stopCollection'},
  {key:'3',name:'申请报案',code:'police'},
  {key:'4',name:'申请留案',code:'caseLeave'},
  {key:'5',name:'申请函件',code:'justice'},
  {key:'6',name:'上报',code:'selfCheck'}
]
export default {
  components: {
    myHead,
    // 微信
    addWeChat,
    sendWeChat,
    // 短信
    sms,
    // 失联修复短信
    sms2,
    pagination,
    information,
    informationSearch,
    MyTabs,
    applyDerate,
    outVisit,
    justice,
    police,
    //accountChecking,
    accountLooking,
    complain,
    caseLeave,
    // 备忘
    note,
    qqAdd,
    qqSend,
    collectionRecord,
    //repaireConnection,
    addContacts,
    stopCollection,
    commonCase,
    myTabs,
    caseConcat,
    selfCheck,
    repayFlow,
    numberPool, // 号码池
  },
  data() {
    var reliefAmountValidate = (rule, value, callback) => {
        if (value) {
          let pattern = /^[1-9][0-9]{0,9}([.][0-9]{0,2})?$/;
          if (!pattern.test(value)) {
            callback(new Error('最多10位整数和2位小数'));
          } else if (!(this.callData.reliefAmount && this.callData.promiseRepaymentTime)) {
            callback(new Error('承诺还款金额和时间需填'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      },
      promiseAmountValidate = (rule, value, callback) => {
        if (value) {
          let pattern = /^[1-9][0-9]{0,9}([.][0-9]{0,2})?$/;
          if (!pattern.test(value)) {
            callback(new Error('最多10位整数和2位小数'));
          } else if (!this.callData.promiseRepaymentTime) {
            callback(new Error('承诺还款时间需填'));
            //  console.log(this.callData.promiseRepaymentTime)
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
    return {
      boxShow: {concatShow: true,},// 权限控制
      isEmergency: 'false', // 应急限制
      activeName: 'information',
      manualSelectionNumber: false,
      bunis: bunis,
      expansionMode: 'CLOSE',
      handleStatus: false, // 是否可操作
      // 微信
      addweChatShow: true,
      goToSearch: false,// 打开信息查找
      //联系人信息
      tb3: {
        data: [],
        fields: fields3,
      },
      // 切换tabs
      tabIndex: -1,
      tabIndex2: 0,
      componentIndex: -1,
      // currentContent: 'applyDerate',
      stopError: '', //停催错误信息 msg: '当前号码已停催'
      personLength: 1,
      mapCaseCode: '',
      phoneUniqId: '',
      wechatUniqId: '',
      qqUniqId: '',
      infoShow: false,
      title: '',
      caseClassifyOptions:[],
      tabList: [
        {
          index: '-1',
          name: '联系信息',
          method: '',
          width: 100,
        },
        {
          index: '0',
          name: '案件信息',
          method: '',
           width: 100,
        },
        {
          index: '1',
          name: '催记',
          method: '',
           width: 70,
        },
        {
          index: '2',
          name: '还款流水',
          method: '',
           width: 100,
        },
        {
          index: '3',
          name: '自查',
          width: 70,
          // method: this.getjusticeList,
        },
        {
          index: '4',
          name: '共案',
          width: 70,
          // method: this.getpoliceList,
        },
        {
          index: '5',
          name: '外访',
          width: 70,

          // method: this.getaccountCheckingList,
        },
        {
          index: '6',
          name: '函件',
          width: 70,
          // method: this.getaccountCheckingList,
        },
        {
          index: '7',
          name: '减免',
          width: 70,

          // method: this.getaccountLookingList,
        },
        {
          index: '8',
          name: '留案',
          width: 70,

          // method: this.getaccountLookingList,
        },
        {
          index: '9',
          name: '报案',
          width: 70,

          // method: this.getaccountLookingList,
        },
        {
          index: '10',
          name: '撤案',
          width: 70,

          // method: this.getaccountLookingList,
        },
      ],
      tbData: [],
      caseInfoBeans: {},
      debtInfoBeans: {},
      userInfoBean: {},
      caseIdArr: [],
      caseObjArr: [],
      dropdownData: [],
      promiseInfoShow: false,
      
      addContact: {
        companyAddress: '',
        companyName: '',
        contactIdnumber: '',
        contactName: '',
        contactRelation: '本人',
        usualAddress: '',
        contactQqCode: '',
        contactWechatCode: '',
        email: '',
        caseCode: '',
      },
      // 函件
      justiceTb: [],
      // 公安
      policeTb: [],
      // 对账
      // accountCheckingTb: [],
      // cha账
      accountLookingTb: [],
      // 留案
      caseLeaveTb: [],
      params: {},
      labels: ['标签1','标签2'],
      phoneCode: '',
      moreInfo: '更多信息 >>',
      caseCode: '',
      caseId: '',
      caseManageId: '',
      collectionMarkId: '',
      caseStatus: '',
      total: 0,
      pageSize: 15,
      currentPage: 1,
      fixPhone: '',
      fixName: '',
      arrowBtn: 'el-icon-arrow-up fixedBtn',
      bg: 'bgHide',
      widthHandle: '',
      rules: {
        promiseAmount: [
          {
            required: true,
            message: '必填项',
             trigger: 'blur'
          },
          {
            validator: promiseAmountValidate,
            trigger: 'blur,change',
            type: 'number',
          },
        ],
        reliefAmount: [
          {
            required: true,
            message: '必填项',
             trigger: 'blur'
          },  
          {
            validator: reliefAmountValidate,
            trigger: 'blur,change',
            type: 'number',
          },
        ],
        promiseRepaymentTime: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          },     
        ]
      },
      complainVisible: false,
      // 备忘
      noteVisible: false,
      assignData: {},
      applyderateTb: [],
      // 微信
      isWechatfriend: false,
      wechatAddVisible: false,
      // qqSendVisible: false,
      mywechatAccount: '',
      mywechatAddAccount: '',
      wechatSendVisible: false,
      qqAddVisible: false,
      qqSendVisible: false,
      isQQfriend: false,
      myQQAccount: '',
      myQQAddAccount: '',
      onLineData: {},
      // 短信
      smsVisible: false,
      phoneInfo: null,
      // 失联修复短信
      smsVisible2: false,
      phoneInfo2: null,
      disabledBtn: false,
      cancelBtn: true,
      caseIndex: 0,
      isLast: false,
      callSrc: '',
      extension: '',
      phoneType: 0,
      encodePhone: '',
      phoneBtnText: ' 拨打',
      repaireDisBtn: false,
      caseLabels: [],
      qqCode: '',
      wechatCode: '',
      phoneCity: '',
      phoneCompany: '',
      isStop: '',
      caseDisable: false,
      loadingAllPage: true,
      contactsvisible: false,
      userInfoList: [],
      stopList: [],
      origin: null,
      originId: null,
      callId: null,
      stopCase: false,
      onCallTime: false,
      phoneObj: {},
      pageCalling: false,
      ownMsg: {
        msg: '',
        borrowerName: '',
        borrowerPhone: '',
        position: '',
        borrowerIdnumber: '',
        eduLevel: '',
      },
      fixedTitle: '写 催 记 <<',
      showTabs: false,
      fixShow2: false,
      emptys: 0,
      caseStopVisible: false,
      recordArr: ['diancui','waifang','xinhan','workOrder','complaint','stop','zhuji','originRecord'],
      recordPhone: false,
      recordOutVisit: false,
      recordWork: false,
      billCode: '',
      caseData: {},
      uploadShow: false,
      billId: '',
      handleType: 'add',
      myHeight: '100px',
      //写催记
      concatList: [],
      calledRemarkList: calledRemarkList,
      callingRemarkList: callingRemarkList,
      radioRemark: null,
      relationsList: [], // 关系下拉列表
      typeList: [],// 联系类型下拉列表
      resultList: [],// 催收结果下拉列表
      modeList: [],// 催收方式下拉列表
      callData: {
        contactName: '',
        contactPhone: '',
        contactRelationId: '',
        billCode: null,
        billId:null,
        colStaffId: null,
        secondLendingId: null,
        collectionContent: '',
        collectionResultId: '',
        collectionTypeId: '',
        collectionWayId: '',
        complaintReason: '',
        isComplaint: false,
        isPtp: false,
        markContent: null,
        ptpAmt: null,
        ptpDate: null,
        callId: '0',
      },
      saveMoreMarkRule:{
        contactName:[{required:true, message:' ', trigger:'change'}],
        contactPhone:[{required:true, message:' ', trigger:'blur'}],
        contactRelationId:[{required:true, message:' ', trigger:'change'}],
        collectionResultId:[{required:true, message:' ', trigger:'change'}],
        collectionTypeId:[{required:true, message:' ', trigger:'change'}],
        collectionWayId:[{required:true, message:' ', trigger:'change'}],
      },
      tabTop: 0,
      dropDownShow:false,
      mobileInfo: { // 所选择的电话的归属地和运营商
        city: "",
	      province: "",
	      serviceProviderName: "",
      },
      callCondition:{
        makecall: false,//是否通话中
        callType: null, // 通话类型
      },
      callRecordList:[], // 通话号列表
      callRecordNumber: 0,
      videoStatus: null, // 当前通话号录音状态
      caseParam: {}, // 添加呼叫记录传参      
      phoneStatus: null, // 电话条状态
      userId:null,
      organId:null,//一级机构id
      secondOrganId:null,//二级机构id
      resourceId: null, //当前通话号录音id
      pickerOptions: { // 承诺还款日期，只能填以后的日期
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      calledCallId: null, // 来电CallId
      submitDisabled: false,
      caseWidth:{
        width:'calc(100% - 50px)'
      }
    }
  },
  created() {
    this.$store.commit('COLLAPSE_ASIDE')
    this.isEmergency = sessionStorage.getItem('isEmergency')
    if (this.isEmergency == 'true') {
      this.recordArr = ['diancui','waifang','xinhan','workOrder','complaint','stop','originRecord']
    }
    document.title = '案件详情';
    var id = decodeURIComponent(this.$route.query.id)
    this.emptys = this.$route.query.empty ? this.$route.query.empty - 0 : 0;
    this.title = this.$route.query.title ? decodeURIComponent(this.$route.query.title)  : '人工催收';
    var caseArr = id.split('__');
    this.personLength = caseArr.length;
    this.billId = caseArr[0];
    this.caseIdArr = caseArr;
    this.getdropdownData();
    this.getList();
    this.assignData = Object.assign({}, this.callData);
    this.caseIndex = 0;
    this.getCaseClassify();
    // 监听通话结束
    this.bus.$on('MonitorCallEnd',res =>{
      this.callCondition.makecall = false
      setTimeout(()=>{
        console.log(this.billId)
        this.getCallRecordList()
      },1000)
    })
    // 从来电弹窗或未接来电进来
    var _this = this
    if (this.$route.query.from == 'called') {  
      if (this.$route.query.callId) {
        this.calledCallId = this.$route.query.callId
        this.closeFix()
      }      
      this.callCondition.callType = this.$route.query.from
      if (this.$route.query.relationId) {
        _this.concatList.forEach(ele => {
          if (ele.relationId = _this.$route.query.relationId) {
            _this.chooseContactMan(ele)
            return false
          }
        })
      } else {
        this.callData.contactPhone = this.$route.query.number
      }
    }
  },
  computed: mapGetters({
    isCollapse: 'asideStatus',
  }),
  watch:{

  },
  mounted() {
    window.addEventListener('beforeunload', e => {
      
    });
    window.onbeforeunload=function(event){
        return 'hello';
    }
  },
  destroyed() {
    document.title = '催收方';
  },
  methods: {

    //获取案件归类
    getCaseClassify(){
      this.$api.caseManage.collectionBaseBillclassifyAllList().then(res => {
          this.caseClassifyOptions=[];
         res.forEach(opt => {
          this.caseClassifyOptions.push({
            label: opt.classifyName,
            value: opt.id
          })
        })
          
        });
     


    },

      //修改案件归类
     updateClassify(){
       if (this.caseDisable) {
        this.preventAction();
        return false;
      }

          this.$api.caseManage.collectionMarkClassifyUpdate({billClassifyId:this.caseData.billClassifyId,billId:this.billId}).then(res => {
          console.log(res)

          this.$message({
          
          message: '案件归类修改成功',
          type: 'success'
          });
          
        });
        
     },




    // 获取案件详情数据
    getList() {
      this.loadingAllPage = true;
      this.infoShow = false;
      this.$api.collectionManageAPI.getCaseDetail({billId: this.billId})
        .then((res)=>{
          this.caseData = res;
          console.log('this.caseDatathis.caseDatathis.caseData',res)
          this.billCode = res.billCode;
          this.userId =res.userId;
          this.organId = res.firstLendingAgencyId;
          this.ownMsg.msg = '';
            if (this.caseData.marriageStatus || this.caseData.eduLevel || this.caseData.position) {
              if (this.caseData.marriageStatus) {
                this.ownMsg.msg = '（' + this.caseData.marriageStatus;
              }
              if (this.caseData.eduLevel) {
                if (this.caseData.msg) {
                  this.ownMsg.msg = this.ownMsg.msg + ' | ' + this.caseData.eduLevel;
                } else {
                  this.ownMsg.msg = '（' + this.caseData.eduLevel;
                }
              }
              if (this.caseData.position) {
                if (this.ownMsg.msg) {
                  this.ownMsg.msg = this.ownMsg.msg + ' | ' + this.caseData.position;
                } else {
                  this.ownMsg.msg = '（' + this.caseData.position;
                }
              }
              this.ownMsg.msg += '）';
            }
            if (res.billStatus == 'back' || res.billStatus == 'revoke' || res.billStatusName=='停催') {
              this.handleStatus = false
            } else {
              this.handleStatus = true
            }
            if (res.billStatusName=='停催') {
              this.caseDisable = true
            }
            // 查询联系类型下拉数据
            this.$api.common.collectionBaseContacttypeByorganidGet({organId:res.secondLendingId}).then(res => {
                this.typeList = res.list
            })
            // 查询联系关系下拉数据
            this.$api.common.collectionBaseRelationByorganidGet({organId:res.secondLendingId}).then(res => {
              this.relationsList = res.list
            })
            // 查询催收结果下拉列表
            this.$api.collectionManageAPI.queryResultType({organIds:[res.secondLendingId],organIdsLevel:2}).then(res => {
              if (res) {
                this.resultList = res
              }  
            })
            // 查询催收方式下拉列表
            this.$api.collectionManageAPI.queryHandleTypee({organIds:[res.secondLendingId],organIdsLevel:2}).then(res => {
              if (res) {
                this.modeList = res
              }
            })
        })
        .finally(()=>{
          this.loading = false;
        })
         
    },
    // 获取人员下拉列表
    getdropdownData() {
      this.$api.collectionManageAPI.getBatchCase({billIds: this.caseIdArr})
        .then((res)=>{
          this.dropdownData = res;
          if(res.batchColBillInfoVos.length>1){
            this.dropDownShow =true;
          }
          
        })
        .finally(()=>{
          
        })
    },
    // 获取电话归属地
    getPhoneAddress(phone, type) {
      var data;
      if(!phone) return false;
      if (type == 'number') {
        data = {
          phone: phone,
          phoneType: 0,
          encryptPhone: '',
        };
      } else {
        data = {
          phone: phone.phone,
          phoneType: phone.phoneType,
          encryptPhone: phone.encryptPhone,
        };
      }
      this.$axios
        .post('/api/assignee/relevancy/getPhoneArea', data)
        .then(res => {
          if (res.data.code == 0) {
            this.phoneCity = res.data.data.province + res.data.data.city;
            this.phoneCompany = res.data.data.operator;
          } else {
            this.$util.failCallback(res.data, this);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 改变还款时间
    getTime(val) {
      this.callData.promiseRepaymentTime = val;
      let pattern = /^[1-9][0-9]{0,9}([.][0-9]{0,2})?$/;
      // 还款金额和
      if (pattern.test(this.callData.promiseAmount) && val) {
        //this.refs['promiseAmount'].clearValidate();
        this.$children[2].$parent.$refs['promiseAmount'].clearValidate();
        if (pattern.test(this.callData.reliefAmount)) {
          this.$children[2].$parent.$refs['reliefAmount'].clearValidate();
        }
      }
    },
    // 切换菜单
    handleClick(val){
      console.log(val)
      this.$refs[val.name].getList(this.billId) 
    },
    // 选择亲属列表
    choose(data) {},
    // 跳转到更多信息页
    toMoreInfo() {
      let caseManageId = this.$util.encrypt(this.caseManageId.toString(), 'moreInfo');
      let url =
        (window.location.origin ? window.location.origin : '') +
        '/#/assignee_more_infomation?id=' +
        caseManageId;
      this.$router.push({ path: url });
    },
    // 打电话
    callPhone(phoneObj) {
      if(this.emptys) return false;
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      
      if (this.isStop) return false;
      this.callData.callName = this.userInfoBean.borrowerName;
      this.callData.contactPhone = phoneObj.phone;
      this.callData.contactRelation = this.userInfoBean.contactRelation;
      this.repaireDisBtn = false;
      this.phoneType = phoneObj.phoneType;
      this.expansionMode = 'OPEN';
      this.arrowBtn = 'el-icon-arrow-up fixedBtn';
      this.bg = 'bgShow';
      this.phoneObj = phoneObj;
      this.getEncodePhone(phoneObj);
    },
    // 发短信
    smsSend(phoneObj) {
      if(this.emptys) return false;
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      if (this.isStop) return false;
      if (phoneObj) {
        this.phoneInfo = {
          phone: phoneObj.phone,
          relation: this.userInfoBean.contactRelation,
          name: this.userInfoBean.borrowerName,
          origin: this.origin,
          originId: this.originId,
          phoneType: phoneObj.phoneType,
          encryptPhone: phoneObj.encryptPhone,
        };
        this.smsVisible = true;
      } else {
        // 提示选择
        this.$alert('请选择联系人进行操作', '提示', {
          confirmButtonText: '确定',
          callback: action => {},
        });
        this.smsVisible = false;
      }
    },
    smsClose() {
      this.smsVisible = false;
    },
    // 失联修复-发短信
    smsSend2(phoneInfo) {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      this.phoneInfo2 = phoneInfo;
      this.smsVisible2 = true;
    },
    smsClose2() {
      this.smsVisible2 = false;
    },
      // 切换人员
    changePerson(code,obj) {
      this.infoShow = false
      document.title = '案件详情';
      this.billId = code;
      var arr=[];
      obj.forEach(item => {
          arr.push(item.billId)
      })
      this.caseIdArr = arr;
      arr=[];
      this.getdropdownData();
      this.getList();
      this.assignData = Object.assign({}, this.callData);
      this.caseIndex = 0;
      this.getCaseClassify();
      this.$refs.caseConcat.getList(this.billId)
      this.$refs.collectRecord.getList(this.billId);
      if (this.expansionMode == 'OPEN') {
        this.radioRemark = null
        this.$refs.callData.resetFields()
        this.closeFix()
      }
    },
    // 选择通话号
    selectCallRecord(e) {
      console.log(e)
      var _this = this
      _this.callCondition.callType = null
       _this.resourceId = null
      this.callRecordList.forEach(ele => {
        if (ele.callId == e) {
          _this.callCondition.callType = ele.callType
          _this.resourceId = ele.resourceId
          return false
        }
      })
    },
    // 下载通话录音
    dowloadCallSound() {
      this.$api.common.downloadBase64({resourceId:this.resourceId}).then(res => {
          this.$fileToByte.downloadBase64(res,'')
        })
    },
    // 保存催记
    submit() {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      this.submitDisabled = true
      var error = false;
      // 布局的时候写了好几个form表单，验证的是否懵逼了，改起来麻烦就不想改了
      this.$refs['callData'].validate(valid => {
        if (valid) {
          if (this.callData.collectionContent || this.callData.markContent) {
            if (this.callData.isPtp == true && (this.callData.ptpAmt == ''||this.callData.ptpDate == '')) {
              this.$message.warning('请填写完整承诺日期和承诺金额')
              this.submitDisabled = false
              return
            } else if (this.callData.isPtp == true && !Number(this.callData.ptpAmt)) {
              this.$message.warning('请填写正确的承诺金额')
              this.submitDisabled = false
              return
            }
            if (this.callData.isComplaint == true && this.callData.complaintReason == '') {
              this.$message.warning('请填写投诉原因')
              this.submitDisabled = false
              return
            }
            this.callData.billCode = this.billCode
            this.callData.billId = this.billId
            this.callData.secondLendingId = this.caseData.secondLendingId
            this.callData.firstLendingAgencyId = this.caseData.firstLendingAgencyId
            this.callData.colStaffId = this.caseData.colStaffId
            if (this.callData.isPtp) {
              this.callData.isPtp = 1
            } else {
              this.callData.isPtp = 0
            }
            if (this.callData.isComplaint) {
              this.callData.isComplaint = 1
            } else {
              this.callData.isComplaint = 0
            }
            const markParam = Object.assign({},this.callData)
            delete markParam.contactRelation
            if (markParam.callId == '0') {
              delete markParam.callId
            }
            this.$api.collectionManageAPI.saveMoreMark(markParam).then(res => {
              this.$message.success('保存成功')
              this.radioRemark = null
              this.$refs.callData.resetFields()
              this.closeFix()
              this.$refs.collectRecord.getList()
            }).finally(r => {
              this.submitDisabled = false
            })
          } else{
            if (this.isEmergency == 'true') {
              this.$message.warning('请填写催记内容')
            } else {
              this.$message.warning('请至少填写催记内容或备注内容其中一项')
            }
            this.submitDisabled = false 
          }
      } else {
        this.submitDisabled = false
      }
      });
    },
    // information组件切换用户姓名
    changeCustomer(uniqueId) {
      this.userInfoList.forEach(item => {
        if (item.uniqueId == uniqueId) {
          this.userInfoBean = item;
          this.phoneObj = this.userInfoBean.listPhone[0];
          if (
            this.userInfoBean.listPhone[0] &&
            (this.stopList.includes(this.userInfoBean.listPhone[0].phone) ||
              this.stopList.includes(this.userInfoBean.listPhone[0].encryptPhone))
          ) {
            this.isStop = true;
            this.disabledBtn = true;
          } else {
            this.isStop = false;
            this.disabledBtn = false;
          }
          this.$refs['information'].refreshInfo(this.userInfoBean, this.stopList);
          this.callData.callName = this.userInfoBean.borrowerName;
          this.callData.contactPhone = this.userInfoBean.listPhone[0] && this.userInfoBean.listPhone[0].phone;
          this.callData.contactRelation = this.userInfoBean.contactRelation;
          this.callData.phoneType = this.userInfoBean.listPhone[0] && this.userInfoBean.listPhone[0].phoneType;
          this.callData.encryptPhone = this.userInfoBean.listPhone[0] && this.userInfoBean.listPhone[0].encryptPhone;
          this.$refs['phoneLabel'].resetFields();
          this.$refs['repaymentIntention'].resetFields();
          this.$refs['contactAttitude'].resetFields();
          //this.$refs["caseDevelopment"].resetFields();
          this.$refs['collectionRemark'].resetFields();
          if (this.callData.promiseAmount) {
            this.$refs['promise'].resetFields();
          }
          this.getPhoneAddress(this.phoneObj, 'obj');
        }
      });
    },
    // 关闭催收悬浮层
    closeFix() {
      if (this.expansionMode == 'CLOSE') {
        this.expansionMode = 'OPEN';
        this.bg = 'bgShow';
        this.fixedTitle = '收 起 >>';
        this.$api.collectionManageAPI.getCaseConcatList({billId: this.billId}).then(res => {
          this.concatList = res
        })
       this.getCallRecordList();
       if(this.isCollapse){
         this.caseWidth.width = 'calc(100% - 350px)'
       }
       else{
         this.caseWidth.width = 'calc(100% - 480px)'
       } 
      } else {
        this.expansionMode = 'CLOSE';
        this.bg = 'bgHide';
        this.fixedTitle = '写 催 记 <<';
        if(this.isCollapse){
         this.caseWidth.width = 'calc(100% - 50px)'
       }
       else{
         this.caseWidth.width = 'calc(100% - 180px)'
       } 
      }    
      
    },
    // 查询通话号列表
    getCallRecordList() {
      var _this = this
       this.$api.collectionManageAPI.getCallRecordList({billId: this.billId}).then(res => {
          this.callRecordList = res
          this.callRecordNumber = res.length
          if (res.length>0 && this.callCondition.callType !== 'called'&&this.calledCallId==null) {
            this.callData.callId = this.callRecordList[0].callId
            this.callCondition.callType = this.callRecordList[0].callType
            this.resourceId = this.callRecordList[0].resourceId
          } else if (this.calledCallId) {
            res.forEach(ele => {
              if (ele.callId == this.calledCallId) {
                _this.callData.callId = ele.callId
                _this.callCondition.callType = ele.callType
                _this.resourceId = ele.resourceId
                return false
              }
            })
          } else {
           this.resourceId = null 
          }
        }) 
    },
    // 删除联系人
    deleteConcat(index) {
      this.callData.addContact.splice(index, 1);
    },
    // 输入联系号码
    changeContactPhone(e){
      this.callData.contactPhone = e.target.value
      if (Number(e.target.value)) {
        this.queryMobileInfo(e.target.value)
      } else {
        this.$message.warning('请输入正确的电话号码')
      }
      
    },
    // 点击拨号
    callHandleClick(command) {
      console.log(this.callData.contactPhone,this.callCondition.makecall,this.callRecordNumber,sessionStorage.getItem("phoneStatus"))
      var phoneYes = false
       if (Number(this.callData.contactPhone)) {
         phoneYes = true
       }
    // 获取电话条状态
    this.phoneStatus = sessionStorage.getItem("phoneStatus")
      if (this.caseData.billStatusName!=='停催'&&phoneYes&&!this.callCondition.makecall&&this.callRecordNumber==0&&sessionStorage.getItem("phoneStatus") == 'InitSuccess' ) {
      // if (this.caseData.billStopStatus!==1&&phoneYes&&!this.callCondition.makecall&&sessionStorage.getItem("phoneStatus") == 'InitSuccess' ) {
        this.caseParam.billCode = this.billCode
        this.caseParam.billId = this.billId
        this.caseParam.callType = 'calling' // 呼叫类型 calling为主叫 called为被叫
        // console.log(this.callData)
        this.caseParam.calledName = this.callData.contactName
        this.caseParam.calledNumber = this.callData.contactPhone
        this.caseParam.clientName = this.caseData.clientName
        this.caseParam.clientTel = this.caseData.borrowerPhone
        this.caseParam.relationId = this.callData.contactRelationId
        this.relationsList.forEach(ele => {
          if (ele.id == this.callData.contactRelationId) {
            this.caseParam.relation = ele.relationName
            return false
          }
        })
        switch(command){
          case 'defaultNumber': // 默认号码   
            if (this.callData.contactPhone) {
              this.caseParam.callingNumber = this.$store.getters.displayNumber 
              this.caseParam.callWay = 'default' //呼叫方式（default：默认呼叫 intellect：智能 select号码池筛选）  
              this.implementCalling(this.caseParam)         
            }      
          break;
          case 'intelligentMatch': // 智能匹配
            this.$api.callCenter.getSmartMatchDID({ccCompanyId:this.$store.getters.ccCompanyId,calledNumber:this.callData.contactPhone}).then(res => {
              console.log(res)
              this.caseParam.callingNumber = res.data
              this.caseParam.callWay = 'intellect' //呼叫方式（default：默认呼叫 intellect：智能 select号码池筛选）
              this.implementCalling(this.caseParam)  
            })
          break;
          case 'manualSelection': // 手动选择
            this.manualSelectionNumber = true
          break;
        }
      } else {
        if (this.caseData.billStatusName=='停催') {
          this.$message.warning('该案件不能进行电催')
        } else {
          this.$message.warning('当前不能拨打电话')
        }
        
      }
        
    },
    // 执行拨打
    implementCalling(val) {
      console.log(val)
      var param = {
        agentSeatId: this.$store.getters.agentSeatId,
        callingNumber: val.callingNumber,
        vccId: this.$store.getters.vccId,
      }
      this.$api.callCenter.checkAgentSeat(param).then(res => {
        if (res.data) {
          application.oJVccBar.SetDisplayNumber(val.callingNumber)
          application.oJVccBar.MakeCall(val.calledNumber,2,'','','','')
          this.bus.$emit('MonitorCalling',val,'makeCall')
          this.callCondition.makecall = true       
        }       
      })
     
    },
     // 挂断电话
    cancelCall() {
      application.oJVccBar.Disconnect(1) 
      this.callCondition.makecall = false
      setTimeout(()=>{
        this.getCallRecordList()
      },1000)   
    },
    // 关闭号码池
    closeNumberPool() {
      this.manualSelectionNumber = false
    },
    // 手动选择拨号
    manualMakeCall(val){
      this.caseParam.callingNumber = val
      this.caseParam.callWay = 'select' //呼叫方式（default：默认呼叫 intellect：智能 select号码池筛选）
      this.implementCalling(this.caseParam)
    },
    // 遮罩层打电话
    onCall() {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      if (this.phoneHidden) {
        Array.includes(this.stopList, this.callData.contactPhone)
          ? (this.isStop = true)
          : (this.isStop = false);
      } else {
      }

      this.getEncodePhone(this.phoneObj);
    },
    preventAction() {
      if (this.stopCase) {
        this.$message.warning('案件已结案，不能再进行操作');
        return false;
      }
      if (this.caseDisable) {
        this.$message.warning('案件处于停催状态,不能再进行操作');
      }
    },
    getEncodePhone(phoneObj) {
      let reg = /^1[0-9]{10}$/;
      var data;
      if (this.phoneType == 1) {
        data = {
          phone: this.callData.contactPhone,
          phoneType: this.phoneType,
          relevancyId: this.callData.strongId,
          relevancySource: this.callData.source,
        };
      } else if (this.phoneType == 0) {
        data = {
          phone: this.callData.contactPhone,
          phoneType: 0,
          encryptPhone: '',
        };
      } else {
        data = {
          phone: this.callData.contactPhone,
          phoneType: this.phoneType,
          encryptPhone: phoneObj.encryptPhone,
        };
      }
      if (phoneObj) {
        data = Object.assign(data, {
          phoneType: phoneObj.phoneType,
          encryptPhone: phoneObj.encryptPhone,
        });
      }
      this.$axios
        .post('/api/assignee/call/getEncodePhone', data)
        .then(res => {
          if (res.data.code == 0) {
            this.encodePhone = res.data.data;
            this.getLoginInfo();
          } else {
            this.$util.failCallback(res.data, this);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 接通电话
    getLoginInfo() {
      let json = {
        event: 'onclickCall',
        extension: this.extension,
        strPhone: this.encodePhone,
      };
      //发送
      this.SendJson(json);
      this.pageCalling = true;
      // }
    },
    SendJson(json) {
      var str = JSON.stringify(json);
      window.frames[0].postMessage(str, '*');
    },

    // 还款意愿改变,不需要判断是否有减免审批
    intentionChange(intentionArr) {
      if (intentionArr.indexOf('承诺还款') > -1) {
        this.promiseInfoShow = true;
        this.callData.promiseAmount = '';
        this.callData.promiseRepaymentTime = '';
      } else {
        this.promiseInfoShow = false;
        this.callData.promiseAmount = '';
        this.callData.promiseRepaymentTime = '';
      }
    },
    // 添加联系人
    addConcatInfo() {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      var newConcat = Object.assign({}, this.addContact);
      this.callData.addContact.push(newConcat);
    },
    
    // 信息切换
    changeTab2(tab) {
      this.tabIndex2 = tab.index;
    },
    phoneStatusChange(val) {
      // if(val == '无效') {
      //   this.callData.phoneLabel = '设限';
      //   this.callData.repaymentIntention = ['未知'];
      //   this.callData.contactAttitude = ['未知'];
      // }
    },

    // 关闭投诉弹窗
    complainClose() {
      this.complainVisible = false;
    },
    // 添加投诉事件
    addComplain() {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      this.complainVisible = true;
    },
    stopClickYesOrNot(e) {
      return e.stopPropagation()
    },
    // 添加备忘
    addnote() {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      this.noteVisible = true;
    },
    // 关闭备忘
    noteClose() {
      this.noteVisible = false;
    },
    // 工单记录
    getaccountCheckingList() {
      this.refs.workRecord.getaccountCheckingList();
      // this.$axios
      //   .post('/api/assignee/workOrder/getWorkOrderListByCaseCode', {
      //     caseCode: this.caseCode
      //   })
      //   .then(res => {
      //     if (res.data.code == 0) {
      //       this.accountCheckingTb = res.data.data;
      //     } else {
      //       this.$util.failCallback(res.data, this);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    // qq发送
    qqSend(qq) {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      if (!qq) {
        return false;
      }
      this.qqCode = qq;
      this.$axios
        .post('/api/assignee/sms/qq/checkIsFriend', {
          qqCode: qq,
          phone: this.userInfoBean.borrowerPhone,
        })
        .then(res => {
          if (res.data.code == 0) {
            this.isQQfriend = res.data.data.isFriend;
            this.myQQAccount = res.data.data.account;
            this.myQQAddAccount = res.data.data.addAccount;
            if (this.isQQfriend) {
              this.qqAddVisible = false;
              this.qqSendVisible = true;
            } else {
              this.qqAddVisible = true;
              this.qqSendVisible = false;
            }
          } else {
            this.$util.failCallback(res.data, this);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // this.qqAddVisible = true;
    },
    // 关闭QQ - 加好友
    addQQclose() {
      this.qqAddVisible = false;
    },
    // 关闭QQ - 发送消息
    sendQQclose() {
      this.qqSendVisible = false;
    },
    // 微信发送
    wechatSend(wechat) {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      if (!wechat) {
        return false;
      }
      this.wechatCode = wechat;
      this.$axios
        .post('/api/assignee/sms/weChat/checkIsFriend', {
          phone: this.onLineData.phone,
          qqCode: this.userInfoBean.qqCode,
          wechatCode: wechat,
        })
        .then(res => {
          if (res.data.code == 0) {
            this.isWechatfriend = res.data.data.isFriend;
            this.mywechatAccount = res.data.data.account;
            this.mywechatAddAccount = res.data.data.addAccount;
            if (this.isWechatfriend) {
              this.wechatAddVisible = false;
              this.wechatSendVisible = true;
            } else {
              this.wechatAddVisible = true;
              this.wechatSendVisible = false;
            }
          } else {
            this.$util.failCallback(res.data, this);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 关闭微信 - 加好友
    addwechatclose() {
      this.wechatAddVisible = false;
    },
    // 关闭微信 - 发送消息
    sendwechatclose() {
      this.wechatSendVisible = false;
    },
    // 微信-暂时没有用到
    weChatLink() {
      this.addweChatShow = true;
    },
    // 获取人员标签
    getLabel() {
      this.$axios
        .post('/api/assignee/collectionManage/queryLabels', {
          caseManageId: this.caseManageId,
        })
        .then(res => {
          if (res.data.code == 0) {
            this.labels = ['标签1','标签2','标签3'];
          } else {
            this.$util.failCallback(res.data, this);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 手动输入电话号码
    inputPhone(phone) {
      phone ? this.getPhoneAddress(phone, 'number') : '';
      this.repaireDisBtn = false;
      if (this.fixPhone == phone && phone) {
        this.callData.callName = this.fixName;
      } else {
        this.callData.callName = '未知';
        this.callData.contactRelation = '其它';
        this.callData.encryptPhone = '';
        this.callData.phoneType = 0;
        this.phoneType = 0;
      }
      if (phone && Array.includes(this.stopList, phone)) {
        this.isStop = true;
        this.disabledBtn = true;
      } else {
        this.isStop = false;
        this.disabledBtn = false;
      }
      this.phoneObj = {
        telHidden: 0,
        phoneType: 0,
        phone: this.callData.contactPhone,
        encryptPhone: '',
      };
    },
    // 关闭添加联系人弹窗
    closedialog() {
      this.contactsvisible = false;
    },
    // 添加用户
    addUser() {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      console.log('this.userId=',this.userId)
      this.contactsvisible = true;
      this.$refs.addContacts.setAddVal(this.caseData.clientId)
    },
    //上报
    uplaod_self(){
      this.uploadShow = true;
    },
    //关闭上传弹窗
    closeUpload(){
      this.uploadShow = false;
    },
    // 修改态度
    changeContactAttitude(choose) {
      if (choose.length == 0) {
        this.callData.contactAttitude = [];
      } else if (choose[choose.length - 1] == '') {
        this.callData.contactAttitude = [''];
        this.$refs.contactAttitude.blur();
      } else if (choose.includes('')) {
        var index = choose.indexOf('');
        choose.splice(index, 1);
        this.callData.contactAttitude = choose;
      }
    },

    // 添加联系人成功后刷新用户列表
    refreshUserList() {
      this.$refs.caseConcat.getList();
    },
    // 选择业务申请
    chooseApplyDialog(val) {
      if (this.caseDisable) {
        this.preventAction();
        return false;
      }
      switch (val) {
        case '0':
          this.$refs.outVisit.applyoutvisit();
          break;
        case '1':
          this.$refs.applyDerate.openDialog();
          break;
        case '2':
          this.$refs.stopCollection.openDialog();;
          break;
        case '3':
          this.$refs.police.beforeOpenDialog();
          break;
        case '4':
          this.$refs.caseLeave.openDialog();
          break;
        case '5':
          this.$refs.justice.openDialog();
          break;
        case '6':
          this.uplaod_self()
          break;
      }
    },

    // 关闭弹窗
    closeStopCollection() {
      this.caseStopVisible = false;
    },
    //催记类型选择
    markChange(val){
     }, 
    // 查询有没有通话号
    
    // 写催记-选择联系人
    chooseContactMan(val) {  
        this.callData.contactName = val.contactName
        this.callData.contactPhone = val.contactPhone
        this.callData.contactRelation = val.relation
        this.callData.contactRelationId = val.relationId
        this.callData.collectionTypeId = val.relationTypeId
        this.callData.relationGetWay = val.relationGetWay
        if (val) {
          // 查询选择联系人的手机号的归属地和运营商
          this.queryMobileInfo(val.contactPhone)
        }
      
    },
     // 查询选择联系人的手机号的归属地和运营商
    queryMobileInfo(phone) {
      this.$api.collectionManageAPI.queryMobileInfo({tel:phone}).then(res => {
          this.mobileInfo = res
      })   
    }, 
    //快捷选择催记内容
    chooseRadioRemark(val) {
      this.callData.collectionContent = val
    }

  },
  beforeDestroy() {
    console.log(22)
    
  },
  destroyed() {
    this.bus.$off('MonitorResult')
    this.bus.$off('MonitorCallEnd')
    document.title = '私有化催收业务系统';
  }
};
</script>

<style lang="scss" scoped>
.my-boby {
    position: absolute;
    min-width: 1280px;
    width: 100%;
    height: 100%;
    .content{
      height:100%;
    }
    .paddingBtm{
      height: calc(100% - 50px);
    }
}

.flex-between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bg-gray{
  background:#F1F3F9;
}
.bg-white{
  background: #fff;
}
.label-right{
  text-align: right;
}
.gray-word{
  color: #999;
}
.blue-word{
   color:#5D72F5;
}
.green-word{
  color: #53CE83!important;
}
.fontSize12{
  font-size: 12px;
}
.mar-top{
  margin-top: 16px; 
}
.text-left{
  text-align: left;
  color: #333;
  padding-left: 5px;
}
.grid-content-1{
  padding: 0 15px;
  line-height: 60px;
  .el-tag--danger{
    padding: 0 18px;
    line-height: 28px;
    height: 28px;
    color: #333;
    border: none;
  }
}
.grid-content-2{
  margin-top: 16px;
  .name-box{
    line-height: 33px;
    background: #4D5673;
    font-size:18px;
    color: #fff;
    text-align: left;
    padding: 0 10px;
    height: 33px;
  }
  .ID-box{
    padding: 6px 5px 5px;
    line-height: 30px;
    font-size:14px;
    text-align: left;
    background: #fff;
    color: #333333;
  }
  .col-left-1{
    padding: 10px;
    line-height: 28px;
  }
}
.name-list{
  background: #fff;
  height: 180px;
  overflow: auto;
  line-height: 30px;
  text-align: left;
  padding-bottom: 32px;
  .unchoose{
    padding: 0 10px;
    color: #333;
  }
  .onchoose{
    padding: 0 10px;
    color: #5D72F5;
    background: rgba(94,114,245,0.1)
  }
}
.btn-box-1{
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  .title-bold{
    font-weight: bold;
  }
  a{
    cursor: pointer;
  }
}
.btn-box-2{
  line-height: 40px;
  font-size: 12px;
  a{
    color: #5D72F5;
    cursor: pointer;
    span {
      margin-left: 5px;
      font-size: 15px;
      display: inline-block;
      -moz-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      -webkit-transform: rotate(-90deg);
      transform: rotate(-90deg);
    }
  }
}
.open-btn{
  font-size: 12px;
  a{
    color: #5D72F5;
    cursor: pointer;
    span {
      margin-left: 5px;
      font-size: 15px;
      display: inline-block;
      -moz-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
}
/deep/ .tab-box{
  .el-tabs__item{
    width: 100px;
    line-height: 40px;
    padding: 0;
  }
  .el-tabs__item.is-active {
    color: #5F72F5;
    border-bottom: 2px solid #5F72F5;
  }
   .el-tabs__item:hover{
     color: #5F72F5;
   }
  .el-tabs__active-bar{
      display:none; 
  }
}
.buni-btn{
  position: absolute;
  right: 20px;
  top: 5px;
  z-index: 98;
}
.checkbox-group{
  text-align: left;
  padding-left: 10px;
  line-height: 46px;
  border-top: 2px solid #E6E6E8;
  /deep/ .el-checkbox__inner{
    width:20px;
    height:20px;
  }
 /deep/ .el-checkbox__inner::after{
   border: 2px solid #fff;
   border-left: 0;
   border-top:0;
   width: 4px;
   height: 10px;
   left:6px;
   top: 2px;
  }
}
  .fixed-btn {
    position: fixed;
    top: 50%;
    right: 10px;
    margin-top: -167px;
    font-size: 14px;
    color: #5D72F5;
    background-image: url('../../../assets/extend1.png');
    z-index: 2001;
    height: 233px;
    width: 30px;
    cursor: pointer;
    p {
      margin-top: 85px;
      width: 30px;
      line-height: 20px;
      background: none;
      text-align: center;
    }
  }
.content-body {
  /deep/ .form-detail {
    margin-bottom: 0;
  }
  /deep/ .el-pagination {
    margin-bottom: 0;
  }
}
.right {
  text-align: right;
}
.fixed-area {
  background: #18213C;
  z-index: 2001;
  height: 100%;
  color: #fff;
  .el-checkbox-group,
  .el-radio-group {
    margin-bottom: 5px;
  }
  /deep/ .el-form-item {
    text-align: left;
    margin-bottom: 0;
    .el-form-item__label{
      color: #fff;
    }
    .el-input__inner{
     background: #18213C; 
     color: #fff;
    }
    .el-textarea__inner{
      background: #18213C; 
      color: #fff;
    }
    .el-radio-button__inner{
      background: #18213C; 
      color: #fff;
      width: auto!important;
      padding: 0 8px;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner{
      color: #5D72F5;
      border: 1px solid #5D72F5!important;
    }
    .el-checkbox__inner{
       background: #18213C; 
    }
    .el-checkbox__label{
      color: #fff; 
    }
  }
  .fixed-contentForm {
    height: 100%;
    & > h5 {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      border-top: 1px #d1d0d0 solid;
      border-bottom: 1px #d1d0d0 solid;
    }
    .auto-box{
      height: calc(100% - 40px);
      overflow: auto;
    }
  }

  & > div {
    height: 100%;
  }
  h6 {
    text-align: center;
  }
  p {
    height: 20px;
    background: #f9f9f9;
  }
  .fixedBtn {
    text-align: center;
    margin: 0 auto;
    //  transform: rotate(90deg);
    width: 90px;
    line-height: 16px;
    height: 16px;
    padding: 0;
    font-size: 14px;
    border-radius: 10px 10px 0px 0px;
    background: #f9f9f9;
    outline: none;
    border: 1px rgba(216, 216, 216, 1) solid;
    border-bottom: none;
    position: relative;
    top: 1px;
    &:hover {
      outline: none;
    }
  }
}

.bgHide {
  right: 0;
  color: #fff !important;
}

.bgShow {
  right: 20.7%;
  background: url('../../../assets/extend1.png') no-repeat !important;
  color: #5D72F5 !important;
  p {
    font-size: 15px;
  }
  &:hover p {
    color: #5d72f5;
  }
} 

.mg-10 {
  margin-left: 10px;
} //遮罩层添加联系人
.addArea {
  max-height: 135px;
  overflow: auto;
  .concatInfo {
    border-top: 1px #333 dashed;
    margin-top: 10px;
  }
} // 遮罩层承诺还款、
.promiseInfo {
  .form-detail .el-form-item label.el-form-item__label {
    width: 86px !important;
  }
  // .el-form {
  //   height: 40px !important;
  //   overflow: hidden;
  // }
}

.addBtn {
  clear: both;
  height: 40px;
  margin: 10px 0 0 0;
}

.el-icon-delete {
  &:hover {
    color: #f00;
  }
}

.btnGroup {
  float: right;
  text-align: right;
  margin-right: 0px;
  width: 100%;
  text-align: center;
}

.my-tabs {
  padding: 0;
}

.el-table th,
td {
  text-align: center;
}

.el-menu {
  border: 1px solid rgba(218, 218, 218, 1);
  // background: rgb(249,249,249);
  border-radius: 6px;
  position: absolute;
  right: 0;
  top: 20px;
  max-height: 107px;
  overflow: auto;
  width: 112px;
  z-index: 2000;
  .el-menu-item {
    padding-left: 0;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    color: rgb(34, 34, 34);
    text-align: center;
  }
}
.repayTension .el-checkbox-button {
  display: block;
  float: left;
  .el-form-item__error {
    top: auto !important;
    bottom: -3px !important;
  }
}
@media screen and (max-width: 1300px) {
  #concater {
    max-width: 70px !important;
  }
}
.outLine {
  padding: 0 8px;
}
.username {
  font-size: 16px;
  color: #333333;
  font-weight: 600;
}

// 欠款人重要首页信息
.head-info {
  height: 22px;
  line-height: 22px;
  margin: 0 0 20px 16px;
  color: rgb(51, 51, 51);
  b {
    font-size: 16px;
    font-weight: 600;
    padding: 0 0 0 14px;
  }
  .line {
    color: #cccccc;
    width: 2px;
    padding: 0 10px;
  }
  .person-msg {
    i {
      padding: 0 2px 0 3px;
      color: #666666;
    }
  }
  .number {
    margin-left: 42px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-top: -3px;
    margin-right: 3px;
    display: inline-block;
    vertical-align: middle;
  }
}

.info .el-form-item {
  width: 340px;
  color: #333333;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 13px;
  .el-form-item__label {
    color: #666666;
  }
}
// .person_msg {
//   margin-top: 15px;
//   position:fixed;
//   top: 80px;
//   left: 0;
//   height: 120px;
// }
.label_msg {
}
.labelTitle {
  padding-top: 20px;
  width: 60px;
  float: left;
  font-weight: 600;
  color: #333333;
  font-size: 16px;
  text-align: right;
}
.tab-list {
  background: #ffffff;
}
.md {
  // background: #ffffff;
}
.all_record {
  background: #ffffff;
  margin: 0 8px 0 16px!important;
  position: relative;
  padding-top: 10px;
  h5 {
    color: #333333;
    font-size: 16px;
    height: 47px;
    line-height: 39px;
    text-align: left;
    font-weight: 550;
    border-top: 8px rgba(247, 247, 247, 1) solid;
    margin: 0 -16px;
    padding: 0 18px;
    + div {
      padding-bottom: 16px;
     
    }
  }
  h5:first-child {
    border-top: 0;
  }
  .el-table {
    border: none !important;
  }
}
// .el-dropdown {
//   .el-button-group {
//     height: 28px;
//     line-height: 28px;
//   }
// }
// 头部固定
// 菜单栏打开是fixed悬浮框位置
.fix-msg-open {
  position: fixed;
  top: 50px;
  left: 66px;
  right: 32px;
  padding: 16px 0;
  background: #ffffff;
  z-index: 999;
}
// 菜单栏关闭是fixed悬浮框位置
.fix-msg-close {
  position: fixed;
  top: 50px;
  left: 196px;
  right: 28px;
  padding: 16px 0;
  background: #ffffff;
  z-index: 999;
  min-width: 1320px;
  overflow: hidden;
}
//催记记录label和内容分行
.fixed-area .form-item-p {
  // width: 85px;
  padding: 5px 8px 0 15px;
  font-size: 14px;
  color: #fff;
  text-align: left;
  line-height: 20px;
  background: #18213C;
  clear: both;
  margin-bottom: 10px;
}
.clickBtn {
  padding: 5px 6px;
  background: #5e72f5;
  border-color: #5e72f5;
  color: #fff;
  margin-left: 4px;
}
.el-dropdown-link {
  margin-left: 16px;
  cursor: pointer;
  color: #5d72f5;
}
.red {
  color: #E47890;
}
.detailTop {
  padding-left: 8px;
}

  // .el-tag {
  //   text-indent: 0;
  //   background:rgba(93,114,245,0.1);
  //   color: #5D72F5;
  //   height: 28px;
  //   line-height: 28px;
  //   padding: 0 15px;
  //   border-radius:2px;
  //   font-size: 14px;
  //   &:first-child {
  //     margin-left: 20px;
  //   }
  // }

  // .el-tag + .el-tag {
  //   margin-left: 8px;
  // }
.ownMsgBg {
  background: rgba(93,114,245,0.1);
  padding:3px 7px;
}
.person_msg .el-form-item__content span{
  display: block;
  background: rgba(93,114,245,0.1);
  width: 180px;
  line-height: 32px;
  padding: 0 7px;
}
.all_record .infoTitle {
  cursor: pointer;
  overflow:hidden;
  span {
    display: inline-block;
    line-height: 32px;
    &:not(:first-child){
      margin-left: 22px
    }
  }
}

.concatChoose {
  color: #5D72F5;
  border-bottom: 2px #5D72F5 solid;
}


.tabUl {
  margin: 10px 0;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  display: block;
  width:100%;
}

.extend-tab {
  left: 205px!important;
}
/deep/.fixed-area .el-input{
  width: 185px;
}
.boxScroll{
  background:#F1F3F9;
  overflow:scroll;
}
.tabBox{
 position: absolute;
 left:0;
 width:100%;
 height:45px;
 z-index:999;
}
.top-box-wrap{
  display: flex;
  .top-box-left{
    flex: 1;
  }
}
.float-box{
  position:absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-shadow:0px -4px 6px -3px rgba(0,0,0,0.32);
  line-height: 30px;
  font-size: 12px;
  color: #333;
  padding: 0 10px;
  span{
    color: #999;
  }
}
.collapseAside{
  width:calc(100% - 50px);
  padding: 0 10px;height:100%;overflow:auto;
}
.expandAside{
  width:calc(100% - 180px);
  padding: 0 10px;height:100%;overflow:auto;
}
</style>
