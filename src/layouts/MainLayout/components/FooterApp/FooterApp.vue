<script setup lang="ts">
	import { ref } from 'vue';
	import FooterSection from '@/layouts/MainLayout/components/FooterApp/components/FooterSection/FooterSection.vue';
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
	import { FooterData } from './FooterData';

	const isOpen = ref(false);
</script>

<template>
	<footer class="footer">
		<div class="footer-wrapper">
			<div class="footer-content">
				<!-- <RouterLink class="footer-logo" to="/"> -->
				<SvgIcon name="logo" width="150px" height="35px" />
				<!-- </RouterLink> -->
				<div class="footer-list">
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
	@import './FooterApp.css';
</style>
