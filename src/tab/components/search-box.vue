<template>
    <form action="http://www.baidu.com/s" method="get" target="_self">
    <input type="text" name="wd" maxLength="50" class="search_text" />
    <input type="submit" name="" value="搜索" class="search_button" /> 
    </form>
</template>

<script>
export default {
    name:'search-box'
}
</script>

<style>
.search_text{
    width: 15vw;
    height: 4vh;
    background-color: transparent;
    border:0;
    outline:none;
    border-bottom: 2px solid #fff;
    font-size:12px;
    color:#000;
}

.search_button{
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
    background: linear-gradient(to right top, #fb0505, #0418fa,#effb05,rgb(5, 251, 34));
    background-size: 400%;
    /* 透明度0 （完全透明）~ 1（完全不透明） */
    /* opacity: 0.6;   */
    animation: sun 5s infinite;        
}

@keyframes sun{
    100%{
        background-position: -400% 0;
    }
}
</style>