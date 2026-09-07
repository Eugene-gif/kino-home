<script setup lang="ts">
	import { computed } from 'vue';
	import IconLoading from '@/assets/icons/IconLoading.vue';

	interface PropsButtonApp {
		border?: string | undefined;
		round?: boolean | string;
		disabled?: boolean;
		loading?: boolean;
		href?: string;
	}

	const props = withDefaults(defineProps<PropsButtonApp>(), {
		border: '',
		round: false,
		disabled: false,
	});

	const { border, round } = props;

	const buttonStyle = {
		border: border,
		borderRadius:
			typeof round === 'boolean' && round
				? '50%'
				: typeof round === 'boolean' && !round
					? ''
					: round,
	};

	const buttonClasses = computed(() => {
		return [border === 'none' ? 'no-border' : ''];
	});
</script>

<template>
	<RouterLink
		v-if="href"
		class="button"
		:class="buttonClasses"
		:style="buttonStyle"
		:to="href"
	>
		<slot></slot>
		<slot name="icon"></slot>
		<slot name="textRight"></slot>
	</RouterLink>

	<button
		v-else
		class="button"
		:class="buttonClasses"
		:style="buttonStyle"
		:disabled="disabled || loading"
	>
		<IconLoading v-show="loading" />
		<slot></slot>
		<slot name="icon"></slot>
		<slot name="textRight"></slot>
	</button>
</template>

<style scoped>
	.button {
		--transition: all 0.1s ease-in-out;

		border: 1px solid var(--color-btn-base);
		color: var(--color-btn-base);
		border-radius: 10px;
		height: 50px;
		min-width: 50px;
		padding: 0 10px;
		font-weight: 600;
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		transition: var(--transition);
		outline: none;

		.icon {
			transition: var(--transition);
		}

		&:hover:not([disabled]),
		&:focus-visible {
			box-shadow: 0 0 10px var(--color-white);
		}

		&:active:not([disabled]) {
			--color-btn: var(--color-white);
			box-shadow: 0 0 20px var(--color-white);
		}

		&.no-border:hover {
			box-shadow: none;
			filter: drop-shadow(0px 1px 10px var(--color-white));
		}

		&.no-border:active {
			box-shadow: none;
		}

		&.red {
			color: var(--color-white);
			background-color: var(--color-btn-red);
			border: 1px solid var(--color-btn-red);
		}

		&.blue {
			color: var(--color-white);
			background-color: var(--color-btn-blue);
			border: 1px solid var(--color-btn-blue);
		}

		&.green {
			color: var(--color-white);
			background-color: var(--color-btn-green);
			border: 1px solid var(--color-btn-green);
		}

		&[disabled] {
			opacity: 0.6;
			cursor: default;
		}
	}
</style>
