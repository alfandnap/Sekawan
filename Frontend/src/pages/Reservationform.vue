<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
  },
  data() {
    return {
      vehicleData: [],
      FormData: {
        status: '',
        vehicleId: 0,
        id: this.$route.params.id
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['postReservation', 'fetchReservationById', 'editReservation', 'fetchproduk']),
    async submitHandler() {
      try {
        if (this.$route.params.id) {
          const data = await this.editReservation(this.FormData)
          if (data[0] == 1) {
            this.$router.push(`/reservation`)
          }
        } else {
          const data = await this.postReservation(this.FormData)
          if (data.id) {
            this.$router.push(`/reservation`)
          }
        }

      } catch (error) {
        console.log(error);
      }
    },
    async editHandler() {
      try {
        const data = await this.fetchReservationById(this.$route.params.id)
        
        this.FormData = data

      } catch (error) {
        console.log(error);
      }
    },
    async getReservation() {
      try {
        const data = await this.fetchproduk()
        this.vehicleData = data

      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getReservation()
    if (this.$route.params.id) {
      this.editHandler()
    }
  },
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="exampleFormControlSelect1">Vehicle</label>
      <select v-model="FormData.vehicleId" class="form-control" id="exampleFormControlSelect1">
        <option v-for="vehicle in vehicleData" :key="vehicle.id" :value="vehicle.id">{{vehicle.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Status</label>
      <input v-model="FormData.status" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Status">
    </div>
    <br>
    <button type="submit" class="btn btn-secondary">Submit</button>
  </form>
</template>