<template>
  <section class="create">
    <h3 class="create-title">Create</h3>
    <section class="create-form">
      <select class="create-select" v-model="status">
        <option v-for="(stat, index) in statusList" :key="index" :value="stat">{{stat}}</option>
      </select>
      <base-button class="create-button" color="blue" msg="Create" :click="createHistory"></base-button>
    </section>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "create-history",
  props: {
    clientId: Number
  },
  data(){
    return {
      status: "PENDING",
      statusList: [
        'PENDING', 'CONTACTED', 'UNDER_NEGOCIATION', 'COMPLETED', 'ABORTED'
      ]
    }
  },
  methods: {
    createHistory(){
      this.$apollo.mutate({
        mutation: gql`mutation ($status: Status!, $clientId: Float!) {
          createHistoryInteraction(data: {status: $status, clientId: $clientId}) {
            id
          }
        }`,
        variables: {
          status: this.status,
          clientId: this.clientId
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
  .create{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .create-title{
    margin: 0.5rem auto;
  }

  .create-form{
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 0 auto;
    justify-content: center;
  }

  .create-select{
    margin: 0 auto;
  }

  .create-button{
    margin: 0 auto;
  }
</style>