<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
  span, p, h1, h2, h3, h4{
    color: #47525E;
    font-family: 'Lato', Courier, monospace;
  }
</style>
