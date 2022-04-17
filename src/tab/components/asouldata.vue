<template>
    <el-drawer v-model="drawer" title="A-SOUL的动态与直播" direction="ltr" size="50%">
        <el-card>
            这里展示直播间信息
        </el-card>

        <el-divider />

        <el-timeline v-infinite-scroll="load">
            <el-timeline-item v-for="(item,index) in dataArray" :key="index" :timestamp=item.time :icon=item.icon placement="top">
                <el-card @click="openTab(item.url)">
                    <el-avatar :src="item.headUrl" />
                    <h4>{{ item.head }}</h4>
                    <p>{{ item.text }}</p>

                    <!-- <el-card v-show="item.insideObj">
                        <el-avatar :src="item.insideObj.head" />
                        <h3>{{ item.insideObj.name }}</h3>
                        <p>{{ item.insideObj.text }}</p>
                        <el-image v-show="item.insideObj.pinUrl" :src=item.insideObj.picUrl fit="contain" />
                    </el-card> -->

                    <span>浏览 {{ item.view }} / </span>
                    <span>评论 {{ item.comment }} / </span>
                    <span>点赞 {{ item.like }}</span>
                    <el-image v-if=item.withPic :src=item.picUrl fit="contain" />
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
</template>

<script>
/*
从上到下是从新到旧
直播间信息展示使用v-for加载6张卡片
*/
import { ref } from 'vue'
export default {
    name:'asouldata',
    data(){
        return{
            drawer:ref(false),
            dataArray:[],
            rawArray:[], //从fetch API获取到的经过第一次信息提取的序列，每次调用fetchData()都根据时间戳倒序排序
            nextOffsetMin:0, //此轮nextOffset的最小值，0为初始值
            nextOffset:0, //下一轮的nextOffset
            typeMap: new Map([
                [1,"转发"],
                [2,"图片"],
                [4,"文字"],
                [8,"视频"],
                [64,"专栏"]
            ]),
            members:[
                {name:'ava',cname:"向晚",rid:22625025,uid:672346917},
                {name:'bella',cname:"贝拉",rid:22632424,uid:672353429},
                {name:'carol',cname:"珈乐",rid:22634198,uid:351609538},
                {name:'diana',cname:"嘉然",rid:22637261,uid:672328094},
                {name:'eileen',cname:"乃琳",rid:22625027,uid:672342685},
                {name:'asoul',cname:"官号",rid:22632157,uid:703007996}
            ]
        }
    },
    created() {
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        this.updateData()
    },
    methods:{
        openWindow(){
            this.drawer = true;
        },
        closeWindow(){
            this.drawer = false;
        },
        load(){
            //从rawArray处获得足量信息并按时间排序，处理成dataArray的元素后push进去
            if(this.rawArray.length - this.dataArray.length < 32) //剩余不足32项
            this.updateData()

            // console.log("rawArr",this.rawArray)

            let rawItem = this.rawArray[this.dataArray.length]
            let name = this.members.find((element, index, array) => { element.uid == rawItem.uid }).name
            let type = this.typeMap.has(rawItem.type) ? this.typeMap.get(rawItem.type) : "其他"
            this.dataArray.push({
                time:new Date(rawItem.timestamp*1000).Format("yyyy-MM-dd hh:mm:ss"), //时间戳
                head:`${name}发表了${type}类型的动态`, //标题
                text:rawItem.text ? rawItem.text : null, //内容
                withPic:rawItem.picUrl ? true : false, //带图片
                picUrl:rawItem.picUrl, //图片链接
                url:rawItem.url, //卡片点击链接
                headUrl:rawItem.face, //头像链接
                like:rawItem.like, //点赞
                view:rawItem.view, //浏览
                comment:rawItem.comment, //评论
                insideObj:rawItem.insideObj
            })
        },
        openTab(url){
            window.open(url)
        },
        async translateObj1(data){
            //从service_worker那里copy过来的，已经魔改
            this.nextOffsetMin = this.nextOffsetMin == 0 ? data.data.next_offset : Math.min(this.nextOffsetMin,data.data.next_offset)
            let dynamics = await data.data.cards
            let arrayObj = []
            for(let i=0;i<dynamics.length;i++)
            {
                let dynamic = await dynamics[i]
                let content = await JSON.parse(dynamic.card)
                let type = await dynamic.desc.type
                let saveObj = null
                let insideObj = null
                if(type == 1){
                    let insideContent = JSON.parse(content.origin)
                    if(content.item.orig_type == 4)
                    insideObj = {
                        type:4,
                        name:insideContent.user.name,
                        head:insideContent.user.headUrl,
                        text:insideContent.item.content
                    }
                    else if(content.item.orig_type == 2)
                    insideObj = {
                        type:2,
                        name:insideContent.user.name,
                        head:insideContent.user.headUrl,
                        text:insideContent.item.content,
                        picUrl:insideContent.item.pictures[0]
                    }
                    else insideObj = null
                }
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
                            url:`https://t.bilibili.com/${dynamic.desc.dynamic_id_str}`, //链接
                            insideObj:insideObj
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
                arrayObj.push(saveObj)          
            }
            return arrayObj
        },
        async fetchData(){
            let result = await chrome.storage.sync.get(['members'])
            let members = await result.members
            //请不要使用forEach!!!!!!!
            //forEach内部使用任何异步编程相关代码都会导致未知的错误
            //使用async/await更是直接打包失败
            for(let i=0;i<members.length;i++){
                let member = await members[i]
                let res = await fetch(`https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=${member.uid}&offset_dynamic_id=${this.nextOffset}`)
                let data = await res.json()
                let arrayObj = await this.translateObj1(data)
                this.rawArray = [...this.rawArray,...arrayObj] //合并数组
                await this.sortData()
                // console.log("afterConcat",this.rawArray)
            }
        },
        async sortData(){
            //去重
            this.rawArray = Array.from(new Set(this.rawArray))            
            //按照时间戳排序
            this.rawArray.sort((a,b) => { return b.timestamp-a.timestamp })
        },
        async updateData(){
            await this.fetchData()
            this.nextOffset = this.nextOffsetMin
            this.nextOffsetMin = 0
        }
    }
}
</script>

<style>

</style>