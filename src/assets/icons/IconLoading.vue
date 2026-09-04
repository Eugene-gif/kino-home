<template>
	<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="1em" height="1em" viewBox="0 0 24 24">
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<path stroke-dasharray="18" d="M12 3c4.97 0 9 4.03 9 9">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="18;0" />
				<animateTransform
					attributeName="transform"
					dur="0.7s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				/>
			</path>
			<path
				stroke-dasharray="60"
				d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
				opacity=".3"
			>
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="60;0" />
			</path>
		</g>
	</svg>
</template>

<style scoped>
	@import './icon.css';
</style>
