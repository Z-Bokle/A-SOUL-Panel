<template>
    
    <select id="select">
    </select>
    <input type="text" id="input" name="text" maxLength="50" class="search-text" />

    <button @click="search" class="search-button">搜索</button>
    
</template>

<script>
export default {
    name:'search-box',
    data(){
        return {
            engineArray:[]
        }
    },
    created(){
        //从storage获取搜索引擎数据
        (async() => {
            try {
                let result = await chrome.storage.sync.get(['engine'])
                this.engineArray = await result['engine']
                let select = document.getElementById('select')

                for(let i=0;i<this.engineArray.length;i++){
                    let engine = await this.engineArray[i]
                    select.options.add(new Option(engine.name,engine.link))
                }          
            } 
            catch (err) {
                console.error("无法获取搜索引擎信息")
            }
        })()
    },
    unmounted(){
        //将搜索引擎数据存储到storage
        (async() => {
            try {          
                await chrome.storage.sync.set({engine:this.engineArray})
            } 
            catch (err) {
                console.error(error)
            }
        })()
    },
    methods:{
        search(){
            let text = document.getElementById('input').value
            let select = document.getElementById('select')
            let selection = select.selectedIndex
            window.open(select.options[selection].value + text,'_self')
        }
    }
}
</script>

<style>
select{
    font-family: "微软雅黑";
    background: rgba(0,0,0,0);
    color: rgb(223, 203, 203);
    border: 1px #1a1a1a solid;
    border-radius: 5px;
}
option{
    color: rgb(68, 71, 71);
    background: rgb(223, 203, 203);
    line-height: 20px;
    opacity: 0.6;  
}
.search-text{
    font-family: "微软雅黑";
    width: 40vw;
    height: 4vh;
    background-color: transparent;
    border:0;
    outline:none;
    border-bottom: 2px solid rgb(21, 14, 14);
    font-size:14px;
    color:rgb(223, 203, 203);
}

.search-button{
    width: 6vw;
    height: 4vh;
    line-height: 4vh;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    font-size: 15px;
    color:rgb(251, 212, 195);
    border-radius:50px;
    background: linear-gradient(to right top, rgba(0,0,0,0.9), rgba(0,0,0,0.6),rgba(0,0,0,0.3),rgba(0,0,0,0.1));
    background-size: 400%;
    /* 透明度0 （完全透明）~ 1（完全不透明） */
    opacity: 0.6;   
    animation: sun 5s infinite;         
}

@keyframes sun{
    100%{
        background-position: -400% 0;
    }
}
</style>