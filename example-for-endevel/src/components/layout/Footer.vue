<template>
  <div class="pb-2">
    <hr class="h-px border-0 bg-brand-green" />
    <div class="mt-4">
      <nav class="flex flex-col items-center">
        <div class="hover:animate-pulse font-semibold text-brand-link"><RouterLink to="/">Home</RouterLink></div>
        <div class="mt-1 font-semibold text-brand-link-light">
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">vuejs.org</a>
        </div>
      </nav>
      <div class="text-sm text-right text-gray">Version: {{envConfig.appVersion}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { envConfig } from '@/config/envConfig';
</script>

<style lang="scss" scoped></style>
