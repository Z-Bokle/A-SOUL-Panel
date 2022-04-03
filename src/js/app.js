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


app.component('to-do',{
    data(){
        return{
            todoArray:[]
        }
    },
    created(){

    },
    destroyed(){

    },
    methods:{

    },
    template:``
})

app.component('to-do-item',{
    data(){
        return{
            text:null,//文字描述
            done:true,//是否完成
            id:null
        }
    },
    created(){

    },
    destroyed(){

    },
    methods:{

    },
    template:`<input type="comboBox" checked="done"/>
    {{text}}
    `
})


