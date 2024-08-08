<template>
    <ul class="flex flex-row gap-3 bg-gray-50 justify-end">
      <li class="p-6">
        <router-link to="/">Login</router-link>
      </li>
      <li class="p-6">
        <router-link to="/signup">Signup</router-link>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: 'HeaderView',
    props: {
      msg: String
    }
  }
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    display: inline;
  }
  
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }
  
  a.router-link-exact-active {
    color: #42b983;
  }
  </style>
  