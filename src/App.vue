<script setup lang="ts">
import { RouterView, useRouter, useRoute } from "vue-router";
import InputSearchBox from "./components/InputSearchBox.vue";

const route = useRoute();
const router = useRouter();

function handleSearch(searchTerm: string) {
  router.push({ path: "/", query: { search: searchTerm } });
}
</script>

<template>
  <div class="extend-bg">
    <div class="search-container">
      <template v-if="route.query.search">
        <p class="search-term">
          Search Results for
          <span class="highlight">"{{ route.query.search }}"</span>
        </p>
      </template>
      <template v-else>
        <InputSearchBox @search="handleSearch" />
      </template>
    </div>
  </div>
  <div class="view-body">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
$primary-color: #dde3ea;

.extend-bg {
  width: 100vw;
  background-color: $primary-color;
}
.view-body {
  max-width: 1280px;
  margin: 0 auto;
}
.search-container {
  width: 100%;
  padding: 2.75rem 1rem;
  margin: 0 auto;
  max-width: 1280px;
  box-sizing: border-box;
  display: flex;
  justify-content: start;

  .search-term {
    font-size: 1.5rem;
    font-weight: 900;
    color: #253b5a;
    font-family: "Varela Round", serif;
    margin: 1rem 2rem;
    .highlight {
      color: #6d778f;
    }
  }
}

@media (min-width: 720px) and (max-width: 1080px) {
  .search-container {
    padding: 3rem 4rem;
    .search-term {
      font-size: 3rem;
      margin: 1rem 3rem;
    }
  }
}

@media (min-width: 1081px) {
  .search-container {
    padding: 6rem 8rem;
    .search-term {
      font-size: 3rem;
      margin: 1rem 3rem;
    }
  }
}
</style>
