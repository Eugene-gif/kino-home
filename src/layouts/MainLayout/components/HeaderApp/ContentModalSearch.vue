<script setup lang="ts">
	import { routeNames } from '@/constants/routesData';

	import type {
		ModalSearchCardItem,
		PersonCardItem,
	} from '@/layouts/MainLayout/components/HeaderApp/headerTypes';

	interface PropsContentModalSearch {
		uiTrendingList: ModalSearchCardItem[];
		uiSearchedList: ModalSearchCardItem[];
		uiPersonList: PersonCardItem[];
		lenSearchedList: number | string;
		isLoadedSearch: boolean;
	}

	const emits = defineEmits(['closeModal']);

	const props = withDefaults(defineProps<PropsContentModalSearch>(), {
		uiTrendingList: () => [],
		uiPersonList: () => [],
		uiSearchedList: () => [],
		lenSearchedList: 0,
		isLoadedSearch: false,
	});

	const { uiTrendingList, uiPersonList, uiSearchedList } = props;

	const closeModal = () => emits('closeModal');
</script>

<template>
	<div class="modal-search-content">
		<section v-if="lenSearchedList" class="found">
			<h2 class="title">Все результаты ></h2>
			<ul class="list">
				<li class="item" v-for="film in uiSearchedList" :key="film.id">
					<RouterLink
						@click="closeModal"
						:to="{
							name: film.mediaType === 'movie' ? routeNames.movieDetails : routeNames.tvDetails,
							params: { id: film.id },
						}"
					>
						<img class="item__img" :src="film.imageUrl" :alt="film.title" />
						<span class="item__title">{{ film.title }}</span>
					</RouterLink>
				</li>
			</ul>
		</section>

		<section v-else-if="!lenSearchedList && isLoadedSearch">
			<div class="title">Нет результатов</div>
		</section>

		<section v-else class="often-searched">
			<h2 class="title">Часто ищут</h2>
			<ul v-if="uiTrendingList.length" class="list">
				<li class="item" v-for="film in uiTrendingList.slice(0, 8)" :key="film.id">
					<RouterLink
						@click="closeModal"
						:to="{
							name: film.mediaType === 'movie' ? routeNames.movieDetails : routeNames.tvDetails,
							params: { id: film.id },
						}"
					>
						<img class="item__img" :src="film.imageUrl" :alt="film.title" />
						<span class="item__title">{{ film.title }}</span>
					</RouterLink>
				</li>
			</ul>

			<div v-else>Список пуст</div>

			<div class="persons">
				<h3 class="persons__title">Актёры и режисеры</h3>
				<ul v-if="uiPersonList.length" class="persons__list">
					<li class="person-item" v-for="person in uiPersonList.slice(0, 8)" :key="person.id">
						<div class="person-item__name">
							{{ person.name }}
						</div>
						<span class="person-item__profession">
							{{ person.profession }}
						</span>
					</li>
				</ul>

				<div v-else>Список пуст</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
	.title {
		font-weight: 700;
		font-size: 32px;
		color: #fff;
		margin-bottom: 30px;
	}

	.list {
		display: grid;
		row-gap: 25px;
		column-gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	}

	.item a {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.item__img {
		border-radius: 5px;
		width: 150px;
		max-height: 80px;
		flex-shrink: 0;
		object-fit: cover;
		user-select: none;
		aspect-ratio: 2 / 3;
		background-color: #363434;
	}

	.item__title {
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		text-wrap: balance;
	}

	.persons {
		margin-top: 40px;
	}

	.persons__title {
		font-weight: 600;
		font-size: 16px;
		text-transform: uppercase;
		color: #fff;
	}

	.persons__list {
		display: grid;
		gap: 15px;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	}

	.person-item {
		display: flex;
		align-items: start;
		flex-direction: column;
		gap: 3px;
	}

	.person-item__name {
		font-size: 14px;
		font-weight: 400;
		color: #fff;
	}

	.person-item__profession {
		font-size: 10px;
		font-weight: 400;
	}

	/* .found {
		font-size: 14px;
		padding: 15px;
		border-radius: 10px;
		border: 1px solid #3a354d;
	} */
</style>
