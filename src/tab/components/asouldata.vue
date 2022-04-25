<template>
    <el-drawer v-model="drawer" title="A-SOUL的动态与直播" direction="ltr" size="50%">

        <el-carousel interval="4000" height="400px">
            <el-carousel-item v-for="(item,index) in live" :key="index" @click="openTab(item.url)">
                    <el-image :src="item.picUrl" fit="contain" />
            </el-carousel-item>
        </el-carousel>

        <el-divider />

        <el-collapse>
            <el-collapse-item title="直播间信息">
                <el-collapse v-model="activeRef" accordion>
                    <el-collapse-item v-for="(item,index) in live" :key="index" :title="members.find((element) => { return element.rid == item.rid }).cname">
                        <el-descriptions :title="item.title" border>
                            <el-descriptions-item label="标题">
                                {{ item.title }}
                            </el-descriptions-item>

                            <el-descriptions-item label="房间号">
                                {{ item.rid }}
                            </el-descriptions-item>

                            <el-descriptions-item label="直播状态">
                                <el-tag :type=liveMapTag.get(item.status)>
                                    {{ liveMapText.get(item.status) }}
                                </el-tag>
                            </el-descriptions-item>

                            <el-descriptions-item label="关注">
                                {{ item.attention }}
                            </el-descriptions-item>

                            <el-descriptions-item label="人气值(未开播或轮播时可能为0)">
                                {{ item.online }}
                            </el-descriptions-item>

                        </el-descriptions>
                    </el-collapse-item>
                </el-collapse>
            </el-collapse-item>
        </el-collapse>

        <el-divider />

        <el-timeline v-infinite-scroll="load">
            <el-timeline-item v-for="(item,index) in dataArray" :key="index" :timestamp=item.time :icon=item.icon placement="top">
                <el-card @click="openTab(item.url)" style="cursor: pointer;">
                    <template #header>
                        <el-avatar :src="item.headUrl" size="large" />
                        <h4 class="dynamic-title">{{ item.head }}</h4>
                    </template>
                    
                    <p class="dynamic-text">{{ item.text }}</p>

                    <el-image v-if=item.picUrl :src=item.picUrl fit="contain" class="dynamic-image" />

                    <el-divider />

                    <div>
                        <span>浏览 {{ item.view }} / </span>
                        <span>评论 {{ item.comment }} / </span>
                        <span>点赞 {{ item.like }}</span>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-drawer>
</template>

<script>
/*
从上到下是从新到旧
直播间信息展示使用v-for加载6张卡片
注：根据MVC设计原则，获取显示的数据的工作应交给service_worker，通过消息传递将数据传递给组件，这里暂时没时间修改了
*/
import { ref } from 'vue'

export default {
    name:'asouldata',
    data(){
        return{
            activeRef:ref('1'),
            drawer:ref(false),
            dataArray:[],
            rawArray:[], //从fetch API获取到的经过第一次信息提取的序列，每次调用fetchData()都根据时间戳倒序排序
            nextOffsetMin:0, //此轮nextOffset的最小值，0为初始值
            nextOffset:0, //下一轮的nextOffset
            members:[],
            typeMap: new Map([
                [1,"转发"],
                [2,"图片"],
                [4,"文字"],
                [8,"视频"],
                [64,"专栏"]
            ]),
            live:[],
            liveMapText: new Map([
                [0,"未开播"],
                [1,"直播中"],
                [2,"轮播中"]
            ]),
            liveMapTag: new Map([
                [0,"danger"],
                [1,"success"],
                [2,"warning"]
            ])
        }
    },
    mounted(){
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

        this.getMembers()
        try{
            this.updateData()
            // console.log(this.live)
        }    
        catch(err){
            console.error("获取数据失败")
        }

    },
    methods:{
        openWindow(){
            this.drawer = true;
        },
        closeWindow(){
            this.drawer = false;
        },
        async load(){
            //从rawArray处获得足量信息并按时间排序，处理成dataArray的元素后push进去
            if(this.rawArray.length - this.dataArray.length < 32) //剩余不足32项
            try{
                await this.updateData()
            }    
            catch(err){
                console.error("获取数据失败")
            }


            let rawItem = await this.rawArray[this.dataArray.length]
            let member = await this.members.find((element) => { return element.uid == rawItem.uid }) //根据uid查找到成员

            let type = this.typeMap.has(rawItem.type) ? this.typeMap.get(rawItem.type) : "其他"
            this.dataArray.push({
            time: new Date(rawItem.timestamp*1000).Format("yyyy-MM-dd hh:mm:ss"),
            head: `${member.cname}发表了${type}类型的动态`,
            text: rawItem.text? rawItem.text:null,
            picUrl: rawItem.type==1? rawItem.insideObj.picUrl:rawItem.picUrl,
            url: rawItem.url,
            headUrl: rawItem.face,
            like: rawItem.like,
            view: rawItem.view,
            comment: rawItem.comment, //评论
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
                        picUrl:insideContent.item.pictures[0].img_src
                    }
                    else if(content.item.orig_type == 8)
                    insideObj = {
                        type:8,
                        name:insideContent.owner.name,
                        head:insideContent.owner.face,
                        text:insideContent.description,
                        picUrl:insideContent.pic
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
        },
        async getMembers(){
            let result = await chrome.storage.sync.get(['members','live'])
            this.members = await result.members
            this.live = await result.live
        }
    }
}
</script>

<style>
el-carousel-item h3{
    position: absolute;
    top: 60px;
}
el-carousel-item span{
    position: absolute;
}
.dynamic-text{
    font-size: 1.1em;
}
.dynamic-title{
    font-size: 1.8em;
}
.dynamic-image{
    margin-top: 3vh;
}
</style>