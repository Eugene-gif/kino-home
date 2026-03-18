<script setup lang="ts">
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
</script>

<template>
	<div class="about">
		<h1>Иконки</h1>
		<div class="list">
			<SvgIcon name="arrow-left" />
			<SvgIcon name="arrow-right" />
			<SvgIcon name="bell" />
			<SvgIcon name="close" />
			<SvgIcon name="community" />
			<SvgIcon name="copy" />
			<SvgIcon name="dislike" />
			<SvgIcon name="documentation" />
			<SvgIcon name="heart" />
			<SvgIcon name="like" />
			<SvgIcon name="logo" width="150px" height="35px" />
			<SvgIcon name="mail" />
			<SvgIcon name="master-card" width="30px" height="30px" />
			<SvgIcon name="message" />
			<SvgIcon name="phone" width="50px" height="50px" color="green" />
			<SvgIcon name="play" />
			<SvgIcon name="search" />
			<SvgIcon name="social-fb" />
			<SvgIcon name="social-insta" />
			<SvgIcon name="social-vk" />
		</div>
	</div>
</template>

<style scoped>
	.list {
		display: flex;
		gap: 5px;
		align-items: center;
		justify-content: flex-start;
	}
</style>
