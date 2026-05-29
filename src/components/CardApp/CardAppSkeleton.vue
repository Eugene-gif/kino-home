<script setup lang="ts"></script>

<template>
	<div class="card-skeleton shimmer" aria-busy="true" aria-label="Загрузка карточки">
		<div class="sk sk-img"></div>

		<div class="card-text">
			<div class="sk sk-text"></div>
			<div class="sk sk-title"></div>
		</div>
	</div>
</template>

<style scoped>
	.card-skeleton {
		display: flex;
		flex-direction: column;
		max-width: 335px;
		gap: 10px;
	}

	.sk {
		display: inline-block;
		background-color: #2b2a2a;
	}

	.sk-img {
		width: 100%;
		height: 270px;
		border-radius: 10px;
	}

	.card-text {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.sk-text {
		height: 10px;
		border-radius: 4px;
	}

	.sk-title {
		height: 28px;
		width: 80%;
		border-radius: 6px;
	}

	.shimmer .sk {
		background: linear-gradient(90deg, #2b2a2a 0%, #3a3838 40%, #2b2a2a 80%);
		background-size: 200% 100%;
		animation: shimmer 1.2s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.shimmer .sk {
			animation: none;
		}
	}
</style>
