<script setup lang="ts">
	import { ref } from 'vue';
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

	const props = defineProps<{
		text: string;
	}>();

	const emit = defineEmits<{
		(e: 'update:text', value: string): void;
	}>();

	const onInput = (e: Event) => {
		emit('update:text', (e.target as HTMLInputElement).value);
	};

	const inputRef = ref<HTMLInputElement | null>(null);

	const focus = () => {
		inputRef.value?.focus();
	};

	const clearValue = () => {
		emit('update:text', '');
		focus();
	};

	defineExpose({
		focus,
	});
</script>

<template>
	<div class="input-wrapper">
		<div class="icon">
			<SvgIcon name="search" />
		</div>
		<input
			ref="inputRef"
			:value="props.text"
			@input="onInput"
			type="text"
			name="text"
			class="input"
			placeholder="Название фильма, сериала, или имя актёра, режисёра..."
		/>
		<button v-show="props.text" @click="clearValue" class="close"></button>
	</div>
</template>

<style scoped>
	.input-wrapper {
		--color: #898792;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
		position: relative;
		max-width: 900px;

		.input {
			width: 100%;
			padding: 10px;
			outline: none;
			transition: 0.5s ease-in-out;
			background-color: transparent;
			padding-left: 45px;
			color: #fff;
			border-bottom: 2px solid var(--color);
		}

		.input::placeholder,
		.input {
			font-family:
				'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
			font-size: 20px;
		}

		.input::placeholder {
			color: #898792;
		}

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 0px;
			cursor: pointer;
			width: 50px;
			height: 50px;
			outline: none;
			border-style: none;
			border-radius: 50%;
			pointer-events: painted;
			background-color: transparent;
			transition: 0.35s linear;
			color: var(--color);
		}

		.icon:focus ~ .input,
		.input:focus {
			transition: border-color 350ms cubic-bezier(0, 0.11, 0.35, 2);
		}

		.close {
			--color-close: #898792;
			position: absolute;
			right: 0;
			width: 30px;
			height: 30px;
			outline: none;
			&::before,
			&::after {
				position: absolute;
				content: '';
				top: 50%;
				left: 50%;
				width: 20px;
				height: 2px;
				background-color: var(--color-close);
			}
			&::before {
				transform: translate(-50%, -50%) rotate(45deg);
			}
			&::after {
				transform: translate(-50%, -50%) rotate(-45deg);
			}

			&:focus-visible {
				box-shadow: 0 0 10px 0 #fff;
			}

			&:hover {
				--color-close: #fff;
			}
		}
	}

	.input-wrapper:has(.input:focus) {
		--color: #fff;
	}
</style>
