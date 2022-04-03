app.component('app',{
    data(){
        return {
            title:"title1",
            visible:false
        }
    },
    methods:{
        close(){
            this.visible=false
        },
        closemodel(e){
            if(this.visible){
                document.querySelector('.app').contains(e.target) ? '' : this.close();
            }
        }
    },
    template:
    `
    <div class="app-main" @click="closemodel">
        <div class="app__wrapper" v-if="visible" >
            <div class="app">

                <div class="app__header" >
                    <div class="app__title">{{ title }}</div>
                </div>
                
                <div class="app__body">
                    <slot></slot>
                </div>

            </div>

            <div class="app-outside">
            
            </div>            

        </div>
        
    </div>
    `
})

function showapp1(){
    vm.$refs.app1.title="app1"
    vm.$refs.app1.visible=true
    //在data()中定义一个专用对象并在这里设置具体要显示的内容等
    //以区别开不同的app
}

function showapp2(){
    vm.$refs.app1.title="app2"
    vm.$refs.app1.visible=true
}