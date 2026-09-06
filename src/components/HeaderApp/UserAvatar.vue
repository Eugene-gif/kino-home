<script setup lang="ts">
	import { computed } from 'vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';

	const props = defineProps<{
		name: string;
	}>();

	// Первая буква имени
	const firstLetter = computed(() => {
		if (!props.name) return '?';
		return Array.from(props.name)[0]?.toUpperCase();
	});

	// Цвет фона на основе имени
	const avatarColor = computed(() => {
		if (!props.name) return '#ccc';

		let hash = 0;

		for (let i = 0; i < props.name.length; i++) {
			hash = props.name.charCodeAt(i) + ((hash << 5) - hash);
		}

		const hue = Math.abs(hash) % 360;

		return `hsl(${hue}, 60%, 50%)`;
	});
</script>

<template>
	<ButtonApp class="user-button">
		<div class="user-button-avatar" :style="{ backgroundColor: avatarColor }" aria-hidden="true">
			{{ firstLetter }}
		</div>
	</ButtonApp>
</template>

<style scoped>
	.user-button {
		padding: 0;
		border-radius: 50%;
		border: none;
	}

	.user-button-avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		color: #ffffff;
		font-size: 24px;
		font-weight: 700;
		user-select: none;
		text-transform: uppercase;
		transition: background-color 0.3s ease;
	}
</style>
