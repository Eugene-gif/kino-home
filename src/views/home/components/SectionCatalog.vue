<script setup lang="ts">
	const { title } = defineProps<{
		title?: string;
	}>();
</script>

<template>
	<section class="catalog">
		<h2 v-if="title" class="title">{{ title }}</h2>
		<div class="genres-list">
			<slot name="genres"></slot>
		</div>
		<div class="buttons-block">
			<slot name="button"></slot>
		</div>
	</section>
</template>

<style scoped>
	.title {
		margin-bottom: 60px;
		color: #fff;
		text-wrap: balance;
		font-weight: 700;
		font-size: 32px;
	}

	.genres-list {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.buttons-block {
		margin-top: 30px;
	}
</style>
