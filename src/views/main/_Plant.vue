<template>
  <v-sheet class="pa-3 d-flex justify-center">
    <h1 v-if="!plant">Planta não encontrada</h1>
    <v-card v-if="plant" width="800" class="pa-4">
      <h1 class="text-center mb-4">{{ plant.name }}</h1>
      <div class="text-center">
        <v-dialog>
          <template v-slot:activator="{ on }">
            <v-avatar
              style="cursor: pointer"
              v-on="on"
              size="224"
              class="elevation-4"
            >
              <v-img width="224" :src="plant.img" />
            </v-avatar>
          </template>
          <v-card>
            <v-img contain aspect-ratio="2" :src="plant.img" />
          </v-card>
        </v-dialog>
      </div>
      <div class="mb-4">
        <span class="font-weight-bold d-block">Nomes polulares:</span>
        <v-chip
          class="mr-1"
          color="green1"
          small
          v-for="(popularName, index) in plant.popularNames"
          :key="index"
        >
          {{ popularName }}
        </v-chip>
      </div>
      <div class="mb-4">
        <span class="font-weight-bold">Descrição:</span>
        <p :title="plant.description">{{ plant.description }}</p>
      </div>
      <div v-if="plant.preparation" class="mb-4">
        <span class="font-weight-bold">Modo de preparo:</span>
        <p :title="plant.preparation">{{ plant.preparation }}</p>
      </div>
      <div v-if="plant.caveats" class="mb-4">
        <span class="font-weight-bold">Contra indicações:</span>
        <p :title="plant.caveats">{{ plant.caveats }}</p>
      </div>
      <div v-if="symptomes.length" class="mb-4">
        <span class="font-weight-bold">Sintomas:</span>
        <p :title="plant.caveats">{{ convertArrayToString(symptomes) }}</p>
      </div>
      <div v-if="categories.length" class="mb-4">
        <span class="font-weight-bold">Categorias:</span>
        <p :title="plant.caveats">{{ convertArrayToString(categories) }}</p>
      </div>
      <div class="d-flex justify-center">
        <v-btn color="green1" @click="back">
          <span>Voltar</span>
          <v-icon right> mdi-arrow-u-left-top </v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-sheet>
</template>

<script>
import { getDocSnap } from "@/plugins/firebase";
export default {
  data: () => ({
    plant: null,
    categories: [],
    symptomes: [],
  }),
  methods: {
    async getPlant() {
      const snap = await getDocSnap("plants", this.$route.params.id);

      const plant = snap.data();

      plant.categories && this.getCategories(plant);
      plant.symptomes && this.getSymptomes(plant);

      this.plant = plant;
    },
    getCategories(plant) {
      const categories = [];

      plant.categories.length && plant.categories.forEach(async (category) => {
        const doc = await getDocSnap("categories", category);
        categories.push(doc.data().name);
      });

      this.categories = categories;
    },
    getSymptomes(plant) {
      const symptomes = [];

      plant.symptomes.length && plant.symptomes.forEach(async (symptome) => {
        const doc = await getDocSnap("symptomes", symptome);
        symptomes.push(doc.data().name);
      });

      this.symptomes = symptomes;
    },
    convertArrayToString(array) {
      return array.join(', ')
    },

    back() {
      window.history.back();
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.getPlant();
      },
    },
  },
};
</script>

<style>
</style>
