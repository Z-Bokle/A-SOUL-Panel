<template>
  <div class="shortcuts">
      <div v-for="(item,index) in shortcutsArray" :key="index" class="shortcut-item">

      </div>
      <div class="add-shortcut">

      </div>
  </div>
</template>

<script>
/*
模板写法参考todo
add-shortcut初步设计为形似item的按钮，点击后出现小窗可输入信息
确定后立刻获取一次favicon.ico并缓存，每次点击item后都会更新其favicon
获取favicon失败默认使用本插件图标
item可排序，在设置选项卡中实现给出列表上下拖动更新Array后重新渲染也好，
类似手机桌面拖动排序也好
(直接操纵Array并重新渲染，拖出就删除项目，预插入就增加空项目，确定插入将空项目替换为目标项目
每次更新Array就重新渲染，初期不考虑动画，动画后需考虑，可参考微软todo的item样式变化)

*/
import shortcutItem from './shortcut-item'
export default {
    name:'shortcuts',
    components:{
        shortcutItem
    },
    data(){
        return {
            shortcutsArray:[],

        }
    },
    created(){
        //从插件storage取出shortcutsArray
    },
    unmounted(){
        //将shortcutsArray存储到storage
    },
    methods:{
        addShortcut(){

        }
    }
}
</script>

<style>

</style>