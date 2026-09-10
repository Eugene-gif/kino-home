<script setup lang="ts">
	import { computed, watch, onUnmounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useTvStore } from '@/stores/tv';
	import { useCountriesStore } from '@/stores/countries';
	import { useGenresStore } from '@/stores/genres.ts';
	import { useAuthStore } from '@/stores/auth';
	import { useFavoriteStore } from '@/stores/favorite';
	import { formatDateFns, formatDateFnsWithTime, formatDateFnsYear } from '@/utils/date';
	import { buildImagePath } from '@/utils/images';
	import SingleSliderList from '@/components/SingleSliderList/SingleSliderList.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import ReviewItem from '@/components/ReviewItem/ReviewItem.vue';
	import IconCopy from '@/assets/icons/IconCopy.vue';
	import IconHeart from '@/assets/icons/IconHeart.vue';
	import IconHeartFavorite from '@/assets/icons/IconHeartFavorite.vue';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const props = defineProps<{
		id: string;
	}>();

	const genresStore = useGenresStore();
	const { getGenreNamesByIds } = genresStore;

	const countriesStore = useCountriesStore();
	const { countriesMap } = storeToRefs(countriesStore);

	const tvStore = useTvStore();
	const { fetchTvDetails } = tvStore;
	const { detailsTv, isLoadingTvDetails, isError } = storeToRefs(tvStore);

	const authStore = useAuthStore();
	const { isAuth } = storeToRefs(authStore);

	const favoriteStore = useFavoriteStore();
	const { currentFavoriteItem, addedFavorite, isLoadingFavoriteById } = storeToRefs(favoriteStore);
	const { addFavoriteItem, deleteFavoriteItem, getFavoriteItem } = favoriteStore;

	const tvId = computed(() => Number(props.id));
	const tv = computed(() => {
		return {
			id: tvId.value,
			title: detailsTv.value?.name,
			tagline: detailsTv.value?.tagline,
			overview: detailsTv.value?.overview ?? 'Без описания',
			rating: detailsTv.value?.vote_average?.toFixed(1) ?? '0.0',
			backdropPath: buildImagePath(detailsTv.value?.backdrop_path),
			firstAirDate: formatDateFns(String(detailsTv.value?.first_air_date ?? '')), // первый эфир
			lastAirDate: formatDateFns(String(detailsTv.value?.last_air_date ?? '')), // последний эфир
			firstDateYear: formatDateFnsYear(String(detailsTv.value?.first_air_date ?? '')),
			lastDateYear: formatDateFnsYear(String(detailsTv.value?.last_air_date ?? '')),
			genres: detailsTv.value?.genres?.map((el) => el.name).join(', ') ?? '',
			seasons: detailsTv.value?.seasons,
			numOfSeasons: detailsTv.value?.number_of_seasons,
			countries:
				detailsTv.value?.production_countries
					?.map((country) =>
						country.iso_3166_1 ? countriesMap.value[country.iso_3166_1]?.native_name : 'Нет данных',
					)
					.join(', ') ?? '',
			director:
				detailsTv.value?.credits?.crew?.find((el) => el.job === 'Director')?.name ?? 'Нет данных',
			actors: actorsList.value,
			reviews: detailsTv.value?.reviews?.results?.map((review) => review) ?? [],
		};
	});

	const actorsList = computed(() => {
		if (!detailsTv.value?.credits?.cast?.length) return 'Нет данных';

		const actors = detailsTv.value?.credits?.cast;
		return (
			actors
				.slice(0, 10)
				.map((el) => el.name)
				.join(', ') + (actors.length > 10 ? ' и др.' : '')
		);
	});

	const aboutList = computed(() => [
		{
			name: 'Рейтинг IMDb',
			value: tv.value.rating,
		},
		{
			name: 'Жанр',
			value: tv.value.genres,
		},
		{
			name: 'Режиссёр',
			value: tv.value.director,
		},
		{
			name: 'Актёрский состав',
			value: tv.value.actors,
		},
		{
			name: 'Страна',
			value: tv.value.countries,
		},
		{
			name: 'Первый эфир',
			value: tv.value.firstAirDate,
		},
		{
			name: 'Последний эфир',
			value: tv.value.lastAirDate,
		},
		{
			name: 'Количество сезонов',
			value: tv.value.numOfSeasons,
		},
	]);

	const reviewsList = computed(() =>
		detailsTv.value?.reviews?.results?.map((review) => {
			return {
				id: review.id,
				avatar: buildImagePath(review?.author_details?.avatar_path),
				name:
					review.author ||
					review.author_details?.name ||
					review.author_details?.username ||
					'Неизвестный пользователь',
				content: review.content ?? 'Нет данных',
				date: formatDateFnsWithTime(review.updated_at ?? review.created_at ?? ''),
				rating: String(review.author_details?.rating),
			};
		}),
	);

	const recommendationsList = computed(() => {
		return detailsTv.value?.recommendations?.results?.map((el) => ({
			id: el.id ?? 0,
			title: el.name ?? '',
			rating: Number(el.vote_average).toFixed(1),
			imageUrl: buildImagePath(el.poster_path),
			genreNames: getGenreNamesByIds(el.genre_ids ?? [], 'tv'),
			mediaType: el.media_type ?? 'tv',
		}));
	});

	const getDataTv = async () => {
		let getItemFromFavoriteList = null;
		if (isAuth) getItemFromFavoriteList = getFavoriteItem(tvId.value);
		await Promise.allSettled([getItemFromFavoriteList, fetchTvDetails(tvId.value)]);
	};

	watch(tvId, getDataTv, { immediate: true });

	onUnmounted(() => {
		currentFavoriteItem.value = null;
		detailsTv.value = null;
	});
