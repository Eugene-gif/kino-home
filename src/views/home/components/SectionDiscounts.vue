<script setup lang="ts">
	import ButtonApp from '@/components/Button/ButtonApp.vue';

	const items = [
		{
			id: 1,
			image: 'rick.webp',
			title: 'Скидка 50% на активность в сервисе',
			text: 'Смотри кино, принимай участие в развитие сервиса: пиши рецензии, собирай подборки из фильмов и сериалов, проходи квизы. \n \n Копи баллы, и получай скидку 50% на любой тариф при следующей оплате подписки на КиноДом',
			button: {
				text: 'Подробнее',
				class: 'item-btn',
			},
		},
		{
			id: 2,
			image: 'gin.webp',
			title: 'Скидка для студентов 50%',
			text: 'Просто приложи фото действуещего студенческого билета при оформлении подписки и наслаждайся кино! \n \n Важно! Скидка действует до конца текущего года.Студенческая скидка не сумируеться с другими скидками и акциями сервиса',
			button: {
				text: 'Я студент,я хочу скидку!',
				class: 'item-btn red',
			},
		},
	];
</script>

<template>
	<section class="discounts">
		<h2 class="title">Скидки на кино</h2>
		<ul class="list">
			<li v-for="item in items" :key="item.id" class="item">
				<div class="item-icon">
					<img :src="`/icons/discounts/${item.image}`" />
				</div>
				<h3 class="item-title">{{ item.title }}</h3>
				<p class="item-text">
					{{ item.text }}
				</p>
				<ButtonApp :class="item.button.class">{{ item.button.text }}</ButtonApp>
			</li>
		</ul>
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

	.list {
		gap: 10px;
		display: flex;
		align-items: flex-start;
	}

	.item {
		display: flex;
		flex-direction: column;
	}

	.item-icon {
		margin-bottom: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background-color: #141025;
		box-shadow: 0 0 30px 5px #231b4b;
	}

	.item-title {
		margin-bottom: 15px;
		font-weight: 600;
		font-size: 24px;
	}

	.item-text {
		font-weight: 400;
		font-size: 16px;
		line-height: 1.4;
		text-wrap: pretty;
		hyphens: auto;
		white-space: pre-line;
	}

	.item-btn {
		margin-top: 35px;
		align-self: flex-start;
	}

	@media (width <= 800px) {
		.list {
			flex-direction: column;
			max-width: 300px;
			gap: 50px;
			margin: 0 auto;
		}

		.item {
			align-items: center;
			text-align: center;
		}

		.item-btn {
			align-self: stretch;
		}
	}
</style>
