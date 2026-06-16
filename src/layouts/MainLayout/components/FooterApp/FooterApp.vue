<script setup lang="ts">
	import FooterSection from '@/layouts/MainLayout/components/FooterApp/FooterSection.vue';
	import IconLogo from '@/assets/icons/IconLogo.vue';
	import { FooterData } from './FooterData';
</script>

<template>
	<footer class="footer">
		<div class="footer-wrapper">
			<div class="footer-content">
				<IconLogo class="footer-logo" />
				<div class="footer-list">
					<FooterSection
						class="footer-section"
						v-for="section in FooterData"
						:key="section.id"
						:props="section"
					/>
				</div>
			</div>
      <div class="footer-copyright">© КиноДом 2026</div>
		</div>
	</footer>
</template>

<style scoped>
	.footer {
		margin-top: 60px;
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
			gap: 3%;
			justify-content: space-between;
		}

		.footer-logo {
			flex-shrink: 0;
		}

		.footer-list {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 20px;
			flex-wrap: wrap;
		}

    .footer-copyright {
      margin-top: 30px;
    }

    .footer-section:nth-last-of-type(2) {
      margin-left: auto;
    }

		@media (width <= 1068px) {
			.footer-section:last-of-type {
				margin-left: 0;
				flex-grow: 0;
			}

			.footer-section:nth-last-of-type(2) {
				margin-left: auto;
			}
		}

		@media (width <= 868px) {
			.footer-content {
				gap: 30px;
			}

			.footer-list {
				display: grid;
				grid-template-columns: 1fr 1fr;
				row-gap: 40px;
				column-gap: 20px;
			}

			.footer-section:nth-last-of-type(2) {
				margin-left: 0;
			}
		}

		@media (width <= 768px) {
      .footer-content {
        flex-direction: column;
        row-gap: 15px;
      }
      .footer-list {
        display: flex;
        row-gap: 10px;
        flex-direction: column;
        width: 100%;
      }
		}
	}
</style>