</script>

<template>
	<div class="page-details tv">
		<div v-if="!isLoadingTvDetails && !isError" class="page-details-container">
			<section class="header" :style="{ '--bg-url': `url(${tv.backdropPath})` }">
				<h1 class="header__title">
					{{ tv.title }}
				</h1>
				<p class="header__tagline">{{ tv.tagline }}</p>

				<div class="header__info">
					<span class="header__info-rating">{{ tv.rating }}</span>
					<span class="header__info-text">
						• {{ tv.firstDateYear }}, {{ tv.genres }} • {{ tv.countries }} • Сезонов:
						{{ tv.numOfSeasons }}</span
					>
				</div>

				<div class="header__btns">
					<ButtonApp>Трейлер</ButtonApp>

					<ButtonApp @click="() => console.log('Копировать')">
						<template #icon>
							<IconCopy />
						</template>
					</ButtonApp>

					<ButtonApp
						v-if="isAuth"
						:loading="isLoadingFavoriteById"
						@click="() => (!addedFavorite ? addFavoriteItem(tv, 'tv') : deleteFavoriteItem(tvId))"
					>
						<template v-if="!isLoadingFavoriteById" #icon>
							<IconHeart v-if="!addedFavorite" />
							<IconHeartFavorite v-else />
						</template>
						<template #textRight>{{
							!addedFavorite ? 'Добавить в избранное' : 'В избранном'
						}}</template>
					</ButtonApp>
				</div>
			</section>

			<section class="about section">
				<div class="about__header">
					<h3 class="about__title section__title">О сериале</h3>
					<p class="about__text">{{ tv.overview }}</p>
				</div>

				<ul class="about__list">
					<li class="about__item item" v-for="(item, idx) in aboutList" :key="idx + 1">
						<span class="item__name">{{ item.name }}:</span>
						<span class="item__value">{{ item.value }}</span>
					</li>
				</ul>
			</section>

			<section class="reviews section">
				<h3 class="reviews__title section__title">Рецензии</h3>
				<ul v-if="tv.reviews.length" class="reviews__list">
					<ReviewItem
						v-for="review in reviewsList"
						:key="review.id"
						:avatar="review.avatar"
						:name="review.name"
						:date="review.date"
						:rating="review.rating"
						:content="review.content"
					/>
				</ul>

				<div v-else class="reviews__no-list">Список пуст</div>
			</section>

			<section class="similar section">
				<h3 class="similar__title section__title">Если вам понравился "{{ tv.title }}"</h3>
				<SingleSliderList :items="recommendationsList" />
			</section>
		</div>

		<div v-else-if="isError" class="error-block">Данные не загружены, попробуйте позже</div>
		<LoaderApp v-else />
	</div>
