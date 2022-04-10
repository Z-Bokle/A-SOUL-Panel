<template>
  <div>{{ data }}</div>
  <div>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</div>
</template>

<script>
export default {
    name:"weather",
    data(){
        return {
            city:null,
            url:null,
            weatherData:undefined
        }
    },
    async created(){
        //该api仍不可靠
        //需要换一种天气展现方式
        await fetch('http://ip-api.com/json')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.city=data.city
        })
        .then(() => {
            //this.url=`https://wttr.in/${this.city}_0tqp_lang=zh_t=150.png`
        })
        .catch((err) => {
            console.error('weather' + err)
        })

        fetch(`https://wttr.in/${this.city}?format=j1`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.weatherData = data
        })
        .catch((err) => {
            console.error('weather' + err)
        })
    }
}
</script>

<style>

</style>