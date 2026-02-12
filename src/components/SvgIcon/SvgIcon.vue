<script setup lang="ts">
	interface Props {
		name: string;
		width?: string;
		height?: string;
		color?: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		width: '',
		height: '',
		color: '',
	});

	const { name, width, height, color } = props;

	const styleSvg = {
		width,
		height,
		color,
	};
</script>

<template>
	<svg class="svg-icon" aria-hidden="true" :style="styleSvg">
		<use :xlink:href="`#icon-${name}`" />
	</svg>
</template>

<style scoped>
	@import './SvgIcon.css';
</style>
