<script>
import { mapWritableState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
import TableRows from '../components/TableRows.vue'

export default {
  components: {
    TableRows
  },
  props: {
  },
  emits: [],
  data() {
    return {
      reservationData: []
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchReservation', 'deleteReservation']),
    async getAllReservation() {
      try {
        const data = await this.fetchReservation()
        this.reservationData = data

      } catch (error) {
        console.log(error);
      }
    },
    goToForm(e) {
      e.preventDefault()
      this.$router.push(`/formReservation`)
    },
    editHandler(id) {
      this.$router.push(`/editReservation/${id}`)
    },
    async deleteHandler(id) {
      try {
        const data = await this.deleteReservation(id)

        await this.getAllReservation()

      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['productDataState'])
  },
  created() {
    this.getAllReservation()
  },
}
</script>

<template>
  <button @click="$router.push('/formReservation')" type="button" class="btn btn-secondary ml-auto"
    style="margin-right: 10%;">
    <i class="bi bi-plus-square" style="width: max-content !important;"></i>
  </button>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Vehicle Name</th>
        <th scope="col">User Name</th>
        <th scope="col">Approval</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(reservation, index) in reservationData" :key="reservation.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ reservation.vehicle.name }}</td>
        <td>{{ reservation.user.username }}</td>
        <td>{{ reservation.approvedByAdmin ? 'approved' : 'not approved' }}</td>
        <td>
          <div class="icon-container">
            <button @click="() => { editHandler(reservation.id) }" type="button" class="btn btn-light">
              <i class="bi bi-pencil"></i>
            </button>
            <button @click="() => { deleteHandler(reservation.id) }" type="button" class="btn btn-light">
              <i class="bi bi-trash3-fill"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>