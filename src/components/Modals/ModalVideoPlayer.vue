<script setup lang="ts">
	import { toRef } from 'vue';
	import { useDevice } from '@/composables/useDevice';
	import { useBodyScrollLock } from '@/composables/useBodyScrollLock';
	import { onKeyStroke } from '@vueuse/core';
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

	const { isMobile } = useDevice();

	const testKey = 'O-b2VfmmbyA';

	const isOpenRef = toRef(props, 'isOpen');
	useBodyScrollLock(isOpenRef);

	const closeModal = () => {
		emit('close');
	};

	onKeyStroke('Escape', (e) => {
		if (props.isOpen) {
			e.preventDefault();
			closeModal();
		}
	});
</script>

<template>
	<Teleport to="body">
		<Transition name="modal-player">
			<div
				v-if="isOpen"
				class="modal-overlay"
				role="dialog"
				aria-modal="true"
				@click.self="closeModal"
			>
				<div class="modal-panel">
					<section class="header">
						<IconLogo />
						<ButtonApp :class="isMobile ? 'sm' : ''" @click="closeModal">
							<template #icon>
								<IconClose />
							</template>
						</ButtonApp>
					</section>

					<section class="content">
						<VueYtframe
							class="video-player"
							:videoId="videoKey ?? testKey"
							:playerVars="{ autoplay: 1, rel: 0 }"
						/>
					</section>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 11;
		background-color: rgba(0, 0, 0, 0.6);
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
		overscroll-behavior: contain;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.modal-panel {
		background-color: #111;
		width: 100%;
		max-width: 1400px;
		max-height: 90vh;
		max-height: 90dvh;
		padding: 20px;
		margin: 0 auto;
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
		flex: 1 1 auto;
		-webkit-overflow-scrolling: touch; /* для старых iOS*/
		overscroll-behavior: contain;
		min-height: 0;
		height: 80vh;
		height: 80dvh;
	}

	@media screen and (max-width: 800px),
		screen and (orientation: landscape) and (max-height: 480px) {
		.modal-panel {
			padding: 10px 20px 20px 20px;
		}

		.content {
			padding: 5px;
			margin-top: 10px;
		}
	}

	.modal-player-enter-active,
	.modal-player-leave-active {
		transition: opacity 0.3s ease;
	}

	.modal-player-enter-from,
	.modal-player-leave-to {
		opacity: 0;
	}
</style>
