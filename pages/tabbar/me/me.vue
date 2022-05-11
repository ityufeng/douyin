<template>
	<view class="me-tabbar-box" ref="meTabbarBox">
		<view 
			class="me-tabbar" 
			ref="meTabbar"
		>
			<view class="top" ref="top">
				<image
					class="bg-image"
					ref="bgImg"
					src="../../../static/avatar.png"
					mode="widthFix"
				/>
				<view class="user">
					<view class="user-avatar">
						<image
							class="avatar"
							src="../../../static/avatar.png"
							mode="aspectFill"
						/>
					</view>
					<view class="name">匿名用户</view>
				</view>
			</view>
			<view class="content">
				<view class="info">
					<view class="user-count">
						<view class="box">
							<view class="num">66</view>
							<view class="text">获取</view>
						</view>
						<view class="box">
							<view class="num">100</view>
							<view class="text">关注</view>
						</view>
						<view class="box">
							<view class="num">10</view>
							<view class="text">粉丝</view>
						</view>
					</view>
					<view class="edit-info">
						编辑资料 <text class="percent">60%</text>
					</view>
					<view class="add-user">
						<view class="iconfont icon-tianjiahaoyou"></view>
					</view>
				</view>
				<view class="user-descript">
					点击添加介绍, 让大家认识你... <text class="iconfont icon-bianji"></text>
				</view>
				<view class="add-info-data">
					<text class="iconfont icon-zengjia1"></text>
					<text>添加年龄、所在地等标签</text>
				</view>
				<view class="shop">
					<view class="icon">
						<view class="iconfont icon-gouwuche"></view>
					</view>
					<view class="info">
						<view class="name">商城</view>
						<view class="text">美好生活触手可得</view>
					</view>
				</view>
				<view class="col-title">
					<view class="name active">作品</view>
					<view class="name">私密</view>
					<view class="name">喜欢</view>
				</view>
				<view class="col-content">
					<view class="works">
						<view class="icon">
							<view class="iconfont icon-xiangce"></view>
						</view>
						<view class="text">最近的新照片</view>
						<view class="btn">
							<view class="btn-open">打开相册</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	name: "me",
	data() {
		return {
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			this.meTabbarBox = this.$refs.meTabbarBox.$el
			this.meTabbar = this.$refs.meTabbar.$el
			this.top = this.$refs.top.$el
			this.bgImg = this.$refs.bgImg.$el
			this.meTabbar.addEventListener('touchstart', this.touchS)
			this.meTabbar.addEventListener('touchmove', this.touchM, { passive: false })
			this.meTabbar.addEventListener('touchend', this.touchE)
		},
		touchS(e) {
			this.topHeight = this.top.offsetHeight
			this.touchSY = e.changedTouches[0].clientY
			this.bgImg.style.transition = ''
			this.top.style.transition = ''
		},
		touchM(e) {
			let offsetY = e.changedTouches[0].clientY - this.touchSY
			let scrollT = this.meTabbarBox.scrollTop
			// 滑动距离
			let target = 100
			// console.log(offsetY, scrollT)
			// 下拉 并 滚动高度为0
			if (offsetY > 0 && scrollT <= 0) {
				// 阻止默认操作
				// this.prevent(e)
				e.preventDefault()
				// 下面可以做想要的操作
				if (offsetY < target) {
					this.top.style.height = `${this.topHeight + offsetY}px`
					// this.bgImg.style.transform = `scale(${1 + (offsetY / target) * 0.6}) translateY(-50%)`
					this.bgImg.style.transform = `scale(${1 + (offsetY / target) * 0.8})`
				}
			}
		},
		touchE(e) {
			if (e.changedTouches[0].clientY > this.touchSY) {
				this.bgImg.style.transition = 'transform .3s cubic-bezier(0.09, 0.8, 0.5, 0.98)'
				this.top.style.transition = 'height .3s cubic-bezier(0.09, 0.8, 0.5, 0.98)'
				this.bgImg.style.transform = ''
				this.top.style.height = `${this.topHeight}px`
			}
		},
		prevent(e) {
			 if (e && e.preventDefault) {
        e.preventDefault();
			}else{ 
				window.event.returnValue = false;
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.me-tabbar-box {
	height: 100%;
	overflow-y: scroll;
}
.me-tabbar {
	color: #fff;
	padding-bottom: 100rpx;
	background-color: #161824;
	// touch-action: none;
	.top {
		height: 440rpx;
		overflow: hidden;
		position: relative;
		&::after {
			content: "";
			display: block;
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))
		}
		.bg-image {
			width: 100%;
			// position: absolute;
			// top: 50%;
			// transform: translateY(-50%);
		}
		.user {
			position: absolute;
			bottom: 60rpx;
			left: 30rpx;
			z-index: 1;
			display: flex;
			align-items: center;
			.user-avatar {
				width: 120rpx;
				height: 120rpx;
				position: relative;
				overflow: hidden;
				border-radius: 50%;
				border: 6rpx solid #ececec;
				.avatar {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					filter: brightness(0.8);
				}
			}
			.name {
				font-size: 40rpx;
				font-weight: bold;
				margin-left: 30rpx;
				color: #eee;
			}
		}
	}
	.content {
		position: relative;
		top: -30rpx;
		background-color: #161824;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		.col-content {
			padding-bottom: 100rpx;
			.works {
				.icon {
					display: flex;
					justify-content: center;
					margin-top: 120rpx;
					.icon-xiangce {
						font-size: 60rpx;
					}
				}
			}
			.text {
				font-size: 30rpx;
				margin-top: 40rpx;
				text-align: center;
			}
			.btn {
				margin-top: 40rpx;
				display: flex;
				justify-content: center;
				.btn-open {
					background: #3a3a44;
					padding: 10rpx 40rpx;
				}
			}
		}
		.info {
			display: flex;
			align-items: center;
			padding: 40rpx 30rpx;
			.user-count {
				display: flex;
				.box {
					text-align: center;
					font-size: 32rpx;
					line-height: 1;
					&:nth-child(2) {
						margin: 0 80rpx;
					}
					.text {
						margin-top: 4rpx;
						color: #747579;
						font-size: 22rpx;
					}
				}
			}
			.edit-info {
				margin-left: auto;
				padding: 15rpx 40rpx;
				background-color: #3a3a44;
				font-size: 24rpx;
				border-radius: 8rpx;
				.percent {
					color: #8a8888;
					margin-left: 10rpx;
				}
			}
			.add-user {
				margin-left: 16rpx;
				padding: 15rpx;
				font-size: 24rpx;
				border-radius: 8rpx;
				background-color: #3a3a44;
			}
		}
		.user-descript {
			color: #8a8c91;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			.icon-bianji {
				margin-left: 12rpx;
			}
		}
		.add-info-data {
			display: inline-block;
			vertical-align: middle;
			color: #8a8c91;
			font-size: 28rpx;
			margin-left: 30rpx;
			padding: 6rpx 20rpx;
			border-radius: 12rpx;
			margin-top: 14rpx;
			background-color: #3a3a44;
			.icon-zengjia1 {
				font-size: 28rpx;
				margin-right: 8rpx;
			}
		}
		.shop {
			display: flex;
			align-items: center;
			margin: 0 30rpx;
			.icon {
				background: #242730;
				padding: 26rpx;
				border-radius: 16rpx;
				.icon-gouwuche {
					font-size: 34rpx;
				}
			}
			.info {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.name {
					color: #d5d6d8;
				}
				.text {
					color: #8e9096;
					font-size: 26rpx;
				}
			}
		}
		.col-title {
			display: flex;
			justify-content: space-around;
			.name {
				color: #8c8d92;
				font-size: 30rpx;
				padding: 20rpx 0;
				width: 33.33%;
				text-align: center;
				&.active {
					color: #fff;
					font-weight: bold;
					position: relative;
					&::after {
						content: "";
						display: block;
						position: absolute;
						bottom: 0;
						width: 100%;
						height: 6rpx;
						background-color: #f8ce1a;
					}
				}
			}
		}
	}
}
</style>