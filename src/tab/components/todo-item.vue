<template>
      <span :style=itemStyle @click="clickItem">
          <span> {{text}} </span>
          <span>
            <input type="checkbox" :checked=checked />
          </span>
      </span>
</template>

<script>
export default {
    name:'todo-item',
    props:{
        text:{//文字描述
            type:String,
            required:true
        },
        done:{
            type:Boolean,
            required:true
        }
    },
    data(){
        return{
            id:null, //以后可能会用的到
            finished:this.done,
            checked: this.done? "checked" : "unechecked",
            normalStyle:{"text-decoration":"none"}, //定义未完成的样式
            doneStyle:{"text-decoration":"line-through"}, //定义完成的样式
            itemStyle:undefined
        }
    },
    created(){
        this.itemStyle=finished?this.doneStyle : this.normalStyle
    },
    unmounted(){

    },
    methods:{
        clickItem(){
            if(this.finished==false){
                //false -> true
                this.finished = true
                this.itemStyle = this.doneStyle
            }
            else{
                //true -> false
                this.finished = false
                this.itemStyle = this.normalStyle
            }
        }
    }
}
</script>

<style>

</style>