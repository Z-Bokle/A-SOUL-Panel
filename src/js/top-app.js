app.component('app',{
    props:{
        title:String,
        visible:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        close(){
            this.$emit('closeWin',false)
            // console.log('app',this.visible)
        },
        closemodel(e){
            if(this.visible){
                document.querySelector('.app__wrapper').contains(e.target) ? '' : this.close();
                // console.log(document.querySelector('.app__wrapper').contains(e.target))
                // console.log(e);
            }
        }
    },
    template:
    `
    <div class="app-main" @click="closemodel">
    <div class="app__wrapper" v-if="visible" >
        <div class="app">
            <div class="app__header">
                <div class="app__title">{{ title }}</div>
            </div>
            
            <div class="app__body">
                <slot></slot>
            </div>
            
            <div class="app__footer">
                <slot name="footer"></slot>
            </div>
        </div>

    </div>
        <div class="app-outside" v-show="visible">
        {{"这里是窗口外面"}}
        </div>
    </div>
    `
})

app.component('top-app',{
    components:{
        window
    },
    data(){
        return{
            visible:false
        }
    },
    methods:{
        openWindow(){
            this.visible=true
        },
        closeWindow(){
            this.visible=false
            // console.log('top-app',this.visible)
        }
    },
    template:
    `
    <button @click="openWindow" >btn</button>
    <app :visible.sync="visible" title="A Title Here" @closeWin="closeWindow"></app> 
    `
})