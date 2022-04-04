let globalConfig = {
    data() {
        return {
            hhmmss: "hh:mm:ss"
            //全局变量
        }
    },
    methods: {
        //全局方法
    }
}
const app = Vue.createApp(globalConfig)

/*
类似Content对象
通过访问app对象来取出、修改全局变量或调用全局方法
此法访问的变量和方法只能在app.mount()方法执行后生效
因此无法在组件中直接使用
*/

/* 
由于项目结构简单，所有组件均为全局组件
*/


app.component('todo-list',{
    data(){
        return{
            todoArray:[],
            rowHtml:null
        }
    },
    created(){
        //从插件存储api取出todoArray
    },
    destroyed(){
        //将todoArray保存到插件存储api
        //仅保存未被标记完成的项目
    },
    methods:{

    },
    template:
    `
    <div>
    <div v-html=rowHtml></div>
    </div>
    `
})

//todo-item基本完成了
//接下来实现todo-list并以子组件的形式嵌入todo-item
//每次增删改查todoArray后都执行一个函数以重新设置rowHtml，重新渲染列表
//rowHtml中每个<todo-item></todo-item>外套一层<div></div>实现换行

app.component('todo-item',{
    props:{
        text:{//文字描述
            type:String,
            required:true
        },
        done:{//是否完成
            type:String, //html标签传参数似乎总是字符串
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
        this.checkBox = (this.finished == true) ? "<input type=\"checkbox\" checked=\"checked\" />" : "<input type=\"checkbox\" />"
        this.itemStyle = (this.finished == true) ? this.doneStyle :this.normalStyle
        //console.info(this.checkBox)
    },
    destroyed(){

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
    },
    template:
    `
    <span :style=itemStyle>
    <span> {{text}} </span>
    <span v-html="checkBox" @click="clickItem"></span>
    </span>
    `
})


