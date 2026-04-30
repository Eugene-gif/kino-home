<script setup lang="ts">
	import { ref } from 'vue';
	import FooterSection from '@/layouts/MainLayout/components/FooterApp/components/FooterSection.vue';
  import FooterAccordion from './components/FooterAccordion.vue';
  import IconLogo from '@/assets/icons/IconLogo.vue';
	import { FooterData } from './FooterData';

	const isOpen = ref(false);
</script>

<template>
	<footer class="footer">
		<div class="footer-wrapper">
			<div class="footer-content">
        <IconLogo />
				<div class="footer-list">
          <FooterAccordion />
					<FooterSection
						v-for="section in FooterData"
						:key="section.id"
						:props="section"
						:class="['accordeon', isOpen ? 'open' : '']"
					/>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped>
	.footer {
		margin-top: 20px;
		width: 100%;
		border-top: 1px solid #3a354d;

		.footer-wrapper {
			max-width: 1400px;
			margin: 0 auto;
			padding: 20px;
		}

		.footer-content {
			display: flex;
			align-items: flex-start;
			gap: 15%;
			justify-content: space-between;
		}

		.footer-list {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 20px;
			flex-wrap: wrap;
		}
	}
</style>
