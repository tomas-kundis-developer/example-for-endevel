<template>
  <div class="pb-2">
    <hr class="h-px border-0 bg-brand-green" />
    <div class="mt-4">
      <nav class="flex flex-col items-center">
        <div class="hover:animate-pulse font-semibold text-brand-link">
          <RouterLink to="/"><font-awesome-icon icon="fa-solid fa-house" class="mr-2" />Home</RouterLink>
        </div>
        <div class="mt-1 font-semibold text-brand-link-light">
          <font-awesome-icon icon="fa-brands fa-vuejs" class="mr-2" />
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">vuejs.org</a>
        </div>
      </nav>
      <div class="text-sm text-right text-gray">Version: {{ appVersion }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { envConfig } from '@/config/envConfig';

const appVersion = envConfig.appVersion;
</script>

<style lang="scss" scoped></style>
