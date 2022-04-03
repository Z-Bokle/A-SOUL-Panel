//注册clock组件
app.component('clock', {
    data() {
        return {
            timeFormat: "hh:mm:ss",
            dateFormat: "yyyy-MM-dd",
            time: null,
            date: null,
            timerID: ""
        }
    },
    created() {
        this.time = (new Date()).Format(this.timeFormat)
        this.date = (new Date()).Format(this.dateFormat)
        this.timerID = setInterval(() => {this.nextTime()}, 100); //每0.1秒更新一次时间
    },
    destroyed() {
        clearInterval(this.timerID);
    },
    methods: {
        nextTime() {
            this.time = (new Date()).Format(this.timeFormat)
            this.date = (new Date()).Format(this.dateFormat)
        },
    },
    template: `
    <h2> {{time}} </h2>
    <h3> {{date}} </h3>
    `
})