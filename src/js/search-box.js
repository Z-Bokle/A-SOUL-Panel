app.component('search-box',{
    data(){
        return{
            
        }
    },
    created(){

    },
    destroyed(){

    },
    methods:{

    },
    template:
    `
    <form action="http://www.baidu.com/s" method="get" target="_self">
    <input type="text" name="wd" maxLength="50" />
    <input type="submit" name="" value="搜索" /> 
    </form>
    `
})