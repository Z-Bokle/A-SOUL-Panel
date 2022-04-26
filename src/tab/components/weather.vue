<template>
    <el-popover trigger="hover" width="400" placement="bottom-end">
        <template #reference>
            <div v-show="weatherData" @click="openWindow(weatherData.fxLink)" class="weather-container">
                <div v-html="iconHtml" v-if="weatherData"></div>
            </div>
        </template>
        <div>
            <div v-show="weatherData" class="weather-container">
                <div v-html="iconHtml"></div>
            </div>
            <el-descriptions title="天气信息" border>
                <el-descriptions-item>
                    <template #label>温度/摄氏度</template>
                    {{ temp }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>体感温度/摄氏度</template>
                    {{ feelsLike }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>天气情况</template>
                    {{ text }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>风向</template>
                    {{ windDir }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>风力等级</template>
                    {{ windScale }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>相对湿度/%</template>
                    {{ humidity }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>能见度/公里</template>
                    {{vis}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>数据来源</template>
                    和风天气Web API
                </el-descriptions-item>
            </el-descriptions>
            点击图标访问详细信息
        </div>
    </el-popover>
</template>

<script>
    import {
        ElNotification
    } from 'element-plus'
    import '../weather.css'
    export default {
        name: "weather",
        data() {
            return {
                latitude: null, //纬度
                longitude: null, //经度
                weatherData: undefined,
                key: '0fe375b2b1734f35ac1a14c1b9582c14', //和风天气Web API Key，需要自己申请免费、付费使用
                //实际应用时应将key部署在代理服务器上，通过代理获取天气信息，以达到隐藏key的目的
                //该key仅用于测试，访问次数上限为 1000次/天
                iconHtml: null,
                //-----天气详细信息-----
                temp: null,
                feelsLike: null,
                text: null,
                windDir: null,
                windScale: null,
                humidity: null,
                vis: null
                //-----天气详细信息-----
            }
        },
        mounted() {
            navigator.geolocation.getCurrentPosition((position) => {
                    //定位成功
                    this.latitude = this.processPosition(position.coords.latitude);
                    this.longitude = this.processPosition(position.coords.longitude);
                    (async () => {
                        this.weatherData = await this.fetchWeather(this.latitude, this.longitude, this.key)
                        this.temp = this.weatherData.now.temp
                        this.feelsLike = this.weatherData.now.feelsLike
                        this.text = this.weatherData.now.text
                        this.windDir = this.weatherData.now.windDir
                        this.windScale = this.weatherData.now.windScale
                        this.humidity = this.weatherData.now.humidity
                        this.vis = this.weatherData.now.vis
                        // console.log(this.weatherData)
                        if (this.weatherData) await this.setIcon()
                        // console.log(this.weatherData)
                    })()

                },
                (positionError) => {
                    //定位失败
                    if (positionError.code === positionError.PERMISSION_DENIED)
                        ElNotification({
                            title: '获取地理位置失败',
                            message: positionError.message + '\n用户拒绝了地理位置信息访问',
                            type: 'error'
                        })
                    if (positionError.code === positionError.POSITION_UNAVAILABLE)
                        ElNotification({
                            title: '获取地理位置失败',
                            message: positionError.message + '\n系统无法获取地理位置，请检查网络',
                            type: 'error'
                        })
                    //Time out的情况不会发生，因为默认时间限制为2^32-1秒
                })
        },
        methods: {
            openWindow(url) {
                window.open(url)
            },
            processPosition(num) {
                //对经纬度进行数值处理，保留两位小数，以适配API要求
                return Math.round(num * 100) / 100
            },
            async fetchWeather(latitude, longitude, key) {
                let res = await fetch(
                    `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=${key}`)
                let data = await res.json()
                if (data.code == '200') return data
                else {
                    ElNotification({
                        title: '获取天气信息失败',
                        message: '错误代码' + data.code.toString(),
                        type: 'error'
                    })
                    return null
                }
            },
            async setIcon() {
                console.log('icon', this.weatherData.now.icon)
                let iconNum = Number(this.weatherData.now.icon)
                switch (iconNum) {
                    case 100:
                    case 150:
                        this.iconHtml = //晴
                            `
                    <div class="sunny">
                        <div class="sun">
                            <div class="rays"></div>
                        </div>
                    </div>
                    `
                        break;
                    case 101:
                    case 102:
                    case 103:
                    case 151:
                    case 152:
                    case 153:
                        this.iconHtml = //多云
                            `
                    <div class="shower">
                        <div class="cloud"></div>
                        <div class="sun">
                            <div class="rays"></div>
                        </div>
                    </div>
                    `
                        break;
                    case 104:
                    case 154:
                        this.iconHtml = //阴
                            `
                    <div class="cloudy">
                        <div class="cloud"></div>
                        <div class="cloud"></div>
                    </div>
                    `
                        break;
                    case 300:
                    case 301:
                    case 305:
                    case 306:
                    case 307:
                    case 308:
                    case 309:
                    case 310:
                    case 311:
                    case 312:
                    case 313:
                    case 314:
                    case 315:
                    case 316:
                    case 317:
                    case 318:
                    case 350:
                    case 351:
                    case 399:
                        this.iconHtml = //雨
                            `
                    <div class="rainy">
                        <div class="cloud"></div>
                        <div class="rain"></div>
                    </div>
                    `
                        break;
                    case 302:
                    case 303:
                    case 304:
                        this.iconHtml = //雷
                            `
                    <div class="thunder-storm">
                        <div class="cloud"></div>
                        <div class="lightning">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    `
                        break;
                    case 400:
                    case 401:
                    case 402:
                    case 403:
                    case 404:
                    case 405:
                    case 406:
                    case 407:
                    case 408:
                    case 409:
                    case 410:
                    case 456:
                    case 457:
                    case 499:
                        this.iconHtml = //雪
                            `
                    <div class="snowy">
                        <div class="cloud"></div>
                        <div class="snow">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    `
                        break;
                    default:
                        this.iconHtml = //缺少图标
                            `
                    <h6>天气图标缺失😭</h6>
                    `
                        break;
                }
            }
        }
    }
</script>

<style>

</style>