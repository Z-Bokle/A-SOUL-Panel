<template>

    <el-dialog v-model="dialogVisible1" title="添加新快捷方式" width="30%" draggable>
        <el-form :model="form">
            <el-form-item label="图标">
                <el-avatar :src="shortcutIcon" size="large" />
                <br />
                <el-button @click="refreshIcon">刷新图标</el-button>
            </el-form-item>

            <el-form-item label="快捷方式名">
                <el-input v-model="shortcutText" placeholder="请输入快捷方式的名字" />
            </el-form-item>

            <el-form-item label="链接地址">
                <el-input v-model="shortcutLink" placeholder="请输入快捷方式的链接" />
            </el-form-item>

        </el-form>
        <span>
            <el-button @click="addShortcut(shortcutText,shortcutLink,shortcutIcon)">确定</el-button>
        </span>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="警告" width="30%" center>
        <div>
            <span>是否删除该快捷方式？</span>
            <div>
                <el-avatar :src=shortcutIcon draggable="false" size="large" />
            </div>
            <div>
                <div> 链接文本： {{ shortcutText }} </div>
                <div> 链接地址： {{ shortcutLink }} </div>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取消</el-button>
                <el-button type="primary" @click="deleteItem(operateIndex)">确定</el-button>
            </span>
        </template>
    </el-dialog>

    <transition-group name="shortcuts" class="shortcuts" tag="div">
        <shortcut-item v-for="(item,index) in shortcutsArray" :key="index" class="shortcut-item" :text=item.text
            :link=item.link :icon=item.icon :index=index :draggable=item.draggable @dragenter="dragenter($event, index)"
            @dragover="dragover($event, index)" @dragstart="dragstart(index)" @click.right="openDialog2(index)" @contextmenu.prevent>
        </shortcut-item>
        <shortcut-item @click="openDialog1" v-show="shortcutsArray.length<24" :link="null" icon="./assets/icons/512.png"
            text="添加新图标" :index="-1"></shortcut-item>
    </transition-group>

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
import { ref } from 'vue'
export default {
    name:'shortcuts',
    components:{
        shortcutItem
    },
    data(){
        return {
            shortcutsArray:[],
            dragIndex:undefined, //拖动时用
            dialogVisible1:ref(false),
            //用于v-model绑定Dialog内数据
            dialogVisible2:ref(false),
            shortcutText:null,
            shortcutLink:null,
            shortcutIcon:"./assets/icons/512.png",
            operateIndex:null,
        }
    },
    created(){
        //从插件storage取出shortcutsArray
        
    },
    unmounted(){
        //将shortcutsArray存储到storage
    },
    methods: {
        addShortcut(text,link,icon){
            this.shortcutsArray.splice(this.shortcutsArray.length , 0,{
                text: text,
                link: link,
                icon: icon,
                draggable: true
            })
            this.dialogVisible1 = false
        },
        dragstart(index){
            this.dragIndex = index
            
        },
        dragenter(e, index){
            e.preventDefault() //避免源对象触发自身的dragenter事件       
            if(this.dragIndex !== index){
                const source = this.shortcutsArray[this.dragIndex]
                this.shortcutsArray.splice(this.dragIndex, 1)
                this.shortcutsArray.splice(index, 0, source)
                //排序变化后目标对象的索引变成源对象的索引
                this.dragIndex = index
            }
        },
        dragover(e, index) {
            e.preventDefault()

        },
        openDialog1(){
            this.shortcutText=null
            this.shortcutLink=null
            this.shortcutIcon="./assets/icons/512.png"
            this.dialogVisible1=true
        },
        openDialog2(index){
            this.operateIndex=index
            this.shortcutText=this.shortcutsArray[index].text
            this.shortcutLink=this.shortcutsArray[index].link
            this.shortcutIcon=this.shortcutsArray[index].icon
            this.dialogVisible2=true
        },
        deleteItem(index){
            this.shortcutsArray.splice(index,1)
            this.dialogVisible2 = false
        },
        async refreshIcon(){
            this.shortcutIcon = 'https://api.qqsuu.cn/api/favicon/get.php?url=' + this.shortcutLink
        }
    }
}
</script>

<style>
.shortcuts{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    align-content: space-around;
}
.shortcuts-leave-active
.shortcuts-item-enter-active
{
    transition: all 1s ease;   
}
.shortcuts-move{
    transition: transform 0.8s ease;
    
}

.shortcuts-leave-active{
    position: absolute;
}
</style>