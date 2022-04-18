<template>
  <div>
    <backgrounds></backgrounds>

    <div class="top">
      <div class="apps">
        <el-row>
          <el-button-group>
          <el-button @click="showapp1()">设置</el-button>
          <el-button @click="showapp2()">动态与直播</el-button>
          </el-button-group>
        </el-row>
      </div>
      
    </div>

    <div class="middle">

      <!-- <weather></weather> -->
      <settings ref="settings"></settings>
      <asouldata ref="asouldata"></asouldata>

      <div class="time">
        <clock></clock>
      </div>

      <div class="search">
        <search-box></search-box>
      </div>

      <div>
        <shortcuts></shortcuts>
      </div>
      
    </div>

    <div class="bottom">
      <div class="greetings">
        <greetings></greetings>
      </div>
    </div>
  </div>
</template>

<script>
import AppWindow from './appWindow'
import clock from './clock'
import searchBox from './search-box'
import todoList from './todo-list'
import weather from './weather'
import backgrounds from './backgrounds'
import greetings from './greetings'
import shortcuts from './shortcuts'
import settings from './settings'
import asouldata from './asouldata'
export default {
    components:{
      clock,
      weather,
      searchBox,
      todoList,
      AppWindow,
      backgrounds,
      greetings,
      shortcuts,
      settings,
      asouldata
    },
    methods:{
      showapp1(){
        this.$refs.settings.openWindow()
      },
      showapp2(){
        this.$refs.asouldata.openWindow()
      }

    }
}
</script>

<style>
.top{
    width: 100%;
    height: 6vh;
    
}
.middle{
    margin: 10vh auto 6vh;
    width: 100%;
    height: 74vh;
    text-align: center;
}
.bottom{
    width: 100%;
    height: 4vh;
    text-align: center;
}
.apps{
    margin: 0px auto 0;
    height: 6vh;
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(2px);   
}
.time{
    margin: 0 auto 3vh;
    width: 40vw;
    height: 24vh;
    text-align: center;
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(2px); 
    border-radius: 25px;
}
.search{
    margin: 3vh auto 3vh;
    width: 60vw;
    height: 6vh;
    text-align: center;
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(2px); 
    border-radius: 25px;
}
.shortcuts{
    margin: 3vh auto 0;
    width: 60vw;
    height: 40vh;
    text-align: center;
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(2px); 
    border-radius: 25px;
}
.greetings{
    margin: 0 auto 0;
    height: 4vh;
    text-align: center;
    background: rgba(255,255,255,.1);
    backdrop-filter: blur(2px); 
    
}

</style>