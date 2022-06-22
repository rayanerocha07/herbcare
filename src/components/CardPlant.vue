<template>
  <v-card width="400" class="pa-4">
    <h3 class="text-center mb-4">{{ plant.name }}</h3>
    <div class="text-center">
      <v-avatar size="164" class="elevation-4">
        <v-img width="164" :src="plant.img" />
      </v-avatar>
    </div>
    <div>
      <span class="font-weight-bold">Descrição:</span>
      <p :title="plant.description">{{ descriptionTruncated }}</p>
    </div>
    <v-btn :to="{ name: 'plant', params: { id: plant.id } }" color="green1">
      <span>Ver mais</span>
      <v-icon right small> mdi-plus </v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    plant: {
      type: Object,
    },
  },
  computed: {
    descriptionTruncated() {
      return `${this.plant.description.substring(0, 200)}...`;
    },
  },
};
</script>

<style>
</style>
