<template>
  <div>
    <ProductCard/>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>
