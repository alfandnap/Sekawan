<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
  },
  data() {
    return {
      FormData: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['login']),
    async submitHandler() {
      try {
          const data = await this.login(this.FormData)
          
          if (data.access_token) {
            localStorage.access_token = data.access_token
            localStorage.role = data.role
            localStorage.id = data.id
            this.$router.push(`/`)
          }

      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<template>
  <h1>Please Login</h1>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="exampleFormControlInput1">Username</label>
      <input v-model="FormData.username" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput3">Password</label>
      <input v-model="FormData.password" type="password" class="form-control" id="exampleFormControlInput3" placeholder="Password">
    </div>
    <br>
    <button type="submit" class="btn btn-secondary">Submit</button>
  </form>
</template>