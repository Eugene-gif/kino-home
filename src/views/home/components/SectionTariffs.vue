<script setup lang="ts">
	import { useId } from 'vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconCheckmark from '@/assets/icons/IconCheckmark.vue';
	import IconLock from '@/assets/icons/IconLock.vue';

	const id1 = useId();
	const id2 = useId();
	const id3 = useId();

	const tarrifs = [
		{
			id: id1,
			title: 'Лайт',
			options: [
				{ text: 'Кино и сериалы на каждый день', active: true },
				{ text: 'Суперхиты', active: false },
				{ text: 'Всё для детей', active: false },
				{ text: 'Образовательные передачи', active: false },
				{ text: 'Amediateka и Start', active: false },
			],
			price: 250,
		},
		{
			id: id2,
			title: 'Оптимум',
			options: [
				{ text: 'Кино и сериалы на каждый день', active: true },
				{ text: 'Суперхиты', active: true },
				{ text: 'Всё для детей', active: true },
				{ text: 'Образовательные передачи', active: false },
				{ text: 'Amediateka и Start', active: false },
			],
			price: 300,
		},
		{
			id: id3,
			title: 'Премиум',
			options: [
				{ text: 'Кино и сериалы на каждый день', active: true },
				{ text: 'Суперхиты', active: true },
				{ text: 'Всё для детей', active: true },
				{ text: 'Образовательные передачи', active: true },
				{ text: 'Amediateka и Start', active: true },
			],
			price: 400,
		},
	];
</script>

<template>
	<section class="tariffs">
		<h2 class="title">Тарифные планы</h2>
		<ul class="list">
			<li v-for="card in tarrifs" :key="card.id" class="card">
				<div class="card-info">
					<h3 class="card-info-title">{{ card.title }}</h3>
					<ul class="card-info-list">
						<li
							v-for="option in card.options"
							:key="option.text"
							:class="`card-info-item ${option.active ? '--active' : ''}`"
						>
							<IconCheckmark v-if="option.active" />
							<IconLock v-else />
							{{ option.text }}
						</li>
					</ul>
				</div>

				<div class="card-action">
					<ButtonApp disabled class="red">Оформить подписку</ButtonApp>
					<div class="card-price">{{ card.price }}<span>₽</span></div>
				</div>
			</li>
		</ul>
	</section>
</template>

<style scoped>
	.tariffs {
		--padding-card: 25px;
		margin-bottom: 80px;
	}

	.title {
		margin-bottom: 60px;
		color: #fff;
		text-wrap: balance;
		font-weight: 700;
		font-size: 32px;
	}

	.list {
		display: flex;
		gap: 20px;
		justify-content: space-between;
		align-items: center;
	}

	.card {
		border-radius: 15px;
		max-width: 335px;
		width: 100%;
		background-color: #49235f;
		background-image: linear-gradient(43deg, #470f49 0%, #320a69 46%, #1a0335 100%);
		box-shadow: 0 0 50px 5px #461b56;
	}

	.card-info {
		padding: var(--padding-card) var(--padding-card) 80px var(--padding-card);
		border-bottom: 1px solid var(--text-color-base);
	}

	.card-info-title {
		font-weight: 700;
		font-size: 40px;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: #fff;
	}

	.card-info-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.card-info-item {
		font-weight: 400;
		font-size: 16px;
		display: flex;
		align-items: center;
		gap: 8px;

		&.--active {
			color: #fff;
		}
	}

	.card-action {
		padding: var(--padding-card);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 15px;
	}

	.card-price {
		font-weight: 600;
		font-size: 24px;
		color: #fff;

		span {
			font-size: 16px;
			font-weight: 400;
		}
	}

	@media (width <= 920px) {
		.list {
			flex-direction: column;
			max-width: 350px;
			gap: 30px;
			margin: 0 auto;
		}

		.card {
			max-width: 350px;
		}
	}
</style>
