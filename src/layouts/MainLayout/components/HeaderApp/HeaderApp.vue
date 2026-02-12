<script setup lang="ts">
  // import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
  import { RouterLink } from 'vue-router';
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
  import ButtonComponent from '@/components/Button/ButtonComponent.vue';
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink class="header-logo" to="/">
        <SvgIcon name="logo"
        width="150px"
        height="35px"
      />
      </RouterLink>

      <nav class="header-nav" aria-label="Основное меню">
        <ul class="nav-list">
          <li class="nav-item"><RouterLink to="/">Home</RouterLink></li>
          <li class="nav-item"><RouterLink to="/movies">Фильмы</RouterLink></li>
          <li class="nav-item"><RouterLink to="/icons">Icons</RouterLink></li>
        </ul>
      </nav>

      <ul class="header-options">
        <li class="options-item">
          <ButtonComponent iconName="search" border="none" />
        </li>
        <li class="options-item">
          <ButtonComponent iconName="bell" border="none" iconSize="22px" />
        </li>
        <li class="options-item">
          <ButtonComponent iconName="user" />
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
  @import './HeaderApp.css';
</style>
