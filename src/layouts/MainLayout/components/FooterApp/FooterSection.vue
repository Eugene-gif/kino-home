<script setup lang="ts">
	import type { FooterSectionData } from '@/layouts/MainLayout/components/FooterApp/types.ts';
	import type { Component } from 'vue';

	import IconChevron from '@/assets/icons/IconChevron.vue';
	import IconMail from '@/assets/icons/IconMail.vue';
	import IconPhone from '@/assets/icons/IconPhone.vue';
	import IconSocialFb from '@/assets/icons/IconSocialFb.vue';
	import IconSocialVk from '@/assets/icons/IconSocialVk.vue';
	import IconSocialInsta from '@/assets/icons/IconSocialInsta.vue';

	const footerIcons: Record<string, Component> = {
		mail: IconMail,
		phone: IconPhone,
		fb: IconSocialFb,
		vk: IconSocialVk,
		insta: IconSocialInsta,
	};

	const { props } = defineProps<{ props: FooterSectionData }>();
</script>

<template>
	<section class="section">
		<input type="checkbox" :id="`section_${props.id}`" name="section_accordion" />
		<label :for="`section_${props.id}`" class="section__label">
			<h3 class="section__title">{{ props.title }}</h3>
			<IconChevron class="section__icon-chevron" />
		</label>

		<div class="section__content content">
			<div class="content--inner">
				<ul v-if="props.links.length" class="content__list">
					<li v-for="link in props.links" :key="link.path" class="content__item">
						<a v-if="link.isSimpleLink" :href="link.path" target="_blank" rel="noopener noreferrer">
							<component v-if="link.icon" :is="footerIcons[link.icon]" class="content__icon" />
							{{ link.text }}
						</a>

						<RouterLink v-else :to="link.path">
							<component v-if="link.icon" :is="footerIcons[link.icon]" class="content__icon" />
							{{ link.text }}
						</RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.section {
		display: flex;
		flex-direction: column;
	}

	.section input[type='checkbox'] {
		display: none;
	}

	.section__label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: transparent;
		cursor: pointer;
		font-weight: bold;
		text-align: left;
	}

	.section__title {
		font-weight: 600;
		font-size: 16px;
		color: #fff;
		margin-bottom: 15px;
	}

	.section__icon-chevron {
		display: none;
		align-items: center;
		transition: transform 0.3s ease;
		width: 24px;
		height: 24px;
	}

	.section:last-of-type .content__list {
		flex-direction: row;
		.item a > .footer-icon {
			width: 24px;
			height: 24px;
		}
	}

	.content--inner,
	.section__content {
		display: contents;
	}

	.content__list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}

	.content__item {
		font-size: 16px;
		font-weight: 400;
	}

	.content__item a {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.section input[type='checkbox']:checked + .section__label + .section__content {
		max-height: 500px;
		height: auto;
	}

	.section input[type='checkbox']:checked + .section__label .section__icon-chevron {
		transform: rotate(180deg);
	}

	@media (width <= 768px) {
		.section:not(:last-of-type):not(:nth-last-of-type(2)) {
			display: block;
			width: inherit;
			border-bottom: 1px solid #4a385e;

			.section__label {
				padding: 8px 0;
			}

			.section__title {
				margin: 0;
			}

			.section__icon-chevron {
				display: flex;
			}

			.section__content {
				display: block;
				padding: 0px;
				font-size: 14px;
				overflow: hidden;
				transition: max-height 0.3s ease;
				max-height: 0px;
				padding: 0 8px;
			}

			.content--inner {
				display: block;
				padding: 10px 0;
			}
		}

		.section:last-of-type {
			margin-top: 10px;
			.section__label {
				display: none;
			}
		}
	}
</style>
