<template>
    <div @click=clickItem class="shortcut-block">
        <div>
            <img :src=icon :style=imgStyle draggable="false"/>
        </div>
        <div>
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
            required:true
        },
        index:{
            type:Number,
            required:true
        }
    },
    data(){
        return {
            icon:"./assets/icons/512.png",//图标url地址
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
    background-color: darkorange;
}
</style>