<template>
  <div class="Products">
    <h1>Products</h1> <h2><button @click="getall()">reload</button></h2>
    <div v-if="products.length > 0" class="table-wrap">
      <div>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="100" align="center">Brand</td>
          <td width="100" align="center">price</td>
          <td width="550">Description</td>
          <td width="150" align="center">Picture</td>
          <td width="100">Ingredient list</td>
        </tr>
        <tr v-for="product in products" :key="product">
          <td>{{ product.title }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td><img :src="product.picture" width="150"/>{{ product.img }}</td>
          <td>{{ product.ingredientList }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no products..<br /><br />
    </div>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.getall()
  },
  methods: {
    async getall () {
      const response = await ProductService.loadProduct()
      this.products = response.data.products
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
