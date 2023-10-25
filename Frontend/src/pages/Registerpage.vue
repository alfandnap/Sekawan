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
        role: 0,
        password: '',
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['register']),
    async submitHandler() {
      try {
        const {message} = await this.register(this.FormData)
        
        if (message == `user with username ${this.FormData.username} succesfully created`) {
          this.$router.push(`/welcome`)
        }

      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<template>
  <h1>Please Register</h1>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="exampleFormControlInput1">Username</label>
      <input v-model="FormData.username" type="text" class="form-control" id="exampleFormControlInput1"
        placeholder="Name">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Role</label>
      <select v-model="FormData.role" class="form-control" id="exampleFormControlSelect1">
        <option :value="'user'">User</option>
        <option :value="'admin'">Administrator</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput3">Password</label>
      <input v-model="FormData.password" type="password" class="form-control" id="exampleFormControlInput3"
        placeholder="Password">
    </div>
    <br>
    <button type="submit" class="btn btn-secondary">Submit</button>
  </form>
</template>