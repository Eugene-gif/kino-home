<script setup lang="ts">
	interface PropsButtonApp {
		color?: 'red' | 'blue' | '';
		border?: string | undefined;
		round?: boolean | string;
	}

	const props = withDefaults(defineProps<PropsButtonApp>(), {
		color: '',
		border: '',
		round: false,
	});

	const { color, border, round } = props;

	const buttonStyle = {
		border: border,
		borderRadius:
			typeof round === 'boolean' && round
				? '50%'
				: typeof round === 'boolean' && !round
					? ''
					: round,
	};
</script>

<template>
	<button
		class="button"
		:class="[color, border === 'none' ? 'no-border' : '']"
		:style="buttonStyle"
	>
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

		&:hover,
		&:focus-visible {
			box-shadow: 0 0 10px var(--color-white);
		}

		&:active {
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
	}
</style>
