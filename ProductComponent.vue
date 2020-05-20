<template>
  <div>{{product.name}}</div>
</template>

<script>
export default {
  name: "ProductComponent",
  props: {
    product: { plans: [] }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
