<script setup lang="ts">
	const items = [
		{
			id: 1,
			image: 'avatar.webp',
			title: 'Большой выбор',
			text: '10 000 фильмов и сериалов уже в библиотеке. Ежедневное пополнение новинками кино',
		},
		{
			id: 2,
			image: 'iron-man.webp',
			title: 'Список рекомендаций',
			text: 'Персонализированный список рекомендаций, подобранных на основе ваших интересов',
		},
		{
			id: 3,
			image: 'yoda.webp',
			title: 'Лучшее мировое кино',
			text: 'Кино, сериалы со всего мира, включая Европу и Азию.А также достойное российское кино',
		},
		{
			id: 4,
			image: 'ochkosaurus.webp',
			title: 'Месяц бесплатно',
			text: 'Весь каталог КиноДома и все новинки кино и сериало - бесплатно целый месяц после регистрации',
		},
	];
</script>

<template>
	<section class="advantages">
		<h2 class="title">Преимущества КиноДома</h2>
		<ul class="list">
			<li v-for="item in items" :key="item.id" class="item">
				<div class="item-icon">
					<img :src="`/icons/advantages/${item.image}`" />
				</div>
				<h3 class="item-title">{{ item.title }}</h3>
				<p class="item-text">
					{{ item.text }}
				</p>
			</li>
		</ul>
	</section>
</template>

<style scoped>
	.advantages {
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
	}

	@media (width <= 800px) {
		.list {
			flex-direction: column;
			max-width: 300px;
			gap: 20px;
			margin: 0 auto;
		}

		.item {
			align-items: center;
			text-align: center;
		}
	}
</style>
