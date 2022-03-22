<template>
    <div class="sharePop">
        <div class="countdownicon" v-if="countdownIcon">
            <div :class="[countdownNum]"></div>
        </div>
        <div class="ing" v-if="RedRainPopStatus">
            <div class="rain-wrapper" ref="rain" :time="5">
                <div ref="rainBox" id="rainBox" class="rainBox">
                    <rain-point v-for="(item, idx) in rains" :key="`rain-point-${idx}`" :ref="`rain-point-${idx}`"
                        @rainPoinclick="rainPoinclick"></rain-point>
                </div>
            </div>
        </div>
        <div class="toPop" v-if="toPop" @click="toDownloadApp()">
            <div></div>
        </div>
    </div>
</template>

<script>
    import storage from '@/mixin/storage.js'
    import rainPoint from "../components/global/tpl.vue";
    import countdown from "../components/global/countdown";
    export default {
        name: 'sharePop',
        props: {
            density: {
                // 雨点创建速度
                type: Number,
                default: 500
            },
            delay: {
                // 雨点时长
                type: Number,
                default: 4
            },
            time: {
                // 动画时长(秒)
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                RedRainPopStatus: false, //红包雨弹窗状态 1:等待活动开始，2:倒计时，3:活动进行页，4:此次结束，5:今日所有活动都已结束
                countdownNum: 'three', //倒计时icon
                countdownIcon: false,
                count: 0, // 点击统计
                rains: [], // 组件列表
                rainsCount: 0, // 组件下标
                createTimer: null, // 创建雨点计时器
                flag: true, // 是否结束
                rainPointXList: [0.1, 0.4, 0.7, 0.3, 0.6, 0.8, 0.2, 0.4, 0.5, 0.8, 0.2, 0.1, 0.8, 0.1, 0.4, 0.7, 0.3,
                    0.6, 0.8, 0.2, 0.4, 0.5, 0.8, 0.2, 0.1, 1
                ], //雨点的x坐标List
                rainPointI: 0, //雨点x坐标的i
                toPop: false,
            }
        },
        components: {
            rainPoint
        },
        watch: {},
        created() {},
        methods: {
            toDownloadApp(){
                setTimeout(() => {
                    window.location.href = 'https://'+storage.data().SHARE_LINK_DOMAIN+'/2021/app/download.html?channelCode=New+Year&url=https%3A%2F%2Fwww1.pconline.com.cn%2F'+storage.data().OPENINSTALL_LINK+'zt%2Fact%2Fyear%2F202111%2Fapp-wap%2Findex.html%23%2Factivitycenter%3Fbrowser%3DcommonWebView%26fromWx%3D1';
                }, 1000);
            },
            countdownNumFun() {
                window.clearTimeout(this.countdownNumTimeout3);
                window.clearTimeout(this.countdownNumTimeout2);
                window.clearTimeout(this.countdownNumTimeout1);
                this.countdownIcon = true;
                this.countdownNumTimeout3 = setTimeout(() => {
                    this.countdownNum = 'two';
                    this.countdownNumTimeout2 = setTimeout(() => {
                        this.countdownNum = 'one';
                        this.countdownNumTimeout1 = setTimeout(() => {
                            this.countdownIcon = false;
                            this.RedRainPopStatus = true;
                            this.start();
                        }, 1000);
                    }, 1000);
                }, 1000);
            },
            // 结束后回调
            timeoutCallback() {
                this.$emit('timeoutCallback', this.count)
            },

            // 点击雨点
            rainPoinclick() {
                this.stop();
                this.toPop= true;
            },

            // 生成随机起始与落点坐标
            grid() {
                this.rainPointI = parseInt(this.rainPointI) + 1
                let [startX, startY, endX, endY] = [0, 0, 0, 0]
                let rects = document.documentElement.getBoundingClientRect()
                let randomNum = this.rainPointXList[this.rainPointI]
                startX = randomNum * (rects.width - 20)
                startY = -20
                endX = randomNum * (rects.width - 20)
                endY = rects.width

                return {
                    startX,
                    startY,
                    endX,
                    endY
                }
            },

            // 随机速度曲线值
            newCubicBezier() {
                // let arr = ['.5,.5,.5,.5', '.5,.5,.5,.5', '.5,.5,.5,.5', ] // 快 中 慢 
                // // let idx = parseInt(Math.random() * 10) > 2 ? 0 : 1
                // let idx = parseInt(Math.random() * 3)
                return '.5,.5,.5,.5'
            },

            // 创建雨点
            async create(rainscount) {

                // 生成Dom
                this.rains.push(`rain-point-${rainscount}`)

                // 生成坐标
                let rects = await this.grid();

                // 渲染完成后执行
                await this.$nextTick(async function () {
                    // Dom节点
                    let el = this.$refs[`rain-point-${rainscount}`][0];

                    let initStyleText = {
                        'transform': `translate(${rects.startX}px, ${rects.startY}px)`
                    }
                    let actionStyleText = {
                        'transition': `transform ${this.delay}s cubic-bezier(${ this.newCubicBezier() })`,
                        'transform': `translate(${rects.endX}px, ${rects.endY}px)`
                    }

                    // 设置初始坐标
                    await el.setStyle(initStyleText);
                    // 设置结束坐标
                    await setTimeout(() => {
                        el.setStyle(actionStyleText)
                    }, 50)
                    // 动画结束
                    el.$el.addEventListener('transitionend', el.destory, false);
                })
            },

            // 执行
            start() {
                this.clear()
                // 开启雨点点击
                this.flag = true
                // 重置点击数
                this.count = 0
                // 清除动画定时器
                countdown.clearAssignTimer('rain')
                // 动画定时器
                countdown.creatTimer({
                    remainTime: parseInt(this.time) * 1000,
                    label: 'rain',
                    timeoutFn: () => {
                        this.clear()
                        this.timeoutCallback()
                    }
                })
                this.rainPointI = 0;
                // 创建节点
                this.createTimer = setInterval(async () => {
                    await this.create(this.rainsCount);
                    this.rainsCount += 1;
                }, this.density);

                setTimeout(() => {
                    this.stop();
                    this.toPop = true;
                }, 5000);
            },

            // 停止
            stop() {
                this.flag = false
                clearInterval(this.createTimer)
            },

            // 清空
            clear() {
                this.stop()
                countdown.clearAssignTimer('rain')
                this.rains = []
                this.rainsCount = 0
            },
        },
        mounted() {
            // 执行倒计时
            this.countdownNumFun();
        }
    }
