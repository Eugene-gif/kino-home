<script setup lang="ts">
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

	const props = defineProps<{
		text: string;
	}>();

	const emit = defineEmits<{
		(e: 'update:text', value: string): void;
	}>();

	const onInput = (e: Event) => {
		emit('update:text', (e.target as HTMLInputElement).value);
	};
</script>

<template>
	<div class="container">
		<input
			:value="props.text"
			@input="onInput"
			type="text"
			name="text"
			class="input"
			required
			placeholder="Название фильма"
		/>
		<div class="icon">
			<SvgIcon name="search" />
		</div>
	</div>
</template>

<style scoped>
	@import './InputSearch.css';
</style>
