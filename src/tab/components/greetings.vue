<template>
  <span @click="updateGreeting" class="greeting">{{ `${this.greeting} —— ${this.author}` }}</span>
</template>

<script>
export default {
    name:'greeatings',
    data(){
        return {
            greeting:null,
            author:null
        }
    },
    async created(){
        await fetch('https://saying.api.azwcl.com/saying/get')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.greeting=data.data.content
            this.author=data.data.author
        })
        .catch((err) => {
            console.error('greetings' + err)
        })
    },
    methods:{
        async updateGreeting(){
            await fetch('https://saying.api.azwcl.com/saying/get')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.greeting=data.data.content
                this.author=data.data.author
            })
            .catch((err) => {
                console.error('greetings' + err)
                console.info("更新名言需要间隔0.5秒哦")
            })
        }
    }
}
</script>

<style>

.greeting{
    font-size: 2.7vh;
    font-family: HYXuJingXingKaiW;
    color: white;
}

</style>