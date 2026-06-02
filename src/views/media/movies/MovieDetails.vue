<script setup lang="ts">
	import { computed, watch, onMounted, onUnmounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useMoviesStore } from '@/stores/movies';
	import { useCountriesStore } from '@/stores/countries';
	import { priceWithSymbol } from '@/utils/priceWithSymbol';
	import { formatDateFns, formatDateFnsYear, formatMinutesInHours } from '@/utils/date';
	import { buildImagePath } from '@/utils/images';
  import MovieDetailsSlider from './MovieDetailsSlider.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconPlay from '@/assets/icons/IconPlay.vue';
	import IconCopy from '@/assets/icons/IconCopy.vue';
	import IconHeart from '@/assets/icons/IconHeart.vue';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const props = defineProps<{
		id: string;
	}>();

	const countriesStore = useCountriesStore();
	const { countriesMap } = storeToRefs(countriesStore);

	const moviesStore = useMoviesStore();
	const { fetchMovieDetails } = moviesStore;
	const { detailsMovie, isLoadingMovieDetails, isError } = storeToRefs(moviesStore);

	const movieId = computed(() => Number(props.id));
	const movie = computed(() => {
		return {
			id: movieId.value,
			title: detailsMovie.value?.title,
			tagline: detailsMovie.value?.tagline,
			overview: detailsMovie.value?.overview ?? 'Без описания',
			rating: detailsMovie.value?.vote_average?.toFixed(1) ?? '0.0',
			backdropPath: buildImagePath(detailsMovie.value?.backdrop_path),
			budget: priceWithSymbol(detailsMovie.value?.budget ?? 0),
			cash: priceWithSymbol(detailsMovie.value?.revenue ?? 0),
			releaseDate: formatDateFns(String(detailsMovie.value?.release_date ?? '')),
			year: formatDateFnsYear(String(detailsMovie.value?.release_date ?? '')),
			time: formatMinutesInHours(detailsMovie.value?.runtime ?? 0),
			genres: detailsMovie.value?.genres?.map((el) => el.name).join(', ') ?? '',
			countries:
				detailsMovie.value?.production_countries
					?.map((country) =>
						country.iso_3166_1 ? countriesMap.value[country.iso_3166_1]?.native_name : 'Нет данных',
					)
					.join(', ') ?? '',
			director:
				detailsMovie.value?.credits?.crew?.find((el) => el.job === 'Director')?.name ??
				'Нет данных',
			actors: detailsMovie.value?.credits?.cast?.map((el) => el.name).join(', ') ?? 'Нет данных',
			reviews: detailsMovie.value?.reviews?.results?.map((review) => review) ?? [],
		};
	});

	const aboutList = computed(() => [
		{
			name: 'Рейтинг IMDb',
			value: movie.value.rating,
		},
		{
			name: 'Жанр',
			value: movie.value.genres,
		},
		{
			name: 'Режиссёр',
			value: movie.value.director,
		},
		{
			name: 'Актёрский состав',
			value: movie.value.actors,
		},
		{
			name: 'Страна',
			value: movie.value.countries,
		},
		{
			name: 'Дата релиза',
			value: movie.value.releaseDate,
		},
		{
			name: 'Бюджет',
			value: movie.value.budget,
		},
		{
			name: 'Сборы',
			value: movie.value.cash,
		},
		{
			name: 'Время',
			value: movie.value.time,
		},
	]);

	watch(movieId, async () => {
		await fetchMovieDetails(movieId.value);
	});

	onMounted(() => fetchMovieDetails(movieId.value));

	onUnmounted(() => {
		detailsMovie.value = null;
	});
</script>

<template>
	<div class="page-details tv">
		<div v-if="!isLoadingMovieDetails && !isError" class="page-details-container">
			<section class="header" :style="{ '--bg-url': `url(${movie.backdropPath})` }">
				<h1 class="header__title">
					{{ movie.title }}
				</h1>

				<div class="header__info">
					<span class="header__info-rating">{{ movie.rating }}</span>
					<span class="header__info-text">
						• {{ movie.year }}, {{ movie.genres }} • {{ movie.countries }} • {{ movie.time }}</span
					>
				</div>

				<div class="header__btns">
					<ButtonApp color="red">
						Смотреть фильм
						<template #icon>
							<IconPlay />
						</template>
					</ButtonApp>

					<ButtonApp>Трейлер</ButtonApp>

					<ButtonApp @click="() => console.log('Копировать')">
						<template #icon>
							<IconCopy />
						</template>
					</ButtonApp>

					<ButtonApp @click="() => console.log('Добавить в избранное')">
						<template #icon>
							<IconHeart />
						</template>
					</ButtonApp>
				</div>
			</section>

			<section class="about section">
				<div class="about__header">
					<h3 class="about__title section__title">О фильме</h3>
					<p class="about__text">{{ movie.overview }}</p>
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
				<ul v-if="movie.reviews.length" class="reviews__list">
					<li v-for="review in movie.reviews" :key="review.id" class="reviews__item">
						{{ review }}
					</li>
				</ul>

				<div class="reviews__no-list">Список пуст</div>
			</section>

			<section class="similar section">
				<h3 class="similar__title section__title">Если вам понравился "{{ movie.title }}"</h3>
        <MovieDetailsSlider :title="''" :movies="[]" />
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
        linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 25%),
				var(--bg-url);
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

		.reviews {
			.reviews__no-list {
				font-size: 32px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
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
