<template>
    <div class="body" :data-clipboard-text="groupAcP" @click="toDownloadApp()">

        <Head />
        <InviteCover @groupNum="groupNum" @groupId="groupId" />
    </div>
</template>

<script>
    import storage from '@/mixin/storage.js'
    import share from "@mixin/share";
    import Clipboard from 'clipboard';
    export default {
        name: 'Home',
        mixins: [share],
        data() {
            return {
                groupAcNum: '', //团Id
                groupAcP: '', //团号
            }
        },
        methods: {
            // InviteCover传过来的团Id
            groupNum(val) {
                this.groupAcNum = val;
            },
            groupId(val) {
                this.groupAcP = val;
            },
            // 复制团号
            copyTH() {
                //创建一个input元素
                // let input = document.createElement('input')
                // //给input的内容复制
                // input.value = this.groupAcNum
                // // 在body里面插入这个元素
                // document.body.appendChild(input)
                // // 选中input里面内容
                // input.select()
                // //执行document里面的复制方法
                // document.execCommand("Copy")
                // // 复制之后移除这个元素
                // document.body.removeChild(input)
                // return this.$toast("复制团号成功")
                var clipboard = new Clipboard('.body');
                clipboard.on('success', e => {
                    console.log(e);
                    if ((navigator.userAgent.match('iPhone')) != null) {
                        this.$toast("请记下团号："+this.groupAcP)
                    }else{
                        this.$toast('复制团号成功')
                    }
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    this.$toastg('该浏览器不支持复制')
                })
            },
            // 前往下载APP
            toDownloadApp() {
                // 神策埋点 按钮事件
                this.$sensorsEvent.buttonClick('下载引导页', '', '', '点击立即下载APP', '');
                this.copyTH();
                setTimeout(() => {
                    window.location.href = 'https://'+storage.data().SHARE_LINK_DOMAIN+'/2021/app/download.html?channelCode=New+Year&url=https%3A%2F%2Fwww1.pconline.com.cn%2F'+storage.data().OPENINSTALL_LINK+'zt%2Fact%2Fyear%2F202111%2Fapp-wap%2Findex.html%23%2Factivitycenter%3Fbrowser%3DcommonWebView%26fromWx%3D1';
                }, 1000);
            },
        },
        mounted() {
            this.$EventBus.$on("groupId", (data) => {
                this.groupAcP = data;
                let shareObj = {
                    title: "嗨！快入团，发福利啦~",
                    desc: "来知科技APP输入团号【" + data + "】领红包！天天红包雨下不停，速来>省钱省力买新车，就来太平洋汽车",
                    imgUrl: "http://img.pconline.com.cn/images/upload/upc/tx/pccoin/2112/06/c0/286488481_1638775495446.jpg",
                    link: window.location.href,
                };
                this.shareConfig(shareObj);
            })
        }
    }
</script>

<style lang="scss" scoped>
    .body {
        height: 100%;
        @include bg("../assets/images/groupdetails_bg.png", top left, 100% 100%, no-repeat)
    }
</style>