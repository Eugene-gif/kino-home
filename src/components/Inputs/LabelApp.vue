<script setup lang="ts">
	import { inject } from 'vue';
  import { FIELD_ID } from '@/constants/constants';

	const { text, id } = defineProps<{
		text: string;
		id?: string;
	}>();

	const labelId = id ?? inject<string>(FIELD_ID);
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
