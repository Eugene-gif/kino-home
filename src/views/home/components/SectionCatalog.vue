<script setup lang="ts"></script>

<template>
	<section class="catalog">
		<h2 class="title">Каталог фильмов и сериалов</h2>
		<div class="genres-list">
			<slot name="genres"></slot>
		</div>
		<div class="buttons-block">
			<slot name="button"></slot>
		</div>
	</section>
</template>

<style scoped>
	.catalog {
		margin-bottom: 80px;
	}

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
    margin-top: 20px;
  }
</style>
