<template>
  <section class="list">
    <section class="list-child" v-for="hist in hists" :key="hist.id">
      <p>{{hist.status}} | {{date(hist.createdAt)}}</p>
    </section>
  </section>
</template>

<script>
import moment from "moment";
import gql from "graphql-tag";

export default {
  name: "history-list",
  props: {
    clientId: Number
  },
  data(){
    return {
      historyInteractions: []
    }
  },
  methods: {
    date(date){
      return moment(date).format("MM/DD/YYYY HH:mm");
    }
  },
  computed:{
    hists(){
      let hists = [];
      this.historyInteractions.forEach(histo => {
        if(this.clientId === histo.clientId){
          hists.push(histo);
        }
      });
      return hists;
    }
  },
  apollo: {
    historyInteractions: {
      query: gql`query{
        historyInteractions{
          id
          status
          clientId
          createdAt
        }
      }
      `,
      pollInterval: 300
    }
  }
}
</script>

<style scoped>
  .list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem 0;
  }

  .list-child{
    margin: 0 auto;
  }
</style>