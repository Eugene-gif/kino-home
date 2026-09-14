<script setup lang="ts">
	import { onUnmounted, watch } from 'vue';
	import { useDevice } from '@/composables/useDevice';
	import { useScrollLock, onKeyStroke } from '@vueuse/core';
	import { VueYtframe } from 'vue3-ytframe';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconLogo from '@/assets/icons/IconLogo.vue';
	import IconClose from '@/assets/icons/IconClose.vue';

	const props = defineProps<{
		isOpen: boolean;
		videoKey?: string;
	}>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const closeModal = () => {
		emit('close');
	};

	const { isMobile } = useDevice();

	const testKey = 'O-b2VfmmbyA';
	const isLocked = useScrollLock(typeof window !== 'undefined' ? document.body : null);

	watch(
		() => props.isOpen,
		(value) => {
			isLocked.value = value;
		},
		{ immediate: true },
	);

	onKeyStroke('Escape', (e) => {
		if (props.isOpen) {
			e.preventDefault();
			closeModal();
		}
	});

	onUnmounted(() => {
		isLocked.value = false;
	});
</script>

<template>
	<div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
		<div class="modal-panel">
			<section class="header">
				<IconLogo />
				<ButtonApp :class="isMobile ? 'sm' : ''" @click="closeModal">
					<template #icon>
						<IconClose />
					</template>
				</ButtonApp>
			</section>

			<section class="content" @click.stop>
				<VueYtframe
					class="player"
					:videoId="videoKey ?? testKey"
					:playerVars="{ autoplay: 1, rel: 0 }"
				/>
			</section>
		</div>
	</div>
</template>

<style scoped>
	.modal-overlay {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 12;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(20px);
		overscroll-behavior: contain;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		overflow: hidden;
	}

	.modal-panel {
		background-color: #111;
		width: 100%;
		max-width: 1400px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}

	.content {
		margin-top: 32px;
		padding: 10px;
		flex-grow: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior: contain;
	}

	:deep(.player) {
		height: 70dvh;
	}

	@media (max-width: 800px) {
		.content {
			padding: 0px;
		}

		.modal-panel {
			padding: 10px 20px 20px 20px;
		}
	}

	@media screen and (orientation: landscape) and (max-device-width: 1080px) {
		.modal-panel {
			padding: 10px 20px 20px 20px;
		}

		.content {
			padding: 5px;
			margin-top: 10px;
		}
	}
</style>
