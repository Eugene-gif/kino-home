<script setup lang="ts">
	import { ref } from 'vue';

	const { type, placeholder, inputName } = defineProps<{
		type?: 'text' | 'email';
		placeholder?: string;
		inputName?: string;
		autocomplete?: string;
		id?: string;
	}>();

	const text = defineModel();

	const inputRef = ref<HTMLInputElement | null>(null);

	const focus = () => {
		inputRef.value?.focus();
	};
</script>

<template>
	<div class="input-wrapper" @click="focus">
		<div class="icon icon-left">
			<slot name="iconLeft"> </slot>
		</div>

		<input
			:id="id"
			ref="inputRef"
			v-model="text"
			class="input"
			:name="inputName"
			:type="type"
			:placeholder="placeholder"
			:autocomplete
		/>

		<div class="icon icon-right">
			<slot name="iconRight"> </slot>
		</div>
	</div>
</template>

<style scoped>
	.input-wrapper {
		--color: var(--color-grey-dark);
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 2px solid var(--color);
		border-radius: 10px;
		color: var(--color-white);
		font-weight: 500;
		width: 100%;
		position: relative;
		gap: 0px;
		height: 50px;
		transition: border-color 350ms cubic-bezier(0, 0.11, 0.35, 2);
		padding-left: 10px;
		padding-right: 10px;

		.input {
			width: 100%;
			padding: 12px 15px;
			outline: none;
			font-size: 20px;
		}

		.input::placeholder,
		.input {
			font-family:
				'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
		}

		.input::placeholder {
			color: #898792;
		}

		.icon {
			cursor: pointer;
			outline: none;
			border-style: none;
			pointer-events: painted;
			background-color: transparent;
			transition: 0.35s linear;
			color: var(--color);
			width: 24px;
		}

		.input:focus {
			transition: color 150ms cubic-bezier(0, 0.11, 0.35, 2);
		}
	}

	.input-wrapper:has(.input:focus) {
		--color: #fff;
	}
</style>
