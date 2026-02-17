<script setup lang="ts">
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

	interface Props {
		text?: string;
		width?: string;
		height?: string;
		color?: string;
		bgColor?: string;
		border?: string | undefined;
		iconName?: string;
		iconSize?: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		width: '',
		height: '',
		color: '',
		bgColor: '',
		border: '',
		iconName: '',
		iconSize: '',
	});

	const { text, width, height, color, bgColor, border } = props;

	const buttonStyle = {
		width: width,
		height: height,
		color: color,
		backgroundColor: bgColor,
		border: border,
	};
</script>

<template>
	<button class="button" :style="buttonStyle">
		<span v-if="text">{{ text }}</span>
		<SvgIcon v-if="iconName" class="icon" :name="iconName" :width="iconSize" :height="iconSize" />
	</button>
</template>

<style scoped>
	@import './ButtonC.css';
</style>
