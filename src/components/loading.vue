<script setup lang="ts"></script>

<template>
  <div class="card">
    <div class="skeleton">
      <div class="skeleton-text1"></div>
      <div class="skeleton-text2"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.card {
  display: block;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 2rem;
  width: 100%;
  height: 450px;
  .skeleton {
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    border-radius: 5px;
    padding: 1rem;

    .skeleton-text1,
    .skeleton-text2 {
      background: linear-gradient(90deg, #f6f6f6 25%, #e7e7e7 50%, #f6f6f6 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    .skeleton-text1 {
      position: absolute;
      bottom: 2.25rem;
      width: 40%;
      height: 20px;
      background-color: #e7e7e7;
      margin-bottom: 0.5rem;
    }
    .skeleton-text2 {
      position: absolute;
      bottom: 1rem;
      width: 60%;
      height: 20px;
      background-color: #e7e7e7;
    }
  }
}
</style>