</template>

<style scoped>
	.page-details {
		--wrapper-width: 690px;

		.page-details-container {
			display: flex;
			flex-direction: column;
			gap: 60px;
		}

		.header {
			max-width: 800px;
			margin-bottom: 60px;
			margin-top: 350px;
		}

		.header::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 700px;
			z-index: -1;
			background-image:
				linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 30%, rgba(20, 16, 37, 1) 100%),
				linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 25%), var(--bg-url);
			background-size: cover;
			background-position: center top;
			background-repeat: no-repeat;
		}

		.header__title {
			font-weight: 800;
			font-size: 64px;
			line-height: 100%;
			letter-spacing: 0.01em;
			color: #fff;
			margin-bottom: 20px;
		}

		.header__tagline {
			font-weight: 500;
			font-size: 18px;
			line-height: 140%;
			margin-bottom: 30px;
		}

		.header__info {
			font-weight: 500;
			font-size: 16px;
			color: var(--color-white);
			margin-bottom: 35px;
		}

		.header__info-rating {
			color: var(--color-red);
			font-weight: 600;
		}

		.header__btns {
			display: flex;
			align-items: center;
			gap: 15px;
		}

		.section {
			max-width: var(--wrapper-width);
		}

		.section__title {
			font-weight: 700;
			font-size: 32px;
			color: #fff;
			margin-bottom: 40px;
		}

		.section {
			margin-bottom: 80px;
		}

		/* section about */
		.about {
			display: flex;
			max-width: 100%;
			justify-content: space-between;
			align-items: flex-start;
			outline-offset: 10px;
			position: relative;

			.about__header {
				max-width: var(--wrapper-width);
			}

			.about__text {
				font-weight: 500;
				font-size: 18px;
				line-height: 140%;
			}

			.about__list {
				position: absolute;
				right: 0;
				max-width: 400px;
				display: flex;
				flex-direction: column;
				gap: 20px;
				padding-left: 25px;
			}

			.about__item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				gap: 30px;
			}

			.about__item:nth-child(1) .item__value {
				color: var(--color-red);
				font-weight: 600;
			}

			.item__name {
				font-weight: 400;
				font-size: 16px;
				line-height: 1.4;
				white-space: nowrap;
				width: 160px;
			}

			.item__value {
				overflow-wrap: break-word;
				hyphens: auto;
				max-width: 250px;
				text-align: right;
				color: var(--color-white);
			}
		}

		/* section reviews */
		.reviews {
			.reviews__list {
				display: flex;
				flex-direction: column;
				gap: 40px;
			}

			.reviews__no-list {
				font-size: 32px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.similar.section {
			max-width: 100%;
		}

		@media (width <= 1120px) {
			.about {
				.about__list {
					max-width: 320px;
				}

				.about__item {
					gap: 10px;
				}
			}
		}

		@media (width <= 1080px) {
			--wrapper-width: 100%;

			.header__title {
				font-size: 48px;
			}

			.about {
				flex-direction: column;
				gap: 50px;
				max-width: var(--wrapper-width);
				position: static;

				.about__list {
					max-width: 100%;
					width: 100%;
					position: static;
					padding-left: 0;
				}

				.about__item {
					gap: 20px;
				}

				.item__value {
					max-width: 500px;
				}
			}
		}

		@media (width <= 860px) {
			.header__title {
				font-size: 36px;
			}

			.block__title {
				font-size: 28px;
			}
		}
	}

	.error-block {
		font-size: 42px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
	}
</style>
