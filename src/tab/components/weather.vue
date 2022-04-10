<template>
  <img :src=url />
</template>

<script>
export default {
    name:"weather",
    data(){
        return {
            ip:undefined,
            url:null,
        }
    },
    async created(){
        await (this.ip="112.10.222.63")//替换为通过api获取的ip
        await (this.url=`https://wttr.in/@${this.ip}_0tqp_lang=zh_t=150.png`)
    }
}
</script>

<style>

</style>