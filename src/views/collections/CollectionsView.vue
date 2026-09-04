<script setup lang="ts"></script>

<template>
	<div class="collections">
		<h1 class="title">Коллекции</h1>
    <p>Скоро здесь вы сможете создавать свои коллекции кино</p>
	</div>
</template>

<style scoped>
	.list {
		display: flex;
		gap: 5px;
		align-items: center;
		justify-content: flex-start;
	}

	.form {
		margin-top: 40px;
		padding: 10px;
		border: 1px solid var(--color-grey);
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 500px;

		input {
			padding: 15px;
			border: 1px solid var(--color-grey);
			border-radius: 10px;
			color: var(--color-white);
			font-size: 16px;
			font-weight: 500;
		}
	}
</style>
