<template>

    <link :href=darkCssUrl type="text/css" rel="stylesheet" />

    <el-dialog v-model="dialogVisible" title="添加新搜索引擎" width="30%" draggable>
        <el-form :model="form">
            <el-form-item label="搜索引擎名">
                <el-input v-model="engineName" placeholder="请输入搜索引擎的名字" />
            </el-form-item>

            <el-form-item label="链接">
                <el-input v-model="engineLink" placeholder="请输入搜索引擎的搜索API" />
            </el-form-item>

        </el-form>
        <span>
            <el-button @click="addEngine(engineName,engineLink)">确定</el-button>
        </span>
    </el-dialog>

    <el-drawer v-model="drawer" :before-close="closeHandle" title="Settings" direction="ltr" destroy-on-close="true" size="50%">
        <el-card>
            <template #header>
                <span>设置</span>
            </template>
            <div>
                <h6 class="settings-desc">夜间模式</h6>
                <el-switch
                v-model="nightMode"
                :before-change="changeDarkMode"
                active-text="开启"
                inactive-text="关闭"/>

                <el-divider />

                <h6 class="settings-desc">后台直播通知</h6>
                <el-switch
                v-model="noti"
                active-text="开启"
                inactive-text="关闭"/>

                <el-divider />

                <h6 class="settings-desc">Live2D(暂不可用)</h6>
                <el-switch
                v-model="live2D"
                disabled="true"
                active-text="开启"
                inactive-text="关闭"/>

                <el-divider />

                <el-table :data="engine" style="width:90%;">
                    <el-table-column prop="name" label="搜索引擎" />
                    <el-table-column prop="link" label="链接" />
                    <el-table-column fixed="right" label="删除">
                        <template #default="scope">
                            <el-button type="text" size="small" @click.prevent="deleteEngine(scope.$index)">删除</el-button>
                            <el-button type="text" size="small" @click.prevent="upMoveEngine(scope.$index)">上移</el-button>
                            <el-button type="text" size="small" @click.prevent="downMoveEngine(scope.$index)">下移</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="showDialog">添加</el-button>
            </div>

            <el-divider />

            <div>
                <el-tooltip effect="dark" placement="bottom-start" content="请不要随意使用，如果插件出现错误该按钮可能会有用">
                    <el-button @click="clearData">清空用户数据</el-button>
                </el-tooltip>
            </div>
        </el-card>

    </el-drawer>
</template>

<script>
/*
夜间模式
搜索引擎修改
设置存取到storage

直播通知功能开关

所有的设置均存入storage API
加载时从API获取已有的设置信息
通过关闭窗口前的回调函数覆盖旧的设置
*/
import { ref } from 'vue'


export default {
    name:'settings',
    data(){
        return{
            drawer:ref(false),
            nightMode:ref(false),
            noti:ref(false),
            live2D:ref(false),
            dialogVisible:ref(false),
            engine:[],
            engineName:null,
            engineLink:null,
            clearDataFlag:false,
            darkCssUrl:null
        }
    },
    async mounted(){
        //不只是engine，应读取所有有关设置项
        let result = await chrome.storage.sync.get(['engine','settings'])
        this.engine = await result.engine
        let settings = await result.settings
        this.noti = settings.noti
        this.clearDataFlag = false
    },
    methods:{
        openWindow(){
            this.drawer = true;
        },
        closeWindow(){
            this.drawer = false;
        },
        showDialog(){
            this.engineName = null
            this.engineLink = null
            this.dialogVisible = true
        },
        addEngine(engineName,engineLink){
            this.engine.push({
                name:engineName,
                link:engineLink
            })
            this.dialogVisible = false
        },
        deleteEngine(index){
            this.engine.splice(index,1)
        },
        upMoveEngine(index){
            if(index!=0){
                let tmp = this.engine.splice(index,1)
                this.engine.splice(index - 1,0,tmp[0])                
            }
        },
        downMoveEngine(index){
            if(index!=this.engine.length - 1){
                let tmp = this.engine.splice(index,1)
                this.engine.splice(index + 1,0,tmp[0])  
            }
        },
        async closeHandle(done){
            if(!this.clearDataFlag){
                //存储所有设置项

                await chrome.storage.sync.set({
                    //engine会莫名其妙从获取时的Array变成Object，原因未知，这里用Object的静态方法将其重新转换回Array
                    engine:Object.values(this.engine),
                    settings:{
                        noti:this.noti
                    }
                })
                console.log("设置已保存",{
                    engine:this.engine,
                    settings:{
                        noti:this.noti
                    }
                })                
            }
            done()
        },
        async clearData(){
            console.log("已清空用户数据")
            await chrome.storage.sync.clear()
            this.clearDataFlag = true
            await chrome.runtime.reload()
        },
        changeDarkMode(){
            //因为是before-change时触发的函数，因此相反
            this.darkCssUrl = this.nightMode === false ? "css/dark.css" : null
            console.log(this.darkCssUrl)
            return true
        }
    }
}
</script>

<style>
.settings-desc{
    margin-right: 1vw;
}
</style>