<template>
      <div>
    
        <div class="todo-items">
            <div v-for="(item,index) in todoArray" :key="index" class="todo-item" >
                <todo-item :text=item.text></todo-item>
            </div>
        </div>

        <div class="todo-new">
            <span><input type="text" id="newTodoText" maxlength="40" /></span>
            <span><button @click="addTodo" @keydown.enter="addTodo">OK</button></span>
        </div>
    
    </div>
</template>

<script>
import todoItem from './todo-item'
export default {
    name:'todo-list',
    components:{
        todoItem
    },
    data(){
        return{
            todoArray:[],
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
    position: relative;
    left: 0vw;
}
.todo-items{
    overflow-y: auto;
    overflow-x: hidden;
    height: 42vh;
}
.todo-new{
    position: absolute;
    height: 4vh;
    width: 40vw;
    background-color: hotpink;
    top: 46vh;
}
</style>