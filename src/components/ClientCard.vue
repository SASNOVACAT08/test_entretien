<template>
  <article class="card">
    <h2 class="card-title">{{email}}</h2>
    <div class="card-info">
      <p class="card-child">{{firstName}} {{lastName}}</p>
      <router-link class="card-child" :to="{name: 'ClientDetails', params: {id}}">Details</router-link>
      <base-button class="card-child" color="red" msg="Delete" :click="deleteClient"></base-button>
    </div>
  </article>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "client-card",
  props: {
    id: Number,
    firstName: String,
    lastName: String,
    email: String
  },
  methods: {
    deleteClient(){
      this.$apollo.mutate({
      mutation: gql`mutation ($id: Float!) {
        deleteClient(data: {id: $id}) {
          email
        }
      }`,

      variables: {
        id: this.id
      },
    }).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.error(error)
    })
    }
  }
}
</script>

<style scoped>
  .card{
    display: flex;
    flex-direction: column;
    width: 60%;
  }

  .card-title{
    text-align: center;
  }

  .card-info{
    display: flex;
    justify-content: space-between;
  }

  .card-child{
    margin: 1rem 0;
  }
</style>