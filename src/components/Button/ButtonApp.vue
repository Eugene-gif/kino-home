<script setup lang="ts">
	interface PropsButtonApp {
		width?: string;
		height?: string;
		color?: string;
		bgColor?: string;
		border?: string | undefined;
		round?: boolean | string;
		red?: boolean;
	}

	const props = withDefaults(defineProps<PropsButtonApp>(), {
		width: '',
		height: '',
		color: '',
		bgColor: '',
		border: '',
		round: false,
	});

	const { width, height, color, bgColor, border, round } = props;

	const buttonStyle = {
		width: width,
		height: height,
		color: color,
		backgroundColor: bgColor,
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
	<button class="button" :style="buttonStyle">
		<slot></slot>
		<slot name="icon"></slot>
		<slot name="textRight"></slot>
	</button>
</template>

<style scoped>
	.button {
		--color-btn: #898792;
		--transition: all 0.1s ease-in-out;

		border: 1px solid var(--color-btn);
		color: var(--color-btn);
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
			box-shadow: 0 0 10px #fff;
		}

		&:active {
			--color-btn: #fff;
			box-shadow: 0 0 20px #fff;
		}

		&.red {
			color: var(--color-white);
			background-color: var(--color-red);
			border: 1px solid var(--color-red);
		}
	}
</style>
