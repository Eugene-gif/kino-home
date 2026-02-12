<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
</script>

<template>
  <div class="about">
    <h1>Страница иконок</h1>
    <div class="list">
      <SvgIcon name="search" />
      <SvgIcon name="community" />
      <SvgIcon name="phone" color="green" width="30" height="30"/>
      <SvgIcon name="mail"/>
      <SvgIcon name="copy"/>
      <SvgIcon name="master-card" />
      <SvgIcon name="logo" />
      <SvgIcon name="like" />
      <SvgIcon name="dislike" />
      <SvgIcon name="heart" />
      <SvgIcon name="user" />
      <SvgIcon name="social-fb" />
      <SvgIcon name="social-insta" />
      <SvgIcon name="social-vk" />
    </div>
  </div>
</template>

<style scoped>
  .list {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
  }

  .dislike {
    rotate: 180deg;
  }
</style>
