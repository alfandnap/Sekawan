<script>
import { RouterView } from 'vue-router'
import { mapWritableState, mapActions } from 'pinia'
import { useCounterStore } from './stores/counter'


export default {
  data() {
    return {
      showButton: true,
    }
  },
  components: {
  },
  methods: {
    goToHomepage(e) {
      e.preventDefault()
      this.$router.push(`/`)
    },
    logoutHandler(e) {
      e.preventDefault()
      localStorage.clear()
      this.isLogin = false
      this.$router.push(`/welcome`)
    },
    goToApproval(e) {
      e.preventDefault()
      this.$router.push(`/approval`)
    },
    goToReservation(e) {
      e.preventDefault()
      this.$router.push(`/reservation`)
    }
  },
  watch: {
    '$route.fullPath': function (newPath, oldPath) {
      this.showButton = newPath === '/';
    }
  },
  created() {
    if (localStorage.id) {
      this.isLogin = true
    }
    if (localStorage.role == 'admin') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin', 'isAdmin'])
  }
}
</script>

<template>
  <nav v-if="isLogin" class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a @click="goToHomepage" class="navbar-brand" href="#">Sekawan</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a @click="goToHomepage" class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a @click="goToReservation" class="nav-link active" aria-current="page" href="#">Reservation</a>
          </li>
          <li v-show="isAdmin" class="nav-item">
            <a @click="goToApproval" class="nav-link active" aria-current="page" href="#">Approval</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a @click="logoutHandler" class="nav-link active" aria-current="page" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="router-container">
    <button v-if="showButton" @click="$router.push('/form')" type="button" class="btn btn-secondary ml-auto"
      style="margin-right: 10%;">
      <i class="bi bi-plus-square" style="width: max-content !important;"></i>
    </button>
    <RouterView />
  </div>
</template>

<style>
.router-container {
  margin: 2% 5% 1% 5%;
}
</style>
