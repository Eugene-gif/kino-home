<script setup lang="ts">
	import { ref, useId } from 'vue';
	const props = defineProps<{
		isOpen: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'update:isOpen', value: boolean): void;
	}>();

	const inputCheckbox = ref<HTMLInputElement | null>(null);
	const id = useId();

	const onInputBurger = () => {
		if (!inputCheckbox.value) return;
		emit('update:isOpen', inputCheckbox.value.checked);
	};
</script>

<template>
	<button class="button-burger">
		<label class="label" :for="id">
			<input
				type="checkbox"
				:id="id"
				ref="inputCheckbox"
				@input="onInputBurger"
				:checked="props.isOpen"
			/>
			<span class="top"></span>
			<span class="mid"></span>
			<span class="bot"></span>
		</label>
	</button>
</template>

<style scoped>
	.button-burger {
		--transition: all 0.1s ease-in-out;

		border: 1px solid var(--color-btn-base);
		color: var(--color-btn-base);
		border-radius: 10px;
		height: 40px;
		min-width: 40px;
		font-weight: 600;
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		transition: var(--transition);
		outline: none;

		@media (hover: hover) {
			&:hover:not([disabled]),
			&:focus-visible {
				box-shadow: 0 0 10px var(--color-white);
			}
		}

		&:active:not([disabled]) {
			--color-btn: var(--color-white);
			box-shadow: 0 0 20px var(--color-white);
		}

		.label {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 11%;
			width: 100%;
			height: 100%;
			background-color: transparent;
			transition: all 0.3s;
		}

		input[type='checkbox'] {
			-webkit-appearance: none;
			appearance: none;
			display: none;
			visibility: hidden;
		}

		.label span {
			width: 22px;
			height: 4px;
			background-color: var(--color-btn-base);
			border-radius: 100px;
			transition: 0.3s ease;
		}

		input[type]:checked ~ span.top {
			transform: translateY(200%) rotate(45deg);
			width: 30px;
		}

		input[type]:checked ~ span.bot {
			transform: translateY(-200%) rotate(-45deg);
			width: 30px;
		}

		input[type]:checked ~ span.mid {
			transform: translateX(-15px);
			opacity: 0;
		}
	}
</style>
