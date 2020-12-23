<template>
  <main>
    <h1>Clients List</h1>
    <input @keypress="changePage(1)" class="search-bar" type="text" v-model="search" placeholder="Search..." >
    <section class="client-list" v-for="client in clientsVisible" :key="client.id">
        <client-card :id="Number(client.id)" :firstName="client.firstName" :lastName="client.lastName" :email="client.email"></client-card>
    </section>
    <section class="page">
      <article v-for="index in numberPages" :key="index">
        <p class="page-number" @click="changePage(index)">
          {{ index }}
        </p>
      </article>
    </section>
  </main>
</template>

<script>
import gql from "graphql-tag"
import ClientCard from '../components/ClientCard.vue'

export default {
  name: 'client-list',
  components: {
    ClientCard
  },
  data(){
    return{
      clients: {
        clients: []
      },
      page: 1,
      search: ""
    }
  },
  computed: {
    clientsFiltered(){
      let clients = [];
      this.clients.clients.forEach((client) => {
        if(client.email.indexOf(this.search) !== -1){
          clients.push(client);
        }
      })
      return clients;
    },
    clientsVisible(){
      let clients = [];
      this.clientsFiltered.forEach((client, index) => {
        if ((this.page - 1) * 10 <= index && this.page * 10 > index) {
          clients.push(client);
        }
      });
      return clients;
    },
    numberPages(){
      return Math.ceil(this.clientsFiltered.length / 10)
    }
  },
  methods: {
    changePage(index){
      this.page = index;
    }
  },
  apollo: {
    clients: {
      query: gql`query {
        clients{
          clients{
            id
            firstName
            lastName
            email
          }
        }
      }
      `,
      pollInterval: 300
    }
  }
}
</script>

<style scoped>
  .search-bar{
    padding: 0.3rem;
    width: 30%;
    margin: 1rem auto;
  }

  .client-list{
    display: flex;
    justify-content: center;
    margin: 1rem 0 0 0;
  }

  .page{
    display: flex;
    margin: 1rem 0;
  }

  .page-number{
    margin: 0 0.2rem;
  }
</style>