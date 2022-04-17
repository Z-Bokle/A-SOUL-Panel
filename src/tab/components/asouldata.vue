<template>
    <el-drawer v-model="drawer" title="A-SOUL的动态与直播" direction="ltr" size="50%">
        <el-card>
            这里展示直播间信息
        </el-card>

        <el-divider />

        <el-timeline v-infinite-scroll="load">
            <el-timeline-item v-for="(item,index) in dataArray" :key="index" :timestamp=item.time :icon=item.icon placement="top">
                <el-card @click="openTab(index.url)">
                    <h4>{{ item.head }}</h4>
                    <p>{{ item.text }}</p>
                    <el-image v-if=item.withPic :src=item.picUrl fit="contain" />
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
</template>

<script>
/*
从上到下是从新到旧
直播间信息展示使用v-for加载6张卡片
*/
import { ref } from 'vue'

export default {
    name:'asouldata',
    data(){
        return{
            drawer:ref(false),
            dataArray:[]
        }
    },
    methods:{
        openWindow(){
            this.drawer = true;
        },
        closeWindow(){
            this.drawer = false;
        },
        load(){
            //从Fetch API处获得足量信息并按时间排序，处理成dataArray的元素后push进去
            //
            this.dataArray.push({
                time:"2020/11/12", //时间戳
                head:"标题", //标题
                text:"内容", //内容
                withPic:false, //带图片
                picUrl:null, //图片链接
                url:null //卡片点击链接
            })
        },
        openTab(url){
            window.open(url)
        }
    }
}
</script>

<style>

</style>