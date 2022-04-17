<template>
    <el-drawer v-model="drawer" title="Settings" direction="ltr" destroy-on-close="true">
        <div>
            <transition-group class="todo-items" name="todo-items" tag="ul">
                <li v-for="(item,index) in todoArray" :key="index" @dragenter="dragenter($event, index)"
                    @dragover="dragover($event, index)" @dragstart="dragstart(index)" class="todo-item"
                    draggable="true">
                    <todo-item :text=item.text :done=item.done></todo-item>
                </li>
            </transition-group>

            <div class="todo-new">
                <span><input type="text" id="newTodoText" maxlength="40" /></span>
                <span><button @click="addTodo" @keydown.enter="addTodo">OK</button></span>
            </div>

        </div>
    </el-drawer>
</template>

<script>
import todoItem from './todo-item'
import {ref} from 'vue'
export default {
    name:'todo-list',
    components:{
        todoItem
    },
    data(){
        return{
            drawer:ref(false),
            todoArray:[],
            dragIndex:undefined,
            itemHeight:4
        }
    },
    created(){
        //从插件存储api取出todoArray
        
    },
    unmounted(){
        //将todoArray保存到插件存储api
        //仅保存未被标记完成的项目
    },
    methods:{
        openWindow(){
            this.drawer = true;
        },
        closeWindow(){
            this.drawer = false;
        },
        dragstart(index) {
            this.dragIndex = index;
        },
        dragenter(e, index) {
            e.preventDefault();
            // 避免源对象触发自身的dragenter事件
            if (this.dragIndex !== index) {
                const moving = this.todoArray[this.dragIndex];
                this.todoArray.splice(this.dragIndex, 1);
                this.todoArray.splice(index, 0, moving);
                // 排序变化后目标对象的索引变成源对象的索引
                this.dragIndex = index;
            }
        },
        dragover(e, index) {
            e.preventDefault();
        },
        addTodo(){
            let newTodoText=document.getElementById("newTodoText")
            this.todoArray.push({
                text:newTodoText.value,
                done:false,
            })
            newTodoText.value=null
        }
    }
}
</script>

<style>
.todo-item{
    height: 4vh;
    width: 40vw;
    background-color: crimson;
    text-align: center;
    /* position: relative; */
    /* left: 0vw; */
}
.todo-items{
    overflow-y: auto;
    overflow-x: hidden;
    /* height: 42vh; */
}
.todo-new{
    position: absolute;
    height: 4vh;
    /* width: 40vw; */
    background-color: hotpink;
    /* top: 46vh; */
}
.list-move{
    transition: transform 1s;
}
</style>