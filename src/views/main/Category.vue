<template>
  <div>
    <div class="d-flex flex-column align-center">
      <h1>Selecione a categoria desejada e veja as plantas correspondentes!</h1>
      <div style="width: 600px">
        <v-select
          @change="getPlantsByCategoryId"
          v-model="selectedCategory"
          :items="categories"
          item-text="name"
          item-value="id"
          background-color="white"
          dense
          placeholder="Selecione uma categoria"
          outlined
        />
      </div>
      <h2 v-if="selectedCategory && !plants.length">
        Não foi possível encontrar plantas dessa categoria.
      </h2>
      <div v-if="plants.length" >
        <h2 class="mb-4 text-center">{{ category.name }}</h2>
        <v-row>
          <v-col v-for="plant in plants" :key="plant.id">
            <CardPlant :plant="plant"/>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocsSnap, getDocsSnapWhere } from "@/plugins/firebase";
import CardPlant from "@/components/CardPlant.vue";

export default {
  components: { CardPlant },
  data: () => ({
    categories: [],
    plants: [],
    selectedCategory: null,
  }),
  methods: {
    async getCategories() {
      const docs = [];

      const snap = await getDocsSnap("categories");

      snap.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));

      this.categories = docs;
    },

    async getPlantsByCategoryId() {
      const docs = [];

      const snap = await getDocsSnapWhere("plants", [
        "categories",
        "array-contains",
        this.selectedCategory,
      ]);

      snap.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      this.plants = docs;
    },
  },
  computed: {
    category() {
      return this.categories.find((category) => {
        return category.id == this.selectedCategory;
      });
    },
  },
  created() {
    this.getCategories();
  },
};
</script>

<style>
</style>
