<script setup lang="ts">
	import { onUnmounted, watch } from 'vue';
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

	const testKey = 'O-b2VfmmbyA';

	const closeModal = () => {
		emit('close');
	};

	const onEsc = (evt: KeyboardEvent): void => {
		if (props.isOpen && evt.key === 'Escape') {
			closeModal();
		}
	};

	watch(
		() => props.isOpen,
		(isOpen) => {
			if (!document) return;

			if (isOpen) {
				document.addEventListener('keydown', onEsc);
				document.body.style.overflow = 'hidden';
			} else {
				document.removeEventListener('keydown', onEsc);
				document.body.style.overflow = '';
			}
		},
		{ immediate: true },
	);

	onUnmounted(() => {
		document.removeEventListener('keydown', onEsc);
		document.body.style.overflow = '';
	});
</script>

<template>
	<div class="modal-overlay" @click.self="closeModal">
		<div class="modal-panel">
			<section class="header">
				<IconLogo />
				<ButtonApp @click="closeModal">
					<template #icon>
						<IconClose />
					</template>
				</ButtonApp>
			</section>

			<section class="content">
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
		z-index: 12;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(20px);
		overscroll-behavior: contain;
	}

	.modal-panel {
		background-color: #111;
		max-width: 1400px;
		max-height: 90dvh;
		margin: 0 auto;
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
		overscroll-behavior: contain;
		margin-top: 32px;
		padding: 30px;
		height: 60dvh;
	}
</style>
