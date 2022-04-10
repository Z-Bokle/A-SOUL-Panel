<template>
      <span :style=itemStyle>
          <span> {{text}} </span>
          <span v-html="checkBox" @click="clickItem"></span>
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
        done:{//是否完成
            type:String, //html标签传参数似乎总是字符串，使用完整的vue中<template>标签替代template字段可以解决此问题
            default:"false",
            validator: (value) => {
                // 这个值必须匹配下列字符串中的一个
                return ['false', 'true'].indexOf(value) !== -1
            }
        },
    },
    data(){
        return{
            id:null, //以后可能会用的到
            checkBox:null, //checkBox的标签，用于v-html替换
            finished:this.done=="true"? true : false, 
            //由于done是read only的因此后续修改都用finished
            //finished是一个Boolean而done是一个String
            normalStyle:{"text-decoration":"none"}, //定义未完成的样式
            doneStyle:{"text-decoration":"line-through"}, //定义完成的样式
            itemStyle:undefined
        }
    },
    created(){
        this.checkBox = (this.finished) ? "<input type=\"checkbox\" checked=\"checked\" />" : "<input type=\"checkbox\" />"
        this.itemStyle = (this.finished) ? this.doneStyle :this.normalStyle
        //console.info(this.checkBox)
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