<template>
  <v-app-bar color="green2" height="60">
    <div style="width: 100%" class="d-flex align-center">
      <v-img contain width="164" src="@/assets/logo.png" />
      <v-tabs class="mr-4" color="black" background-color="green2" height="60" right>
        <v-tab
          exact
          v-for="tab in tabs"
          :key="tab.label"
          :to="{ name: tab.to }"
          >{{ tab.label }}</v-tab
        >
      </v-tabs>
      <v-btn @click="logout" text>Sair</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    tabs: [
      {
        label: "Sintomas",
        to: "search",
      },
      {
        label: "Categoria",
        to: "category",
      },
    ],
  }),
  methods: {
    logout() {
      this.$cookies.remove("SESSION")
      this.$router.push({
        name: "login"
      })
    }
  }
};
</script>
