<template>
  <div class="backgrounds" :style="bgStyle"></div>
</template>

<script>


export default {
    name:'backgrounds',
    data(){
        return {
            picUrl:null,
            bgStyle:undefined
        }
    },
    async created(){
        await fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.picUrl='https://cn.bing.com' + data.images[0].url
            this.bgStyle={"background-image":`url(${this.picUrl})`}
        })
        .catch((err) => {
            console.error('backgrounds' + err)
        })
    }
}
</script>

<style>
.backgrounds{
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: -99999;
}
</style>