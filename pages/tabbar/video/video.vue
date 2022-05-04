<template>
  <view class="video-tabbar">
		<!-- 这里是状态栏 -->
		<view class="status_bar"></view>
		<view class="vdo-content">
			<view class="vdo-title">
				<view 
					v-for="(item, index) in titleList" 
					:key="index"
					:class="['title', index===2 ? 'active' : '']"
					@click="clickTitle(item)"
				>{{item}}</view>
			</view>
    	<DySwiper></DySwiper>
		</view>
  </view>
</template>

<script>
import DySwiper from '../../../components/dySwiper/dySwiper'
export default {
  components: { DySwiper },
  data() {
    return {
			titleList: ['同城', '关注', '推荐']
    };
  },
	computed: {
	},
  onLoad() {
  },
  methods: {
		clickTitle(title) {
			console.log(title)
			if (['同城', '关注'].includes(title)) {
				uni.showToast({
					title: `${title} 未开发!`,
					duration: 1000,
					icon: 'error'
				});
			}
		}
	},
};
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";
.video-tabbar {
	height: 100%;
	.vdo-content {
		position: relative;
		height: 100%;
		.vdo-title {
			position: absolute;
			top: 30rpx;
			width: 100%;
			color: $greyColor;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 10;
			.title {
				font-weight: bold;
				font-size: 18px;
				width: 120rpx;
				text-align: center;
				&.active {
					color: $selectColor;
				}
			}
		}
	}
}
</style>
