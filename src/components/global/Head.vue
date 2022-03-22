<template>
	<div class="head">
        <div class="withdrawal"></div>
	</div>
</template>

<script>
export default {
	name: "Head",
	data() {
		return {
		};
	},
	methods: {
	},
	mounted(){

	}
};
</script>

<style lang="scss" scoped>
.head {
	position: relative;
	min-height: vw(396);
    .withdrawal{
        width: vw(77);
        height: vw(69);
        position: absolute;
        top: vw(125);
        right: vw(15);
        z-index: 2;
        @include bg("../../assets/images/head_withdrawal.png",top left,100% 100%,no-repeat)
    }
}
</style>
