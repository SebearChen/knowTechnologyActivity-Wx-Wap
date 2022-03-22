<template>
    <div class="inviteCover">
        <div class="redCover">
            <div class="time" v-if="groupStatusNum == '1'">
                <div>助力倒计时</div><span>{{lefttime}}</span>
            </div>
            <div class="redRain"></div>
            <div class="inviteBtn">
                <div class="gNum">
                    团号:{{groupNum}}
                </div>
                <div class="detail">
                    <div class="tit1">来和我一起</div>
                    <div class="tit2">瓜分{{groupDetailList.groupStock}}元红包</div>
                </div>
                <div class="btn"></div>
            </div>
        </div>
        <div class="inviteDetail">
            <div v-if="!groupSuNO">
                <div class="inviteList">
                    <div class="btn"></div>
                    <div class="noFullList" v-if="groupDetailList.groupNumber <= 2">
                        <div class="tz">
                            <div class="icon">
                                <div class="txIcon"></div>
                                <img :src="groupDetailList.captain.headImage" />
                            </div>
                            <div class="name">{{groupDetailList.captain.userName}}</div>
                        </div>
                        <div class="ty" v-for="index of leftSuccessNum" :key="'ty' + index">
                            <div class="icon"></div>
                            <div class="name"></div>
                        </div>
                    </div>
                    <div class="list" v-else>
                        <div class="tz">
                            <div class="icon">
                                <div class="txIcon"></div>
                                <img :src="groupDetailList.captain.headImage" />
                            </div>
                            <div class="name">{{groupDetailList.captain.userName}}</div>
                        </div>
                        <div class="ty" v-for="index of leftSuccessNum" :key="'ty' + index">
                            <div class="icon"></div>
                            <div class="name"></div>
                        </div>
                    </div>

                </div>
                <div class="tips">
                    <img src="../../assets/images/inviteDetailTips.png" />
                </div>
                <div class="toDownloadApp"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InviteCover",
        data() {
            return {
                nowServerTime: '', //当前服务器时间戳
                groupNum: '', //团号
                groupId: '', //团id
                hours: null, //倒计时：时
                minutes: null, //倒计时：分
                seconds: null, //倒计时：秒
                nowtime: '', //当前时间戳
                endtime: '', //结束时间戳
                endTimeForShare: '', //结束标准时间
                createTime: '', //创建时间戳
                lefttime: '', //剩余时间戳
                groupStatus: false, //是否组团成功
                groupSuNO: false, //组团成功是否开红包
                groupDetailList: [], //当前团信息
                leftSuccessNum: '', //差多少人成功
                receivedGroupList: [], //已领红包的成员列表
                groupFailStatus: false, //超过时间，已失效
                rpPrice: '', //红包金额
                groupStatusNum: '', //团状态码
                groupSuNumber: false, //成团人数是否等于或超过3
                lefttimeInterval: '',
            };
        },
        watch: {
            receivedGroupList(val) {
                this.receivedGroupList = val
            },
            endtime(val) {
                this.endtime = val
            }
        },
        created() {
        },
        methods: {
            //当前服务器时间
            async getServerTime() {
                try {
                    const {
                        code,
                        data
                    } = await this.$api.fetchServerTime();
                    if (code == 0) {
                        this.nowServerTime = data;
                    }
                } catch (error) {
                    console.error(error);
                } finally {}
            },
            async getGroupDetailData() {
                this.getServerTime();
                try {
                    const {
                        code,
                        data
                    } = await this.$api.fetchGroupDetailData({
                        groupId: this.$route.query.groupId
                    });
                    if (code == 0) {
                        this.groupDetailList = data;
                        // 计算剩余时间戳
                        this.createTime = this.groupDetailList.createTime;
                        this.endtime = new Date(new Date(this.nowServerTime).toLocaleDateString()).getTime() +
                            86400000;
                        this.endTimeForShare = this.timestampToTime(this.endtime)
                        this.groupNum = this.groupDetailList.code;
                        this.groupId = this.groupDetailList.id;
                        this.$emit("groupNum", this.groupNum)
                        this.$EventBus.$emit("groupId", this.groupNum)
                        // 瓜分总金额
                        this.groupDetailList.groupStock = this.groupDetailList.groupStock / 100;
                        // 团长所获红包最小值
                        this.groupDetailList.groupCaptainMin = this.groupDetailList.groupCaptainMin / 100;
                        // 计算差多少人拼成功
                        this.leftSuccessNum = this.groupDetailList.groupNumber - 1;
                        // 已领红包的成员列表
                        this.groupDetailList.captain.rpMoney = this.groupDetailList.captain.rpMoney / 100;
                        this.groupDetailList.captain.rpTime = this.timestampToTime(this.groupDetailList.captain
                            .rpTime);
                        this.receivedGroupList.push(this.groupDetailList.captain);
                        // 成团人数是否等于或超过3
                        if (this.groupDetailList.members.length >= 3) {
                            this.groupSuNumber = true;
                        }
                        for (let i = 0; i < this.groupDetailList.members.length; i++) {
                            if (this.groupDetailList.members[i].rpStat == '1') {
                                this.groupDetailList.members[i].rpMoney = this.groupDetailList.members[i].rpMoney /
                                    100;
                                this.groupDetailList.members[i].rpTime = this.timestampToTime(this.groupDetailList
                                    .members[i].rpTime);
                                this.receivedGroupList.push(this.groupDetailList.members[i]);
                            }
                        }
                        window.clearInterval(this.lefttimeInterval);
                        // 判断团状态
                        this.judgeGroupStatus();
                        this.lefttimeInterval = setInterval(() => {
                            this.countLeftTime();
                        }, 1000);
                    }
                } catch (error) {
                    console.error(error);
                } finally {}
            },
            // 判断团状态
            judgeGroupStatus() {
                if (this.groupDetailList.status == '1') {
                    this.groupStatusNum = '1'
                    this.groupStatus = false
                    this.groupFailStatus = false
                } else if (this.groupDetailList.status == '2') {
                    this.groupStatusNum = '2'
                    this.groupStatus = true
                    this.groupSuNO = false
                } else if (this.groupDetailList.status == '3') {
                    this.groupStatusNum = '3'
                    this.groupFailStatus = true
                }
            },
            // 计算剩余时间戳
            countLeftTime() {
                this.nowServerTime = this.nowServerTime + 1000
                this.lefttime = this.endtime - this.nowServerTime; //距离结束时间的时间戳
                if (this.lefttime == 0) {
                    this.groupStatusNum = '3';
                }
                var time = {
                    hour: parseInt((this.lefttime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10 ? "0" +
                        parseInt((this.lefttime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : parseInt((this
                            .lefttime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minute: parseInt((this.lefttime % (1000 * 60 * 60)) / (1000 * 60)) < 10 ? "0" + parseInt((this
                        .lefttime % (1000 * 60 * 60)) / (1000 * 60)) : parseInt((this.lefttime % (1000 * 60 *
                        60)) / (1000 * 60)),
                    second: parseInt((this.lefttime % (1000 * 60)) / 1000) < 10 ? "0" + parseInt((this.lefttime % (
                        1000 * 60)) / 1000) : parseInt((this.lefttime % (1000 * 60)) / 1000),
                }
                this.lefttime = time.hour + ":" + time.minute + ":" + time.second;
            },
            // 时间戳转标准时间
            timestampToTime(timestamp) {
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '/';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                return Y + M + D + h + m;
            },
        },
        mounted() {
            // 神策埋点 浏览事件
            this.$sensorsEvent.detailView('下载引导页', '');
            // this.countLeftTime();
            this.getGroupDetailData();
        }
    };
</script>

<style lang="scss" scoped>
    .inviteCover {
        margin-top: vw(-35);

        .redRain {
            width: vw(131);
            height: vw(115);
            position: absolute;
            top: vw(365);
            left: vw(12);
            z-index: 2;
            @include bg("../../assets/images/redRainBtn.gif", left top, 100% 100%, no-repeat);
        }

        .redCover {
            .time {
                width: vw(442);
                height: vw(61);
                line-height: vw(57);
                margin: 0 auto;
                font-size: vw(29);
                font-weight: 300;
                text-align: center;
                @include bg("../../assets/images/inviteCoverTime_bg.png", left top, 100% 100%, no-repeat);

                div {
                    display: inline-block;
                    color: #06f9fe;
                }

                span {
                    position: relative;
                    top: vw(2);
                    font-size: vw(36);
                    color: #fff;
                    margin-left: vw(12);
                }

            }

            .inviteBtn,
            .openBtn {
                width: 100%;
                height: vw(763);
                position: relative;
                margin-top: vw(28);
                @include bg("../../assets/images/receiveBtn_bg.png", left top, 100% 100%, no-repeat);

                .gNum {
                    width: vw(229);
                    height: vw(50);
                    line-height: vw(50);
                    position: absolute;
                    top: vw(62);
                    left: vw(266);
                    color: #fff;
                    font-size: vw(24);
                    text-align: center;
                    @include bg("../../assets/images/gNum_bg.png", left top, 100% 100%, no-repeat);
                }

                .detail {
                    width: 100%;
                    height: vw(170);
                    display: inline-block;
                    text-align: center;
                    margin-top: vw(278);

                    .price {
                        font-size: vw(100);
                        font-weight: 600;
                        background-image: -webkit-linear-gradient(top, #e7e1cc, #e9d030);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;

                        span {
                            margin-left: vw(2);
                            font-size: vw(50);
                        }
                    }

                    .rule {
                        font-size: vw(24);
                        text-shadow: #bc0d10 vw(0.5) vw(3) 0;
                        color: #fff;
                    }

                    .tit1 {
                        margin-top: vw(20);
                    }

                    .tit1,
                    .tit2 {
                        font-size: vw(45);
                        font-weight: 600;
                        text-align: center;
                        background-image: -webkit-linear-gradient(top, #e7e1cc, #e9d030);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                }

                .btn {
                    width: vw(120);
                    height: vw(139);
                    position: relative;
                    top: vw(-312);
                    left: vw(322);
                }

                &:before {
                    content: "";
                    display: block;
                    width: vw(750);
                    height: vw(767);
                    position: absolute;
                    top: vw(-265);
                    left: 0;
                    @include bg("../../assets/images/receiveBtn_before.png", left top, 100% 100%, no-repeat);
                }
            }

            .openBtn {
                @include bg("../../assets/images/openBtn_bg.png", left top, 100% 100%, no-repeat);
            }

            .getRedCover {
                width: 100%;
                height: vw(799);
                position: relative;
                margin-top: vw(28);
                @include bg("../../assets/images/getRedCover_bg.png", left top, 100% 100%, no-repeat);

                .gNum {
                    width: vw(229);
                    height: vw(50);
                    line-height: vw(50);
                    position: absolute;
                    top: vw(262);
                    left: vw(266);
                    color: #fff;
                    font-size: vw(24);
                    text-align: center;
                    @include bg("../../assets/images/gGNum_bg.png", left top, 100% 100%, no-repeat);
                }

                .detail {
                    width: 100%;
                    height: vw(170);
                    display: inline-block;
                    text-align: center;
                    margin-top: vw(178);

                    .price {
                        margin-left: vw(2);
                        font-size: vw(35);
                        font-weight: 600;
                        background-image: -webkit-linear-gradient(top, #ff9b58, #fa2537);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;

                        span {
                            font-size: vw(50);
                        }
                    }
                }

                .btn {
                    width: vw(316);
                    height: vw(72);
                    position: relative;
                    top: vw(42);
                    left: vw(218);
                    @include bg("../../assets/images/ljtx_bg.png", left top, 100% 100%, no-repeat);
                }

                .toKTBtn {
                    display: inline-block;
                    position: relative;
                    top: vw(52);
                    left: vw(270);
                    font-size: vw(24);
                    color: #b7030e;
                    border-bottom: #b7030e vw(1) solid;
                    -webkit-transform-origin-x: 0;
                    -webkit-transform: scale(0.9);
                    /* CSS缩放 */
                }

                &:before {
                    content: "";
                    display: block;
                    width: vw(750);
                    height: vw(767);
                    position: absolute;
                    top: vw(-220);
                    left: 0;
                    @include bg("../../assets/images/receiveBtn_before.png", left top, 100% 100%, no-repeat);
                }

            }
        }

        .inviteDetail {
            width: vw(733);
            height: vw(636);
            margin: vw(-240) auto 0;
            position: relative;
            z-index: 2;
            @include bg("../../assets/images/openDetailList_bg.png", left top, 100% 100%, no-repeat);

            .openDetailList {
                width: vw(680);
                height: vw(435);
                // margin: vw(65) 0 vw(32) vw(45);

                &::before {
                    content: "";
                    display: block;
                    width: vw(4);
                    height: vw(435);
                    position: absolute;
                    top: vw(70);
                    right: vw(40);
                    background-color: #101047;
                }

                .itemBox {
                    width: vw(670);
                    height: vw(435);
                    display: flex;
                    // justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    overflow-y: scroll;
                    overflow-x: hidden;
                    position: relative;
                    top: vw(70);
                    left: vw(25);

                    /* 设置滚动条的样式 */
                    &::-webkit-scrollbar {
                        width: vw(8);
                    }

                    /* 滚动条滑块 */
                    &::-webkit-scrollbar-thumb {
                        border-radius: vw(30);
                        background: #08f4ff;
                        -webkit-box-shadow: inset 0 0 vw(20) #08f4ff;
                    }

                    &::-webkit-scrollbar-thumb:window-inactive {
                        background: #08f4ff;
                    }

                    .item {
                        display: flex;
                        width: vw(640);
                        height: vw(106);
                        // line-height: vw(106);
                        font-size: vw(25);
                        text-align: center;
                        border-bottom: #2a2977 vw(1) solid;

                        .pic {
                            width: vw(60);
                            height: vw(60);
                            margin: auto 0;
                            border: #539699 vw(1) solid;
                            border-radius: 50%
                        }

                        .name {
                            width: vw(200);
                            margin: auto vw(2);
                            color: #08f4ff;
                        }

                        .price {
                            width: vw(310);
                            line-height: vw(106);
                            color: #fff;
                        }

                        .time {
                            width: vw(300);
                            line-height: vw(106);
                            color: #fff;
                        }
                    }

                }
            }

            .inviteList {
                display: inline-block;
                margin: vw(60) 0 vw(32) vw(55);

                .btn {
                    width: vw(159);
                    height: vw(187);
                    float: left;
                    margin-right: vw(22);
                    @include bg("../../assets/images/inviteDetailBtn.png", left top, 100% 100%, no-repeat);
                }

                .list,
                .fullList {
                    width: vw(455);
                    display: flex;
                    overflow-x: scroll;
                    justify-content: space-between;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    .tz,
                    .ty,
                    .tyYj {
                        margin-right: vw(35);

                        img {
                            height: 100%;
                        }
                    }

                    .icon {
                        width: vw(118);
                        height: vw(138);
                        position: relative;
                        overflow: hidden;

                        .txIcon {
                            width: 100%;
                            height: 101%;
                            position: absolute;
                            left: 0;
                            z-index: 3;
                            @include bg("../../assets/images/tzIcon.png", left top, 100% 100%, no-repeat);
                        }

                        .txYjIcon {
                            width: 100%;
                            height: 101%;
                            position: absolute;
                            // top: vw(-1);
                            left: 0;
                            @include bg("../../assets/images/tyYjIcon.png", left top, 100% 100%, no-repeat);
                        }

                        img {
                            width: 98%;
                            height: 98%;
                            position: absolute;
                            top: vw(1);
                            left: vw(1);
                            z-index: -1;
                        }
                    }

                    .name {
                        width: vw(123);
                        height: vw(33);
                        line-height: vw(33);
                        margin-top: vw(12);
                        color: #1a497a;
                        text-align: center;
                        font-size: vw(24);
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        @include bg("../../assets/images/tyName_bg.png", left top, 100% 100%, no-repeat);
                    }

                    .ty {
                        .icon {
                            @include bg("../../assets/images/tyIcon.png", left top, 100% 100%, no-repeat);
                        }
                    }

                    :last-child {
                        margin-right: 0;
                    }
                }

                .fullList {
                    width: vw(625);
                }

                .noFullList {
                    // width: vw(455);
                    display: flex;
                    overflow-x: scroll;
                    justify-content: space-between;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    .tz,
                    .ty,
                    .tyYj {
                        margin-right: vw(35);

                        img {
                            height: 100%;
                        }
                    }

                    .icon {
                        width: vw(118);
                        height: vw(138);
                        position: relative;
                        overflow: hidden;

                        .txIcon {
                            width: 100%;
                            height: 101%;
                            position: absolute;
                            left: 0;
                            z-index: 3;
                            @include bg("../../assets/images/tzIcon.png", left top, 100% 100%, no-repeat);
                        }

                        .txYjIcon {
                            width: 100%;
                            height: 101%;
                            position: absolute;
                            left: 0;
                            @include bg("../../assets/images/tyYjIcon.png", left top, 100% 100%, no-repeat);
                        }

                        img {
                            width: 98%;
                            height: 98%;
                            position: absolute;
                            top: vw(1);
                            left: vw(1);
                            z-index: -1;
                        }
                    }

                    .name {
                        width: vw(123);
                        height: vw(33);
                        line-height: vw(33);
                        margin-top: vw(12);
                        color: #1a497a;
                        text-align: center;
                        font-size: vw(24);
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        @include bg("../../assets/images/tyName_bg.png", left top, 100% 100%, no-repeat);
                    }

                    .ty {
                        .icon {
                            @include bg("../../assets/images/tyIcon.png", left top, 100% 100%, no-repeat);
                        }
                    }

                    :last-child {
                        margin-right: 0;
                    }
                }
            }

            .tips {
                width: vw(646);
                height: vw(229);
                margin: vw(-10) auto 0;
            }

            .toDownloadApp {
                width: vw(504);
                height: vw(88);
                margin: 0 auto;
                position: relative;
                bottom: vw(15);
                @include bg("../../assets/images/toDownloadApp.png", left top, 100% 100%, no-repeat);

            }
        }
    }
</style>