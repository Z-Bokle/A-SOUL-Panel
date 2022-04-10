<template>
  <div>{{ data }}</div>
  <div class="container">
      <div class="sunny"></div>
  </div>

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
            this.weatherData=data
        })
        .catch((err) => {
            console.error('weather' + err)
        })
    }
}
</script>

<style>
.container{
    width: 170px;
    height: 170px;
    position: relative;
    margin: 250px auto;
    background-color: rgba(73, 74, 95, 1);
}
.sunny{
    width: 20px;
    height: 140px;
    position: absolute;
    top: 20px;
    left: 90px;
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    animation: sunny 15s linear infinite;
}

@keyframes sunny {
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.sunny::before{
    content: '';
    width: 20px;
    height: 140px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    transform: rotate(90deg)
}
.sunny::after{
    content: '';
    width: 80px;
    height: 80px;
    position: absolute;
    top: 30px;
    left: -30px;
    background: #ffee44;
    border-radius: 50%;
    box-shadow: rgba(255,255,0,0.2) 0 0 0 15px;
}
</style>