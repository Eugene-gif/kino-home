<script setup lang="ts">
	import { watch } from 'vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
	console.log('Modal Search');

	const props = defineProps<{
		isOpen: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	// const inputSearch = ref(null);
	const closeModal = () => {
		// document.body.style.overflow = '';
		// document.removeEventListener('keyup', onEsc);
		emit('close');
	};

	// onMounted(() => {
	// 	nextTick(inputSearch.value?.focus());
	//   if(document) {
	//     console.log('addEventListener');
	//     document.addEventListener('keyup', actionOnEsc);
	//   }
	// });

	const onEsc = (evt: KeyboardEvent): void => {
		console.log('onEsc: ', evt);
		if (props.isOpen && evt.key === 'Escape') {
			closeModal();
		}
	};

	// onUpdated(() => {
	//   if(document) {
	//     console.log('removeEventListener');
	//     document.removeEventListener('keyup', actionOnEsc);
	//   }
	// });

	watch(
		() => props.isOpen,
		(isOpen) => {
			if (!document) return;

			// console.log('isOpen: ', typeof isOpen);
			if (isOpen) {
				// console.log('Вешаем обработчик keydown');
				document.addEventListener('keydown', onEsc);
				document.body.style.overflow = 'hidden';
				// document.body.inert = true;
			} else {
				// console.log('Удаляем обработчик keydown', document.body);
				document.removeEventListener('keydown', onEsc);
				document.body.style.overflow = '';
				// document.body.inert = false;
			}
		},
	);
</script>

<template>
	<div class="modal-overlay" @click.self="closeModal">
		<div class="modal-panel">
			<section class="header">
				<SvgIcon name="logo" width="150px" height="35px" />
				<ButtonApp @click="closeModal" iconName="close" iconSize="23px" />
			</section>

			<section class="content">
				<slot name="main"></slot>
			</section>
		</div>
	</div>
</template>

<style scoped>
	.modal-overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 12;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(20px);
		inset: 0;
		overscroll-behavior: contain;
	}
	.modal-panel {
		background-color: #111;
		max-width: 1400px;
		max-height: 60dvh;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
