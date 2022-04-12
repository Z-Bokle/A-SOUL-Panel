<template>
    <div @click=clickItem class="shortcut-block" :style=getPositionStyle(index)>
        <div>
            <img :src=icon :style=imgStyle />
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
                height:'48px',
                width:'48px',
            }
        }
    },
    created(){

    },
    methods:{
        clickItem(){
            if(this.link) //链接存在(一般情况只有最后一个addItem的link是null)
            window.open(this.link,"_self")
        },
        getPositionStyle(index){
            /*
            宽度10vw
            高度10vh
            */
           return {
               height:'10vh',
               width:'10vw',
               position:'absolute',
               top:`${parseInt(index/6)*10}vh`,
               left:`${parseInt(index%6)*10}vw`
           }
        }
    }
}
</script>

<style>
.shortcut-block{
    width: 10vw;
    height: 10vh;
    background-color: darkorange;
}
</style>