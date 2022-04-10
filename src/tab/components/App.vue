<template>
  <div>
    <backgrounds></backgrounds>

    <div class="top">
      <div class="apps">
        <button @click="showapp1()">showapp1</button>
        <button @click="showapp2()">showapp2</button>
      </div>
      <weather></weather>
    </div>

    <div class="middle">

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
        shotcuts

      </div>
    </div>

    <div class="bottom">
      <div class="greetings">
        greetings
      </div>
    </div>
  </div>
</template>

<script>
import AppWindow from './appWindow.vue'
import clock from './clock.vue'
import searchBox from './search-box.vue'
import todoList from './todo-list.vue'
import weather from './weather.vue'


export default {
    components:{
      clock,
      weather,
      searchBox,
      todoList,
      AppWindow
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
    background-color:blueviolet;
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
.backgrounds{
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: -99999;
}
</style>