<template>
  <v-sheet class="d-flex justify-center align-center" height="100vh" id="login" color="#55E995">
    <v-card class="py-16 px-16">
      <v-form @submit.prevent="signin" class="text-center">
        <h1 class="mb-8 text-h3 font-weight-medium">HerbCare</h1>
        <p class="mb-8 ">Faça seu login para usar nossos beneficios!</p>
        <v-text-field v-model="name" placeholder="Seu nome" outlined/>
        <v-text-field v-model="login" placeholder="Login" outlined/>
        <v-text-field type="password" v-model="password" placeholder="Senha" outlined/>
        <v-btn type="submit" class="mt-8" height="40" width="80%" color="primary">
          Continuar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    login: "",
    password: "",
    name: ""
  }),
  methods: {
    signin() {
      const permitedUser = {
        login: "admin@herbcare.com",
        password: "123456"
      }

      if(this.login == permitedUser.login && this.password == permitedUser.password) {
        this.$cookies.set("SESSION", this.name)
        this.$router.push({ name: "search" })
      }
    }
  }
}
</script>

<style scoped>
</style>
