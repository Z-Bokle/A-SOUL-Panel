<template>
  <div>
    <backgrounds></backgrounds>

    <div class="top">
      <div class="apps">
        <el-row>
          <el-button-group size="large" class="top-buttons">
            <el-tooltip effect="dark" placement="bottom-start" content="对插件进行一些必要的设置，如搜索引擎、通知等">
              <el-button @click="showapp1()" class="top-button">设置</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" placement="bottom-start" content="查看当前直播间信息，B站动态瀑布流，并快速跳转到指定页面">
              <el-button @click="showapp2()" class="top-button">动态与直播</el-button>
            </el-tooltip>
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
    background: rgba(255,255,255,0);
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
.top-button{
  background-color: rgba(255, 255, 255, 0.5);
}
el-button-group{
  font-family: MiSans;
}
</style>