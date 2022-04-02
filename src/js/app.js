let globalConfig = {
    data() {
        return {
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

//注册clock组件
app.component('clock', {
    data() {
        return {
            timeFormat: "hh:mm:ss",
            time: "00:00:00",
            timerID: ""
        }
    },
    created() {
        this.time = (new Date()).Format(this.timeFormat)
        this.timerID = setInterval(() => {this.nextTime()}, 100);//每0.1秒更新一次时间
    },
    destroyed() {
        clearInterval(this.timerID);
    },
    methods: {
        nextTime() {
            this.time = (new Date()).Format(this.timeFormat)
        }
    },
    template: '<h3> {{time}} </h3>'
})


//开始加载
app.mount('#main-view')