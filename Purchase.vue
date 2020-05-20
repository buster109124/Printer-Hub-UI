<template>
  <div class="product-card-container">
    <div v-for="p in products" :key="p.id">
      <product-card-component :product="p" class="product-card"></product-card-component>
    </div>

    <div class="product-table">

    </div>
  </div>
</template>

<script>
import ProductCardComponent from "@/components/ProductCardComponent.vue";
import PRODUCTS from "../graphql/queries/products";


export default {
  name: "purchase",

  components: {
    ProductCardComponent
  },

  data: function() {
    return {
      product: {}
    };
  },

  apollo: {
    products: PRODUCTS.ALL
  }

};
</script>

<style>

.product-table{
  display: grid;
}

.product-card-container{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5%;
  margin:0 5%;
  padding:5% 0;
}

.product-card-container .product-card {

  border-radius: 3px;
  padding:3%;
}

</style>
