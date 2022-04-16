<template>
  <div>
    <backgrounds></backgrounds>

    <div class="top">
      <div class="apps">
        <el-row>
          <el-button-group>
          <el-button @click="showapp1()">showapp1</el-button>
          <el-button @click="showapp2()">showapp2</el-button>
          </el-button-group>
        </el-row>
      </div>
      
    </div>

    <div class="middle">

      <!-- <weather></weather> -->

      <app-window ref='app1' title="title1">
        <todo-list></todo-list>
      </app-window>

      <app-window ref="app2" title="title2"></app-window>

      <div class="time">
        <clock></clock>
      </div>

      <div class="search">
        <search-box></search-box>
      </div>

      <div class="shortcuts">
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

export default {
    components:{
      clock,
      weather,
      searchBox,
      todoList,
      AppWindow,
      backgrounds,
      greetings,
      shortcuts
    },
    methods:{
      showapp1(){
        //先关闭所有窗口再打开目标窗口
        this.$refs.app2.close()
        this.$refs.app1.open()
      },
      showapp2(){
        this.$refs.app1.close()
        this.$refs.app2.open()
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
    background-color: aquamarine;
}
.time{
    margin: 0 auto 3vh;
    width: 40vw;
    height: 24vh;
    text-align: center;
    background-color:darkgreen;
}
.search{
    margin: 3vh auto 3vh;
    width: 60vw;
    height: 6vh;
    text-align: center;
    background:linear-gradient(to right, rgb(249, 177, 177) 0%,rgb(249, 146, 146) 100%);
    opacity: 0.4;  
}
.shortcuts{
    margin: 3vh auto 0;
    width: 60vw;
    height: 40vh;
    text-align: center;
    background-color: cadetblue;
}
.greetings{
    margin: 0 auto 0;
    height: 4vh;
    text-align: center;
    background-color: brown;
}

</style>