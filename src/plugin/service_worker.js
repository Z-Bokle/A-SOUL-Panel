chrome.alarms.create("alarm_1min",{
    delayInMinutes:1,  //在1min后执行alarm
    periodInMinutes:1  //每过1min再次执行alarm
})



//1分钟的alarm用于获取动态、直播信息
//1天的alarm用于下载天气、壁纸

chrome.runtime.onInstalled.addListener(() => {
    //插件初始化，往storage中存一些必要的初始数据
    console.log("installing...")
})

chrome.alarms.onAlarm.addListener((alarm) => {
    //alarm参数用于区别不同的alarm
    console.log(alarm)
})