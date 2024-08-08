
  <template>
    <section class="z-50">
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header class="text-center">
          <h2 class="text-xl font-bold text-gray-900 sm:text-3xl mb-8">All Products</h2>
        </header>
        <ul class="flex justify-center flex-wrap gap-3">
          <li v-for="product in products" :key="product.id" class="relative group shadow-lg border rounded-2xl">
            <a href="#" class="mx-auto ">
              <img :src="product.image" alt="" class="h-[350px] w-full object-cover sm:h-[450px] p-3 " />
              <div class="mt-3 flex justify-start text-sm">
                <div class="flex justify-between w-full ">
                  <div class="text-start p-2">
                    <h3 class="text-gray-900 group-hover:underline group-hover:underline-offset-4 text-lg">
                      {{ product.name }}
                    </h3>
                    <p class="mt-1.5 text-pretty text-md text-gray-500">
                      {{ product.description }}
                    </p>
                  </div>
                  <p class="text-gray-900 text-lg p-2">${{ product.price }}</p>
                  <span class="inline-flex absolute top-5 right-5 overflow-hidden rounded-md border bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      class="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative" 
                      title="Edit Product"
                      @click="editProduct(product)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button class="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative" title="Delete Product" @click="deleteProduct(product)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            </a>
          </li>
          <div v-if="showProductForm" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50" @click="closeProductForm">
            <div class="bg-white p-4 rounded-lg shadow-lg" @click.stop>
              <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
                <div class="mx-auto max-w-lg">
                  <form @submit.prevent="submitForm" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                    <div>
                      <label for="name" class="sr-only">Name</label>
                      <div class="relative">
                        <input v-model="form.name" 
                          type="text"
                          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="description" class="sr-only">Description</label>
                      <div class="relative">
                        <input v-model="form.description"
                          type="text"
                          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter product description"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="price" class="sr-only">Price</label>
                      <div class="relative">
                        <input v-model="form.price"
                          type="text"
                          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter price"
                        />
                      </div>
                    </div>
                    <div>
                      <label for="image" class="sr-only">Upload Image</label>
                      <div class="relative">
                        <input id="image"
                          type="file"
                          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Upload image"
                          @change="handleFileUpload"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
                    >
                    {{ isEditing ? 'Update Product' : 'Create Product' }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        products: [],
        form: {
          name: '',
          description: '',
          price: '',
          id: '',
        },
        selectedProduct: null,
        showProductForm: false,
        isEditing: false
      };
    },
    computed: {
      ...mapGetters(['getCreatedBy'])
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
     
          const response = await axios.get(`https://product-listing-backend-ls9q.onrender.com/product/${this.getCreatedBy}`);
          this.products = response.data;
      },
      editProduct(product) {
        this.selectedProduct = product;
        this.showProductForm = true;
        this.isEditing = true;
        this.form = { ...product };
      },
      async deleteProduct(product) {
        this.selectedProduct = product;
        this.form = { ...product };
        const response = await axios.delete(`https://product-listing-backend-ls9q.onrender.com/product/delete/${this.form._id}`, this.form);
          this.products = response.data;
          this.closeProductForm();
          window.location.reload();
      },
      closeProductForm() {
        this.showProductForm = false;
        this.selectedProduct = null;
        this.isEditing = false;
        this.form = {
          name: '',
          description: '',
          price: '',
          id: '',
        };
      },
      async submitForm() {
          const response = await axios.put(`https://product-listing-backend-ls9q.onrender.com/product/edit/${this.form._id}`, this.form);
          this.products = response.data;
          this.closeProductForm();
          window.location.reload();
        }
       
      }
    }
  </script>
  
  <style scoped>
  </style>
  