<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  props: ['product', 'index'],
  methods: {
    ...mapActions(useCounterStore, ['deleteProduk']),
    editHandler(e) {
      e.preventDefault();
      this.$router.push(`/edit/${this.product.id}`)
    },
    async deleteHandler() {
      try {

        const data = await this.deleteProduk(this.product)

        await this.$router.push(`/`)

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <tr>
    <th scope="row">{{ index+1 }}</th>
    <td>{{ product.name }}</td>
    <td>{{product.type}}</td>
    <td>{{product.status}}</td>
    <td>
      <div class="icon-container">
        <button @click="editHandler" type="button" class="btn btn-light">
          <i class="bi bi-pencil"></i>
        </button>
          <button @click="deleteHandler" type="button" class="btn btn-light">
            <i class="bi bi-trash3-fill"></i>
          </button>
      </div>
    </td>
  </tr>
</template>

<style>
.icon-container {
  display: flex;
  /* justify-content: space-around; */
}

.bi {
  display: flex;
  /* margin: 3px; */
}
</style>