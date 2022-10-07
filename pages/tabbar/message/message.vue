<template>
  <view class="message-tabbar-box">
		<scroll-view class="message-tabbar" scoll-y>
			<view class="setting">
				<view class="setting-box">
					<image
						class="icon"
						src="../../../static/avatar.png"
						mode="widthFit"
					/>
					<view class="name">状态设置</view>
				</view>
				<view class="setting-box">
					<image
						class="icon"
						src="../../../static/message/状态设置.png"
						mode="widthFit"
					/>
					<view class="name">状态设置</view>
				</view>
			</view>
			<view class="content">
				<view 
					class="content-item"
					v-for="(item, index) in messageList"
					:key="index"
				>
					<image
						class="icon"
						:src="item.icon"
						mode="scaleToFill"
					/>
					<view class="info">
						<view class="left">
							<view class="title">
								<view class="first-title">{{item.title}}</view>
								<view class="sec-title" v-if="item.secTitle">{{item.secTitle}}</view>
							</view>
							<view v-if="item.info" class="descript">
								<view class="info-des">{{item.info}}</view>
								<view class="data">{{item.data}}</view>
							</view>
						</view>
						<view class="right" v-if="item.more">></view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
  data() {
    return {
			messageList: [
				{
					icon: require('../../../static/message/新的朋友.png'),
					title: '新的朋友',
					more: true
				},
				{
					icon: require('../../../static/message/互动消息.png'),
					title: '互动消息',
					more: true
				},
				{
					icon: require('../../../static/message/服务通知.png'),
					title: '服务通知',
					secTitle: '官方',
					info: '假消息通用营销补贴到账消息',
					data: '04-21'
				},
				{
					icon: require('../../../static/message/活动通知.png'),
					title: '活动通知',
					secTitle: '官方',
					info: '骗鬼的官方活动',
					data: '04-22'
				},
				{
					icon: require('../../../static/message/系统通知.png'),
					title: '系统通知',
					secTitle: '官方',
					info: '假消息通用营销补贴到账消息',
					data: '04-23',
					more: true
				},
				{
					icon: require('../../../static/message/任务通知.png'),
					title: '任务通知',
					secTitle: '官方',
					info: '假消息通用营销补贴到账消息',
					data: '04-24'
				},
				{
					icon: require('../../../static/message/功能通知.png'),
					title: '功能通知',
					secTitle: '官方',
					info: '假消息通用营销补贴到账消息',
					data: '04-25',
					more: true
				},
				{
					icon: require('../../../static/message/功能通知.png'),
					title: '功能通知',
					secTitle: '官方',
					info: '假消息通用营销补贴到账消息',
					data: '04-25',
					more: true
				},
				{
					icon: require('../../../static/message/功能通知.png'),
					title: '功能通知',
					secTitle: '官方',
					info: '假消息通用营销补贴到账消息',
					data: '04-25',
					more: true
				},
			]
		};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.message-tabbar-box {
	height: 100%;
	overflow-y: scroll;
}
.message-tabbar {
	// padding: 0 30rpx;
	background-color: #161824;
	color: #fff;
	.icon {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.setting {
		display: flex;
		padding: 30rpx;
		border-top: 1rpx solid #494949;
		border-bottom: 1rpx solid #494949;
		.setting-box {
			width: 100rpx;
			margin-right: 30rpx;
			.name {
				padding-top: 10rpx;
				color: #bbbbbb;
				text-align: center;
				font-size: 24rpx;
			}
		}
	}
	.content {
		.content-item {
			display: flex;
			.icon {
				padding: 20rpx 30rpx;
			}
			.info {
				flex: 1;
				display: flex;
				align-items: center;
				.left {
					flex: 1;
					.title {
						font-size: 30rpx;
						color: #eee;
						display: flex;
						align-items: center;
						.first-title {
							margin-right: 10rpx;
						}
						.sec-title {
							background: #242730;
							padding: 0rpx 8rpx;
							font-size: 18rpx;
							color: #aeb0b5;
						}
					}
					.descript {
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						color: #8b8d92;
						font-size: 24rpx;
						.data {
							margin-left: 10rpx;
							font-size: 22rpx;
						}
					}
				}
				.right {
					width: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #8b8d92;
				}
			}
		}
	}
}
</style>
