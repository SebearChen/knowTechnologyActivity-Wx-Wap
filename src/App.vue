<template>
    <div>
        <!-- 不使用路由可以删除 -->
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" />
            </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive" />
        </transition>
    </div>
</template>
<script>
    import share from '@mixin/share.js'
    export default {
        mixins: [share],
        data() {
            return {
                scrollTimer: null,
            }
        },
        methods: {
            //滚动事件
            winScroll() {
                window.requestAnimationFrame(() => {
                    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body
                        .scrollTop;
                    this.scrollTimer = null;
                    this.scrollTimer = setTimeout(() => {
                        this.$EventBus.$emit("scrolling", scrollTop);
                    }, 50);
                });
            },
        },
        mounted() {
            console.log('V-1');
            window.scrollTo(0, 0);
            //滚动监听事件
            this.$nextTick(() => {
                window.addEventListener("scroll", this.winScroll);
            });
            this.$EventBus.$on("groupId",(data)=>{
                let shareObj = {
                    title: "嗨！快入团，发福利啦~",
                    desc: "来知科技APP输入团号【"+data+"】领红包！天天红包雨下不停，速来>省钱省力买新车，就来太平洋汽车",
                    imgUrl: "http://img.pconline.com.cn/images/upload/upc/tx/pccoin/2112/06/c0/286488481_1638775495446.jpg",
                    link: window.location.href,
                };
                this.shareConfig(shareObj);
            })
        }
    }
</script>
<style lang="scss">

</style>