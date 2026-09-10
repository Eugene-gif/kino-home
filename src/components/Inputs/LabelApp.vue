<script setup lang="ts">
	import { inject } from 'vue';

	const { text, id } = defineProps<{
		text: string;
		id?: string;
	}>();

	const labelId = id ?? inject<string>('field-id');
</script>

<template>
	<label class="label" :for="labelId"> {{ text }} </label>
</template>

<style scoped>
	.label {
		font-size: 18px;
		font-weight: 600;
	}
</style>
