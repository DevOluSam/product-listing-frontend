<template>
    
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg">
        <h1 class="text-center text-2xl font-bold text-teal-600 sm:text-3xl">Get started today</h1>
    
        <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
          inventore quaerat mollitia?
        </p>
    
        <form @submit.prevent="post" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p class="text-center text-lg font-medium">Log in to your account</p>
    
          <div>
            <label for="email" class="sr-only">Email</label>
    
            <div class="relative">
              <input v-model="email" 
                type="email"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
    
            </div>
          </div>
    
          <div>
            <label for="password" class="sr-only">Password</label>
    
            <div class="relative">
              <input v-model="password" 
                type="password"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>
    
          <button v-on:click.prevent="post"
            type="submit"
            class="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
          >
            Log in
          </button>
    
          <p class="text-center text-sm text-gray-500">
            No account?
            <router-link to="/signup">Signup</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>


<script>
import axios from 'axios'
import { mapActions } from 'vuex';
import router from '@/router'
export default {
  data() {
   return {
     email: '',
     password: ''
   }
  },
  methods: {
    ...mapActions(['saveToken', 'saveCreatedBy']),
    async post() {
      if (!this.email || !this.password) {
        alert('Please fill in all fields');
        return;
      }

      const payload = {
        email: this.email,
        password: this.password
      };

      try {
        const response = await axios.post('https://product-listing-backend-ls9q.onrender.com/users/login', payload);

        if (response.data.token) {
          this.saveToken(response.data.token);
          this.saveCreatedBy (response.data.createdBy);
          router.push({ name: 'dashboard' });
        } else {
          router.push({name: 'signup'})
        }
      } catch (error) {
        router.push({name: 'signup'})
        
      }
    }
  }
  }

</script>