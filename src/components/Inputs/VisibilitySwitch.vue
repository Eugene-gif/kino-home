<script setup lang="ts">
	import IconEyeOpen from '@/assets/icons/IconEyeOpen.vue';
	import IconEyeClose from '@/assets/icons/IconEyeClose.vue';

	const checked = defineModel({ default: true });
</script>

<template>
	<label class="switch">
		<input type="checkbox" v-model="checked" />
		<IconEyeOpen v-show="checked" />
		<IconEyeClose v-show="!checked" />
	</label>
</template>

<style scoped>
	.switch {
		--color: #a5a5b0;
		--size: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		cursor: pointer;
		user-select: none;
		fill: var(--color);
		width: var(--size);
		height: var(--size);

		input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			height: 0;
			width: 0;
		}

		input ~ svg {
			position: absolute;
			animation: keyframes-fill 0.3s;
		}
	}

	@keyframes keyframes-fill {
		0% {
			transform: scale(0);
			opacity: 0;
		}

		50% {
			transform: scale(1.2);
		}
	}
</style>
