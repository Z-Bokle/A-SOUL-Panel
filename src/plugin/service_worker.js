
chrome.alarms.create("alarm_1min",{
    delayInMinutes:1,  //在1min后执行alarm
    periodInMinutes:1  //每过1min再次执行alarm
})

chrome.alarms.create("alarm_1hour",{
    delayInMinutes:1,  //在1min后执行alarm
    periodInMinutes:60  //每过1h再次执行alarm
})

chrome.alarms.create("init",{
    when:Date.now()+1000  //在1s后执行alarm
})


// chrome.action.onClicked.addListener((tab) => {
//     chrome.tabs.create(
//         {
//             //打开新标签页
//             url:"chrome://newtab/"
//         }
//     )
// })

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        members:[
            {name:'ava',cname:"向晚",rid:22625025,uid:672346917},
            {name:'bella',cname:"贝拉",rid:22632424,uid:672353429},
            {name:'carol',cname:"珈乐",rid:22634198,uid:351609538},
            {name:'diana',cname:"嘉然",rid:22637261,uid:672328094},
            {name:'eileen',cname:"乃琳",rid:22625027,uid:672342685},
            {name:'asoul',cname:"官号",rid:22632157,uid:703007996}
        ],
        live:[],
        recent_dynamic:[]
    },() => {
        console.log("install")
    })
    //插件初始化，往storage中存一些必要的初始数据
    //如默认设置、直播房间号、UID、Todo信息、Shortcut信息等
})

