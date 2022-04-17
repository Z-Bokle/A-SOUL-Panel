<template>
    <div class="app-main" @click="closemodel">
        <div class="app__wrapper" v-if="visible">
            <div class="app">

                <div class="app__header">
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
</template>

<script>
export default {
    name:'appWindow',
    props:{
        title:String
    },
    data(){
        return {
            visible:false,
            inside:{}
        }
    },
    methods:{
        close(){
            this.visible=false
        },
        open(){
            this.visible=true
        },
        closemodel(e){
            if(this.visible){
                document.querySelector('.app').contains(e.target) ? '' : this.close();
            }
        }
    }
}
</script>

<style>
.app{ 
    z-index: 1000;
    background-color: coral;  
    left: 30vw;
    top: 10vh;
    width: 40vw;
    height: 50vh;
    position: absolute;
}
.app__wrapper{
    z-index: 999;
    position: fixed;
    width: 100vw;
    height: 94vh;
    top: 6vh;
    left: 0%;
}
.app__header{
    background-color: darkgoldenrod;
    height: 4vh;
    width: inherit;
    
}
.app__body{
    background-color: aliceblue;
    height: 46vh;
    width: inherit;
    
}
.app-outside{
    background-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    height: 94vh;
    width: 100vw;
}
</style>