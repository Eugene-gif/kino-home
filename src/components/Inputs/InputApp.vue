<script setup lang="ts">
	import { ref } from 'vue';
	import VisibilitySwitch from './VisibilitySwitch.vue';
  import IconKey from '@/assets/icons/IconKey.vue';

	const { type, placeholder, inputName, password, label } = defineProps<{
		type?: 'text' | 'email' | 'password';
		placeholder?: string;
		inputName?: string;
		password?: boolean;
		label?: string;
    autocomplete?: string;
	}>();

  const id = crypto.randomUUID();
	const text = defineModel();

	const inputRef = ref<HTMLInputElement | null>(null);
	const isVisiblePassword = ref<boolean>(false);

	const focus = () => {
		inputRef.value?.focus();
	};
</script>

<template>
	<div class="input-wrapper">
		<label class="label" :for="id"> {{ label }} </label>

		<div class="input-inner-wrapper" @click="focus">
			<div class="icon icon-left">
				<slot name="iconLeft">
          <IconKey v-if="password" />
        </slot>
			</div>
			<input
				:id="id"
				ref="inputRef"
				v-model="text"
				class="input"
				:name="inputName"
				:type="(password && (isVisiblePassword ? 'text' : 'password')) || type"
				:placeholder="placeholder"
        :autocomplete
			/>
			<div class="icon icon-right">
				<slot name="iconRight">
					<VisibilitySwitch v-if="password" v-model="isVisiblePassword" />
				</slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.label {
		font-size: 18px;
		font-weight: 600;
	}

	.input-inner-wrapper {
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
    margin-bottom: 10px;

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

	.input-inner-wrapper:has(.input:focus) {
		--color: #fff;
	}
</style>