chrome.alarms.onAlarm.addListener((alarm) => {
    
    
    //将fetch得到的对象转换为待存储的对象
    async function translateObj1(data){
        let dynamic = await data.data.cards[0]
        let content = await JSON.parse(dynamic.card)
        let type = await dynamic.desc.type
        let saveObj = null
        switch (type) {
            case 1://转发
                saveObj={
                    type:type, //类型
                    uid:dynamic.desc.uid, //uid
                    comment:dynamic.desc.comment, //评论
                    like:dynamic.desc.like, //点赞
                    view:dynamic.desc.view, //浏览
                    face:dynamic.desc.user_profile.info.face, //头像
                    text:content.item.content , //文本
                    timestamp:dynamic.desc.timestamp, //时间戳
                    url:`https://t.bilibili.com/${dynamic.desc.dynamic_id_str}` //链接
                }
                break;
            case 2://图片
                saveObj={
                    type:type, //类型
                    uid:dynamic.desc.uid, //uid
                    comment:dynamic.desc.comment, //评论
                    like:dynamic.desc.like, //点赞
                    view:dynamic.desc.view, //浏览
                    face:dynamic.desc.user_profile.info.face, //头像
                    text:content.item.description , //文本
                    timestamp:dynamic.desc.timestamp, //时间戳
                    picUrl:content.item.pictures[0].img_src, //图片链接
                    url:`https://t.bilibili.com/${dynamic.desc.dynamic_id_str}` //链接
                }
                break;
            case 4://文字
                saveObj={
                    type:type, //类型
                    uid:dynamic.desc.uid, //uid
                    comment:dynamic.desc.comment, //评论
                    like:dynamic.desc.like, //点赞
                    view:dynamic.desc.view, //浏览
                    face:dynamic.desc.user_profile.info.face, //头像
                    text:content.item.content , //文本
                    timestamp:content.item.timestamp, //时间戳
                    url:`https://t.bilibili.com/${dynamic.desc.dynamic_id_str}` //链接
                }
                break;
            case 8://视频
                saveObj={
                    type:type, //类型
                    uid:dynamic.desc.uid, //uid
                    comment:content.stat.reply, //评论
                    like:dynamic.desc.like, //点赞
                    view:content.stat.view, //浏览
                    face:dynamic.desc.user_profile.info.face, //头像
                    title:content.title, //标题
                    text:content.desc, //文本
                    timestamp:content.pubdate, //时间戳-发布时间
                    picUrl:content.pic, //图片链接
                    url:content.short_link //链接
                }
                break;
            case 64://专栏
                saveObj={
                    type:type, //类型
                    uid:dynamic.desc.uid, //uid
                    comment:dynamic.desc.comment, //评论
                    like:dynamic.desc.like, //点赞
                    view:dynamic.desc.view, //浏览
                    face:dynamic.desc.user_profile.info.face, //头像
                    title:content.title, //标题
                    text:content.summary , //文本
                    timestamp:content.publish_time, //时间戳-发布时间
                    picUrl:content.image_urls[0], //图片链接
                    url:`https://t.bilibili.com/${dynamic.desc.dynamic_id_str}` //链接
                }
                break;
            default://其他
                saveObj={
                    type:type, //类型
                    uid:dynamic.desc.uid, //uid
                    comment:dynamic.desc.comment, //评论
                    like:dynamic.desc.like, //点赞
                    view:dynamic.desc.view, //浏览
                    face:dynamic.desc.user_profile.info.face, //头像
                    url:`https://t.bilibili.com/${dynamic.desc.dynamic_id_str}` //链接
                }
                break;
        }
        return saveObj
    }
    async function translateObj2(data){
        return {
            title:data.data.title, //标题
            status:data.data.live_status, //状态 0停播 1开播 2轮播
            url:`https://live.bilibili.com/${data.data.room_id}`, //链接
            picUrl:data.data.user_cover, //封面
            rid:data.data.room_id, //房间号
            attention:data.data.attention, //关注
            online:data.data.online //人气值(未开播时可能为0)
        }
    }

    //alarm参数用于区别不同的alarm
    //1min已经实现了新动态、开播的提醒，有空调用notification API实现通知--------------------------------------------------------------------------------------------------------------
    if(alarm.name=="alarm_1min")
    {
        console.log("1min") 
        //1分钟的alarm用于获取获取直播信息和最新一条动态并存入storage
        let recent_dynamic=[] //存储最近动态
        let live=[] //存储直播间信息
        async function updateData(){
            let result = await chrome.storage.sync.get(['members','live','recent_dynamic'])
            let members = await result.members
            let live_old = await result.live
            let recent_dynamic_old = await result.recent_dynamic
            
            //请不要使用forEach!!!!!!!
            //forEach内部使用任何异步编程相关代码都会导致未知的错误
            //使用async/await更是直接打包失败
            for(let i=0;i<members.length;i++){
                let member = await members[i]
                let res1 = await fetch(`https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=${member.uid}&offset_dynamic_id=0`) //最新动态
                let res2 = await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?id=${member.rid}`) //直播间信息
                let data1 = await res1.json()
                let data2 = await res2.json()
                let saveObj1 = await translateObj1(data1)
                let saveObj2 = await translateObj2(data2)
                recent_dynamic.push(saveObj1)
                live.push(saveObj2)
            }
            return {live_old,recent_dynamic_old};
        }

        async function sort(old){
            recent_dynamic.sort((a, b) => { return a.uid - b.uid })
            old.recent_dynamic_old.sort((a,b) => { return a.uid-b.uid })
            live.sort((a,b) => { return a.rid-b.rid })
            old.live_old.sort((a,b) => { return a.rid-b.rid }) 
            return {'live_old':old.live_old,'recent_dynamic_old':old.recent_dynamic_old}
        }

        async function compare(old){
            let update = [] //动态有更新的名单(下标)
            let startLive = [] //在此刻开播的名单(下标)
            for(let i=0;i<6;i++){
                if(old.recent_dynamic_old[i].timestamp < recent_dynamic[i].timestamp)
                update.push(i)
                if(old.live_old[i].status != 1 && live[i].status == 1)
                startLive.push(i)
            }
            return {'update':update,'startLive':startLive}
        }

        async function checkData(){
            let oldData1 = await updateData()
            let oldData2 = await sort(oldData1)
            let list = await compare(oldData2)

            for(let i=0;i<list.update.length;i++)
            console.log("动态更新",recent_dynamic[list.update[i]])
            for (let i = 0; i < list.startLive.length; i++) 
            console.log("开始直播",live[list.startLive[i]])

            // console.log("beforeSave",recent_dynamic,live)
            let save = await chrome.storage.sync.set({'recent_dynamic':recent_dynamic,'live':live})
        }
        
        checkData()

    }
    

    if(alarm.name=="alarm_1hour")
    {
        console.log("1hour")
        //1小时的alarm用于获取天气信息并存入storage
    }
    

    if(alarm.name=="init"){
        console.log("init")
        //init用于service_worker初始化
        //从storage中取出必要的数据(直播房间号、UID)
        //执行一次fetch同步所有信息并存放到storage中
        let recent_dynamic=[] //存储最近动态
        let live=[] //存储直播间信息

        async function fetchData(){
            let result = await chrome.storage.sync.get(['members'])
            let members = await result.members
            //请不要使用forEach!!!!!!!
            //forEach内部使用任何异步编程相关代码都会导致未知的错误
            //使用async/await更是直接打包失败
            for(let i=0;i<members.length;i++){
                let member = await members[i]
                let res1 = await fetch(`https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=${member.uid}&offset_dynamic_id=0`) //最新动态
                let res2 = await fetch(`https://api.live.bilibili.com/room/v1/Room/get_info?id=${member.rid}`) //直播间信息
                let data1 = await res1.json()
                let data2 = await res2.json()
                let saveObj1 = await translateObj1(data1)
                let saveObj2 = await translateObj2(data2)
                recent_dynamic.push(saveObj1)
                live.push(saveObj2)
            }
        }

        fetchData()
        .then(() => {
            chrome.storage.sync.set({
            'recent_dynamic':recent_dynamic,
            'live':live
            })
        })


    }
    
})