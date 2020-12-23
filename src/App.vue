<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create">Create</router-link>
    </header>
    <router-view/>
  </div>
</template>

<style>
  body{
    margin: 0;
  }
  #nav{
    text-align: center;
    margin: 1rem;
  }
  main{
    display: flex;
    flex-direction: column;
    max-width: 80%;
    margin: 0 auto;
  }
  h1, h2, h3{
    margin: 0 auto;
  }
</style>