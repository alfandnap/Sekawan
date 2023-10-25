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
    ...mapActions(useCounterStore, ['fetchReservation', 'deleteReservation', 'patchApproval']),
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
    async approvalHandler(id) {
      try {
        const data = await this.patchApproval(id)
        if (data[0] == 1) {
          this.getAllReservation()
        }
      } catch (error) {
        console.log(error);
      }
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
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Approval</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(reservation, index) in reservationData" :key="reservation.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ reservation.vehicle.name }}</td>
        <td>{{ reservation.approvedByAdmin ? 'approved' : 'not approved' }}</td>
        <td>
          <div class="icon-container">
            <button v-if="!reservation.approvedByAdmin" @click="() => { approvalHandler(reservation.id) }" type="button"
              class="btn btn-light">
              <i class="bi bi-check2-square"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>