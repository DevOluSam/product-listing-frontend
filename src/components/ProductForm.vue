
  <template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
      <div class="mx-auto max-w-lg">
        <form @submit.prevent="submitForm" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <div>
            <label for="name" class="sr-only">Name</label>
            <div class="relative">
              <input v-model="name"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter product name"
              />
            </div>
          </div>
          <div>
            <label for="description" class="sr-only">Description</label>
            <div class="relative">
              <input v-model="description"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter product description"
              />
            </div>
          </div>
          <div>
            <label for="price" class="sr-only">Price</label>
            <div class="relative">
              <input v-model="price"
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
  </template>
  
  <script>
  import axios from 'axios'
  import { mapGetters } from 'vuex';
  export default {
    props: {
    product: Object,
  },
    data() {
      return {
      name: this.product?.name || '',
      description: this.product?.description || '',
      price: this.product?.price || '',
      image: null,
    };
    },
    computed: {
    ...mapGetters(['getToken', 'getCreatedBy']),
    isEditing() {
      return !!this.product;
    }
  },
    methods: {
      handleFileUpload(event) {
        this.image = event.target.files[0];
      },
      async submitForm() {
        if (!this.getToken || !this.getCreatedBy) {
        this.$router.push('/login');
        return;
      }
        const formData = new FormData();
        formData.append('description', this.description);
        formData.append('name', this.name);
        formData.append('price', this.price);
        formData.append('image', this.image);
        formData.append('createdBy', this.getCreatedBy);
          const response = await axios.post('https://product-listing-backend-ls9q.onrender.com/product/create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${this.getToken}` 
            }
          });
          window.location.reload();
          response.data;
          this.$emit('close');

      }
    }
  }
  </script>
  