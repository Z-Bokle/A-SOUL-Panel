<template>
    <div class="shortcuts">
        <div v-for="(item,index) in shortcutsArray" :key="index" class="shortcut-item">
            <shortcut-item 
            :text=item.text 
            :link=item.link 
            :index=index 
            :draggable=item.draggable
            @click="addShortcut(index)"
            @dragenter="dragenter($event, index)"
            @dragover="dragover($event, index)"
            @dragstart="dragstart(index)">
            </shortcut-item>
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
            dragIndex:undefined//拖动时用
        }
    },
    created(){
        //从插件storage取出shortcutsArray
        
        this.shortcutsArray.push({
            text:"addItem",
            link:null,
            draggable:false
        })
    },
    unmounted(){
        //将shortcutsArray存储到storage
    },
    methods: {
        addShortcut(index){
            if (index != this.shortcutsArray.length - 1) return;
            //点击的并非最后一个项目，故不添加新项目
            if (this.shortcutsArray.length >= 12){
                alert("您的图标数目太多了")
            }
            else{
                this.shortcutsArray.push({
                    text: "test" + this.shortcutsArray.length.toString(),
                    link: "https://www.baidu.com",
                    draggable: true
                })
                //swapItem
                let tmp = this.shortcutsArray[this.shortcutsArray.length - 1]
                this.shortcutsArray[this.shortcutsArray.length - 1] = this.shortcutsArray[this.shortcutsArray.length - 2]
                this.shortcutsArray[this.shortcutsArray.length - 2] = tmp
            }
        },
        dragstart(index){
            this.dragIndex = index
        },
        dragenter(e, index){
            e.preventDefault() //避免源对象触发自身的dragenter事件
            if(index == this.shortcutsArray.length - 1) return; //阻止插入到最后一个            
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
    }
}
</script>

<style>
.shortcut-item{
    position: absolute;
}
</style>