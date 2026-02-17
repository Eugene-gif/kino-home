<script setup lang="ts">
	import type { FooterSectionData } from '@/layouts/MainLayout/components/FooterApp/types.ts';
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

	const { props } = defineProps<{ props: FooterSectionData }>();
</script>

<template>
	<!-- <section class="section">
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
				<RouterLink :to="link.path">
					<template v-if="link?.icon">
						{{ link.icon }}
					</template>
					<template v-else>
						{{ link.text }}
					</template>
				</RouterLink>
			</li>
		</ul>
	</section> -->
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
				<RouterLink :to="link.path">
					<template v-if="link?.icon">
            <SvgIcon :name="link.icon" />
						{{ link.icon }}
					</template>
					<template v-else>
						{{ link.text }}
					</template>
				</RouterLink>
			</li>
		</ul>
	</section>
</template>

<style scoped>
	@import './FooterSection.css';
</style>
