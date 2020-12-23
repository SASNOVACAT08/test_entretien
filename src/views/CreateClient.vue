<template>
  <main>
    <h1 class="title">Create Client</h1>
    <section class="form">
      <input class="form-child" type="text" v-model="firstName" placeholder="First Name">
      <input class="form-child" type="text" v-model="lastName" placeholder="Last Name">
      <input class="form-child" type="email" v-model="email" placeholder="Email">
      <base-button class="form-child center" color="blue" msg="Create" :click="createClient"></base-button>
    </section>
  </main>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name:"create-client",
  data(){
    return {
      firstName: "",
      lastName: "",
      email: "",
    }
  },
  methods: {
    createClient(){
      this.$apollo.mutate({
        mutation: gql`mutation ($firstName: String!, $lastName: String!, $email: String!) {
          createClient(data: {firstName: $firstName, lastName: $lastName, email: $email}) {
            firstName
            lastName
            email
          }
        }`,
        variables: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        },
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.error(error)
      })
        this.firstName = "";
        this.lastName = "";
        this.email = "";
      }
  }
}
</script>

<style scoped>
  .form{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 1rem auto;
  }

  .form-child{
    margin: 0.2rem 0;
  }

  .center{
    margin: 1rem auto;
  }
</style>
