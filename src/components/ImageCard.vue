<script setup lang="ts">
defineProps<{ imgURL: string; author: string; location: string }>();
</script>

<template>
  <div class="card">
    <div class="overlay"></div>
    <img :src="imgURL" :alt="author" />
    <div class="card-description">
      <h4>{{ author }}</h4>
      <p>{{ location }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: block;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 2rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  .overlay {
    position: absolute;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 1)
    );
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  img {
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  &-description {
    position: absolute;
    bottom: 0px;
    // background: #000;
    left: 0;
    right: 0;
    padding: 0 1rem;
    margin: 0;
    h4 {
      color: white;
      margin: 0;
      font-size: larger;
      font-weight: 900;
      margin-bottom: 3px;
    }
    p {
      margin-top: 0;
      color: white;
    }
  }
}
</style>
