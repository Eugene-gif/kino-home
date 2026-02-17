<script setup lang="ts">
	// import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
	import ButtonC from '@/components/Button/ButtonC.vue';
	import InputSearch from '@/components/Inputs/InputSearch/InputSearch.vue';

	const searchText = ref<string>('');
</script>

<template>
	<header class="header">
		<div class="header-wrapper">
			<div class="header-content">
				<RouterLink class="header-logo" to="/">
					<SvgIcon name="logo" width="150px" height="35px" />
				</RouterLink>

				<nav class="header-nav" aria-label="Основное меню">
					<ul class="nav-list">
						<li class="nav-item"><RouterLink to="/">Главная</RouterLink></li>
						<li class="nav-item"><RouterLink to="/movies">Фильмы</RouterLink></li>
						<li class="nav-item"><RouterLink to="/icons">Иконки</RouterLink></li>
						<li class="nav-item search">
							<InputSearch v-model:text="searchText" />
						</li>
					</ul>
				</nav>

				<ul class="header-options">
					<li class="options-item">
						<ButtonC iconName="bell" border="none" iconSize="22px" />
					</li>
					<li class="options-item">
						<ButtonC iconName="user" />
					</li>
				</ul>
        {{ searchText }}
			</div>
		</div>
	</header>
</template>

<style scoped>
	@import './HeaderApp.css';
</style>
