<template>
    <div class="rain-box">
        <div v-if="this.isShow" @click="rainPoinclick" class="rain-point" :class="{action: isClick}" :style="styleText">
            <div class="addOne" v-if="this.isClick"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "rain-point",
  props: {},
  data() {
    return {
      styleText: {},
      isShow: true,
      isClick: false
    };
  },
  methods: {
    rainPoinclick(e) {
      if (this.isClick) return;
      this.isClick = true;
      this.$emit("rainPoinclick");
    },
    setStyle(params) {
      this.styleText = params;
    },
    destory() {
      this.isShow = false;
    }
  }
};
</script>

<style>
.rain-box{}
.rain-point {
  position: absolute;
  background-image: url("../../assets/images/RedRainIng-RP-item.png");
  background-size: 70%,70%;
  background-repeat: no-repeat;
  background-position: bottom;
  width: 70px;
  height: 80px;
}

.action {
    animation-name: action_animation;
    animation-duration: 10s;
}

.addOne{
    position: relative;
    top: -20px;
    right: -20px;
    background-image: url("../../assets/images/redrain-addone.png");
    background-size: 100%,100%;
    background-repeat: no-repeat;
    width: 25px;
    height: 30px;
    animation-name: addOne_animation;
    animation-duration: 10s;
}

@keyframes action_animation {
    0% {
        opacity: 1;
    }
    2%{
        opacity: 0;
    }
    100%{
        opacity: 0;
    }
}

@keyframes addOne_animation {
    0% {
        opacity: 1;
    }
    2%{
        opacity: 0;
    }
    100%{
        opacity: 0;
    }
}
</style>