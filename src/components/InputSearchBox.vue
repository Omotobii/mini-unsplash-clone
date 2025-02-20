<script setup lang="ts">
import { ref } from "vue";

const searchTerms = ref<string>("");
const emit = defineEmits(["search"]);

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    emit("search", searchTerms.value);
  }
};
</script>

<template>
  <div class="input">
    <img src="/svg/search.svg" alt="search" />
    <input
      v-model="searchTerms"
      type="text"
      placeholder="Search for photo"
      @keydown="onKeydown"
    />
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Share+Tech+Mono&family=Varela+Round&display=swap");

.input {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  img {
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
    color: gray;
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    color: gray;
    font-size: 1.25rem;
    color: #253b5a;
    font-family: "Varela Round", serif;
    font-weight: 600;
    background: transparent;
  }
}

@media (min-width: 720px) and (max-width: 1080px) {
  .input {
    margin: 3rem 5rem;
  }
}
</style>
