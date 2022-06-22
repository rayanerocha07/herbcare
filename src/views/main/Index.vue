<template>
  <v-sheet min-height="100vh" color="green1">
    <Navbar />
    <div class="pa-4">
      <router-view />
    </div>
  </v-sheet>
</template>

<script>
import Navbar from "@/layout/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
</style>
