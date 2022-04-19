<template>
    <el-drawer
    v-model="drawer"
    title="Settings"
    direction="ltr"
    destroy-on-close="true"
    >
    
    </el-drawer>
</template>

<script>
/*
夜间模式
搜索引擎修改
设置存取到storage
live2D开关
实时动态、直播通知功能开关

所有的设置均存入storage API
加载时从API获取已有的设置信息并显示
通过关闭窗口前的回调函数覆盖旧的设置
*/
import { ref } from 'vue'


export default {
    name:'settings',
    data(){
        return{
            drawer:ref(false)
        }
    },
    methods:{
        openWindow(){
            this.drawer = true;
        },
        closeWindow(){
            this.drawer = false;
        }
    }
}
</script>

<style>

</style>