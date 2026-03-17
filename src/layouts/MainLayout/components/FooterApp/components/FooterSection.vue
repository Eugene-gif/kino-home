<script setup lang="ts">
	import type { FooterSectionData } from '@/layouts/MainLayout/components/FooterApp/types.ts';
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

	const { props } = defineProps<{ props: FooterSectionData }>();
</script>

<template>
	<section class="section">
		<h3 v-if="props.title" class="title">
			<template v-if="props.path">
				<RouterLink :to="props.path">
					{{ props.title }}
				</RouterLink>
			</template>
			<template v-else>
				{{ props.title }}
			</template>
		</h3>

		<ul v-if="props.links.length" class="list">
			<li v-for="link in props.links" :key="link.path" class="item">
				<template v-if="link.isSimpleLink">
					<a :href="link.path" target="_blank" rel="noopener noreferrer">
						<template v-if="link?.icon">
							<SvgIcon :name="link.icon" />
							{{ link.icon }}
						</template>
						<template v-else>
							{{ link.text }}
						</template>
					</a>
				</template>

				<template v-else>
					<RouterLink :to="link.path">
						<template v-if="link?.icon">
							<SvgIcon :name="link.icon" />
							{{ link.icon }}
						</template>
						<template v-else>
							{{ link.text }}
						</template>
					</RouterLink>
				</template>
			</li>
		</ul>
	</section>
</template>

<style scoped>
	.section {
		display: flex;
		flex-direction: column;

		.title {
			font-weight: 600;
			font-size: 16px;
			color: #fff;
			margin-bottom: 15px;
		}

		.list {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.item {
			font-size: 16px;
			font-weight: 400;
		}
	}

	.section:last-of-type .list {
		display: flex;
		flex-direction: row;
	}
</style>
