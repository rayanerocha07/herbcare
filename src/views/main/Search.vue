<template>
  <div>
    <div class="text-center mt-16">
      <h1 class="mb-6">Olá {{ userName }}!</h1>
      <p>Digite o sintoma e analise as plantas correspondentes a ele</p>
    </div>
    <div class="d-flex justify-center mt-8">
      <v-sheet color="green1" width="600">
        <v-form
          @submit.prevent="getPlantsBySymptomeId"
          style="width: 100%"
          class="d-flex"
        >
          <v-autocomplete
            no-data-text="Sintoma não encontrado"
            v-model="selectedSymptome"
            :items="symptomes"
            item-text="name"
            item-value="id"
            class="mr-4"
            dense
            background-color="white"
            placeholder="Sintoma"
            outlined
            rounded
          />
          <v-btn color="primary" rounded type="submit">Pesquise</v-btn>
        </v-form>
      </v-sheet>
    </div>
    <h2 v-if="isPlantfound !== null && !isPlantfound" class="text-center">
      Planta não encontrada por esse sintoma
    </h2>
    <v-row class="mt-16 mx-16">
      <v-col v-for="(plant, index) in plants" :key="index">
        <CardPlant :plant="plant" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getDocsSnap, getDocsSnapWhere } from "@/plugins/firebase";
import CardPlant from "@/components/CardPlant.vue";
export default {
  components: { CardPlant },
  data: () => ({
    plants: [],
    symptomes: [],
    selectedSymptome: null,
    isPlantfound: null,
  }),
  methods: {
    async getSymptomes() {
      const docs = [];

      const snap = await getDocsSnap("symptomes");

      snap.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));

      this.symptomes = docs;
    },

    async getPlantsBySymptomeId() {
      const docs = [];

      const snap = await getDocsSnapWhere("plants", [
        "symptomes",
        "array-contains",
        this.selectedSymptome,
      ]);

      if (!snap.empty) {
        this.isPlantfound = true;
        snap.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
      } else {
        this.isPlantfound = false
      }

      this.plants = docs;
    },
  },
  computed: {
    userName() {
      return this.$cookies.get("SESSION") || "Anônimo"
    }
  },
  created() {
    this.getSymptomes();
  },
};
</script>

<style >
</style>
