<template>
  <main>
    <h1>{{client.email}}</h1>
    <section class="edit">
      <section class="edit-input">
        <input type="text" v-model="client.firstName" placeholder="First Name">
        <input type="text" v-model="client.lastName" placeholder="Last Name">
      </section>
      <section class="edit-button">
        <base-button color="green" msg="Edit" :click="editClient"></base-button>
        <base-button color="red" msg="Delete" :click="deleteClient"></base-button>
      </section>
    </section>
    <h2>History</h2>
    <create-history :clientId="Number($route.params.id)"></create-history>
    <history-list :clientId="Number($route.params.id)"></history-list>
  </main>
</template>

<script>
import moment from "moment"
import gql from "graphql-tag";
import CreateHistory from '../components/CreateHistory.vue';
import HistoryList from "../components/HistoryList.vue";

export default {
  components: { CreateHistory, HistoryList },
  name:"client-details",
  data(){
    return {
      client: {
        firstName: "",
        lastName: "",
        email: ""
      }
    }
  },
  computed:{
    date(){
      return moment(this.client.createdAt).format("MM/DD/YYYY HH:mm");
    }
  },
  methods: {
    editClient(){
      this.$apollo.mutate({
        mutation: gql`mutation ($id: Float!, $firstName: String!, $lastName: String!) {
          updateClient(data: {id: $id, firstName: $firstName, lastName: $lastName}) {
            email
          }
        }`,
        variables: {
          id: Number(this.$route.params.id),
          firstName: this.client.firstName,
          lastName: this.client.lastName,
        },
      }).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteClient(){
      this.$apollo.mutate({
        mutation: gql`mutation ($id: Float!) {
          deleteClient(data: {id: $id}) {
            email
          }
        }`,

        variables: {
          id: Number(this.$route.params.id)
        },
      }).then(() => {
        this.$router.push("/");
      }).catch((error) => {
        console.error(error)
      })
    }
  },
  apollo: {
    client: {
      query: gql`query ($id: Float!){
        client(id: $id) {
          firstName
          lastName
          email
          createdAt
        }
      } 
      `,
      variables(){
        return {
          id: Number(this.$route.params.id)
        }
      },
      pollInterval: 300,
      error(){
        this.$router.push("/")
      }
    },
  }
}
</script>

<style scoped>
  .edit{
    margin: 1rem auto;
  }

  .edit-input{
    display: flex;
    flex-direction: column;
  }

  .edit-button{
    margin: 1rem 0;
    display: flex;
    justify-content: space-around;
  }
</style>