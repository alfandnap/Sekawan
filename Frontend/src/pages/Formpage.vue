<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
  },
  data() {
    return {
      CategoryData: [],
      FormData: {
        name: '',
        type: '',
        status: '',
        id: this.$route.params.id
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['postProduk', 'fetchProdukById', 'editProduk', 'fetchCategory']),
    async submitHandler() {
      try {
        if (this.$route.params.id) {
          const data = await this.editProduk(this.FormData)
          if (data[0] == 1) {
            this.$router.push(`/`)
          }

        } else {
          const data = await this.postProduk(this.FormData)
          
          if (data.name == this.FormData.name) {
            this.$router.push(`/`)
          }
        }

      } catch (error) {
        console.log(error);
      }
    },
    async editHandler() {
      try {
        const data = await this.fetchProdukById(this.$route.params.id)
        
        this.FormData = data

      } catch (error) {
        console.log(error);
      }
    },
    async getCategory() {
      try {
        const {data} = await this.fetchCategory()

        this.CategoryData = data

      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    // this.getCategory()
    if (this.$route.params.id) {
      this.editHandler()
    }
  },
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="exampleFormControlInput1">Name</label>
      <input v-model="FormData.name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Type</label>
      <select v-model="FormData.type" class="form-control" id="exampleFormControlSelect1">
        <option :value="'barang'">Barang</option>
        <option :value="'orang'">Orang</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Status</label>
      <select v-model="FormData.status" class="form-control" id="exampleFormControlSelect1">
        <option :value="'Sewa'">Sewa</option>
        <option :value="'Perusahaan'">Perusahaan</option>
      </select>
    </div><br>
    <button type="submit" class="btn btn-secondary">Submit</button>
  </form>
</template>