</script>

<style lang="scss" scoped>
    .sharePop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        @include bg("../assets/images/sharepop-bg.jpg", left top, 100% 100%, no-repeat);

        .countdownicon {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;

            .three,
            .two,
            .one {
                position: relative;
                top: 59%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .three {
                width: vw(183);
                height: vw(248);
                @include bg("../assets/images/countdownNum-3.png", left top, 100% 100%, no-repeat);
            }

            .two {
                width: vw(184);
                height: vw(240);
                @include bg("../assets/images/countdownNum-2.png", left top, 100% 100%, no-repeat);
            }

            .one {
                width: vw(121);
                height: vw(246);
                @include bg("../assets/images/countdownNum-1.png", left top, 100% 100%, no-repeat);
            }
        }

        .rain-wrapper {
            width: 100%;
            height: vw(1100);
            overflow: hidden;
            position: absolute;
            top: 34%;
            z-index: 3;
        }

        .rainBox {
            width: 100%;
            height: 100%;
        }
        .ing {
            display: inline-block;
            height: 100%;
            width: 100%;
        }

        .toPop{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            background: rgba(0, 0, 0, 0.7);
            div{
                position: relative;
                top: 40%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: vw(714);
                height: vw(745);
                @include bg("../assets/images/toDowmload-pop.png", left top, 100% 100%, no-repeat);
            }
        }
    }
</style>