<script setup lang="ts">
	import { provide, useId } from 'vue';

	const uuid = useId();
	provide('field-id', uuid);
</script>

<template>
	<div class="form-field">
		<slot></slot>
	</div>
</template>

<style scoped>
	.form-field {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.form-field:has(input:focus) :deep(.label) {
		color: var(--color-white);
	}
</style>
