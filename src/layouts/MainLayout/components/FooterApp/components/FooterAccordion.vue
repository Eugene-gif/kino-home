<script setup lang="ts">
	import IconChevron from '@/assets/icons/IconChevron.vue';
</script>

<template>
	<div class="accordion">
		<div class="accordion-item">
			<input type="checkbox" id="section1" name="accordion" />
			<label for="section1" class="accordion-header">
				<h3 class="accordion-title">Section 1</h3>
				<IconChevron class="accordion-icon" />
			</label>
			<div class="content">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorem odit consequatur
					reprehenderit. Nesciunt odio necessitatibus nisi rem aut vitae qui rerum sequi, quaerat
					quas hic nulla tenetur recusandae provident sunt, eligendi, incidunt corporis voluptas
					harum alias voluptates voluptatum consequuntur! Ratione nemo, delectus explicabo illum
					harum assumenda deserunt, consequuntur inventore, ducimus ipsam facere doloribus dolore
					sit. Quam ad voluptatum, officia, magni natus vel nam unde distinctio voluptates libero
					et. Exercitationem veritatis suscipit incidunt dignissimos vero iure consequatur nisi,
					nostrum animi sit consequuntur magni inventore quia! Sequi tenetur vitae autem consequatur
					nulla ab qui possimus ex magni consequuntur id, pariatur nostrum.
				</p>
			</div>
		</div>

		<div class="accordion-item">
			<input checked type="checkbox" id="section2" name="accordion" />
			<label for="section2" class="accordion-header">
				<h3 class="accordion-title">Section 2</h3>
				<IconChevron class="accordion-icon" />
			</label>
			<div class="content">
				<p>This is the content for Section 2.</p>
			</div>
		</div>

		<div class="accordion-item">
			<input type="checkbox" id="section3" name="accordion" />
			<label for="section3" class="accordion-header">
				<h3 class="accordion-title">Section 3</h3>
				<IconChevron class="accordion-icon" />
			</label>
			<div class="content">
				<p>This is the content for Section 3.</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.accordion {
		width: 300px;
		margin: 0 auto;
	}

	.accordion-item {
		margin-bottom: 5px;
	}

	.accordion-item .content {
		font-size: 14px;
	}

	.accordion input[type='checkbox'] {
		display: none;
	}

	.accordion .content {
		padding: 0px;
		background-color: transparent;
		border-top: 1px solid #ccc;
		overflow: hidden;
		transition: max-height 0.3s ease;
		max-height: 0px;
		padding: 0 15px;
    background-color: darkcyan;
	}

	.accordion input[type='checkbox']:checked + .accordion-header + .content {
		max-height: 500px;
		height: auto;
	}

	.accordion-icon {
		display: flex;
		align-items: center;
		transition: max-height 0.3s ease;
	}

	.accordion input[type='checkbox']:checked + .accordion-header .accordion-icon {
		transform: rotate(180deg);
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		background-color: darkcyan;
		cursor: pointer;
		font-weight: bold;
		text-align: left;
	}

	.accordion-header .accordion-title {
		font-size: 14px;
	}
</style>
