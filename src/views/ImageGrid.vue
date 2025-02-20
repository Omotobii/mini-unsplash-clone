<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import ImageCard from "../components/ImageCard.vue";
import Loading from "../components/loading.vue";
import { useRoute } from "vue-router";
import { useDataStore } from "../stores/data";

const Data = useDataStore();
const images = ref<any>([]);
const route = useRoute();
const loading = ref<boolean>(false);
const selectedImage = ref<any>(null);
const isModalOpen = ref<boolean>(false);

const loadImage = (url: string) => {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
};

const search = async (searchTerm: string) => {
  loading.value = true;
  await Data.getImages(searchTerm);
  images.value = Data.images;

  const imageLoadPromises = images.value.map((image: any) =>
    loadImage(image.urls.small_s3)
  );
  await Promise.all(imageLoadPromises);

  loading.value = false;
};

const openModal = (image: any) => {
  selectedImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = null;
};

watch(
  () => route.query.search,
  (newSearchTerm) => {
    if (newSearchTerm) {
      search(newSearchTerm as string);
    } else {
      search("");
    }
  },
  { immediate: true }
);

onMounted(async () => {
  const searchTerm = (route.query.search as string) || "";
  await search(searchTerm);
});
</script>

<template>
  <div v-if="loading" class="loading-screen">
    <div class="grid-container">
      <Loading v-for="iteration in 8" :key="iteration" />
    </div>
  </div>
  <div v-else>
    <div class="grid-container">
      <ImageCard
        v-for="image in images"
        :imgURL="image.urls.small_s3"
        :author="image.user.name"
        :location="image.user.location"
        :key="image.id"
        @click="openModal(image)"
        class="cursor-pointer"
      />
    </div>
  </div>
  <div v-if="isModalOpen" class="modal">
    <span class="close" @click="closeModal">&times;</span>
    <div class="modal-content">
      <div class="modal-image">
        <img
          :src="selectedImage.urls.full"
          :alt="selectedImage.alt_description"
        />
      </div>
      <div class="modal-description">
        <h4>{{ selectedImage.user.name }}</h4>
        <p>{{ selectedImage.user.location }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: block;
  padding: 1rem;
  margin: -3.5rem 0 auto;
}
.cursor-pointer {
  cursor: pointer;
}

.modal {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: white;
  border-radius: 5px;
  max-width: 75%;
  max-height: 85%;
  overflow: hidden;
}
.modal-image {
  position: relative;
  width: 100%;
  height: 80%;
  img {
    height: 100%;
    object-fit: contain;
  }
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  font-weight: 200;
}

.modal-description {
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 2rem;
  margin-top: 1rem;
  h4 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 800;
  }
  p {
    margin: 0;
    color: gray;
  }
}

@media (min-width: 720px) and (max-width: 1080px) {
  .grid-container {
    columns: 2;
    break-inside: avoid;
    padding: 1rem 4rem;
  }
  .modal-image {
    img {
      width: 100%;
    }
  }
  .close {
    top: 30px;
    right: 70px;
  }
}

@media (min-width: 1081px) {
  .grid-container {
    columns: 3;
    break-inside: avoid;
    padding: 1rem 12rem;
  }
  .modal-image {
    img {
      width: 100%;
    }
  }
  .close {
    top: 30px;
    right: 70px;
  }
}
</style>
