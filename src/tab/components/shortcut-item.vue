<template>
    <div @click=clickItem class="shortcut-block">
        <div class="item-icon">
            <el-avatar :src=icon :style=imgStyle draggable="false"/>
        </div>
        <div class="item-text">
            <span> {{ text }} </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'shortcut-item',
    props:{
        link:{
            type:String,
            default:"chrome://newtab"
        },
        text:{
            type:String,
            default:""
        },
        index:{
            type:Number,
            required:true
        },
        icon:{
            type:String,
            default:"./assets/icons/512.png"
        }
    },
    data(){
        return {
            //iconUrl:icon,//图标url地址
            imgStyle:{
                height:'5vh',
                width:'5vh'//相对大小通过客户端高度获取
            }
        }
    },
    created(){

    },
    methods:{
        clickItem(){
            if(this.link) //链接存在(一般情况只有最后一个addItem的link是null)
            window.open(this.link,"_self")
        }
    }
}//完成一下动画以及todo中的功能
</script>

<style>
.shortcut-block{
    width: 10vw;
    height: 10vh;
    background: rgba(255,255,255,0);
    backdrop-filter: blur(10px); 
    border-radius: 15px;
}
.item-text{
    margin-top: 0.9vh;
    font-family: MiSans;
    font-size: 2vh;
    color:whitesmoke;
}
.item-icon{
    margin-top: 0.8vh;
}
</style>