chrome.alarms.create("alarm_1min",{
    delayInMinutes:1,  //在1min后执行alarm
    periodInMinutes:1  //每过1min再次执行alarm
})

chrome.alarms.create("alarm_1hour",{
    delayInMinutes:1,  //在1min后执行alarm
    periodInMinutes:60  //每过1h再次执行alarm
})

chrome.alarms.create("init",{
    when:Date.now()+3  //在3ms后执行alarm
})

//1分钟的alarm用于获取动态、直播信息
//1小时的alarm用于下载天气、壁纸
//init用于service_worker初始化


chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create(
        {
            //打开新标签页
            url:"chrome://newtab/"
        }
    )
})

chrome.runtime.onInstalled.addListener(() => {
    //插件初始化，往storage中存一些必要的初始数据
    console.log("install")
})

chrome.alarms.onAlarm.addListener((alarm) => {
    //alarm参数用于区别不同的alarm
    if(alarm.name=="alarm_1min")
    console.log("1min")

    if(alarm.name=="alarm_1hour")
    console.log("1hour")

    if(alarm.name=="init"){
        //从storage中取出必要的数据
        //执行一次fetch同步所有信息并存放到storage中
        console.log("init")
    }
    
})