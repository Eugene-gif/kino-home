<script setup lang="ts">
	import { ref } from 'vue';
	const props = defineProps<{
		isOpen: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'update:isOpen', value: boolean): void;
	}>();

  const inputCheckbox = ref<HTMLInputElement | null>(null);

	const onInputBurger = () => {
		// const input = e.currentTarget as HTMLInputElement | null;

		if (!inputCheckbox.value) return;
		emit('update:isOpen', inputCheckbox.value.checked);
		console.debug(inputCheckbox.value.checked);
	};
</script>

<template>
	<button class="button-burger">
		<label class="label" for="check">
			<input
				type="checkbox"
				id="check"
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
		--color-btn: #898792;
		--transition: all 0.1s ease-in-out;

		border: 1px solid var(--color-btn);
		color: var(--color-btn);
		border-radius: 10px;
		height: 50px;
		min-width: 50px;
		/* padding: 0 15px; */
		font-weight: 600;
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		transition: var(--transition);
		outline: none;
    width: 50px;
    height: 50px;

		.icon {
			transition: var(--transition);
		}

		&:hover,
		&:focus-visible {
			box-shadow: 0 0 10px #fff;
		}

		&:active {
			--color-btn: #fff;
			box-shadow: 0 0 20px #fff;
		}

		.label {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 13%;
			/* width: 3.5rem; */
			height: 3.5rem;
			/* border-radius: 0.5rem; */
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
			width: 30px;
			height: 4px;
			background-color: var(--color-btn);
			border-radius: 100px;
			transition: 0.3s ease;
		}

		input[type]:checked ~ span.top {
			transform: translateY(290%) rotate(45deg);
			width: 40px;
		}

		input[type]:checked ~ span.bot {
			transform: translateY(-270%) rotate(-45deg);
			width: 40px;
		}

		input[type]:checked ~ span.mid {
			transform: translateX(-20px);
			opacity: 0;
		}
	}
</style>
