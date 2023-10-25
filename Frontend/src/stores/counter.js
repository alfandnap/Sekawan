import { defineStore } from 'pinia'
import axios from 'axios';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      productDataState: [],
      isLogin: false,
      isAdmin: false
    }
  },
  actions: {
    async fetchproduk() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/vehicles',
          method: 'GET',
          headers: {
            'access_token': localStorage.access_token
          }
        })

        this.productDataState = data
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async postProduk(formData) {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/vehicles',
          method: 'post',
          data: formData,
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProdukById(id) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/vehicles/${id}`,
          method: 'get',
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async editProduk(value) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/vehicles/${value.id}`,
          method: 'put',
          data: value,
          headers: {
            'access_token': localStorage.access_token
          }
        })

        // console.log(value);

        return data
        // this.products = data
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduk(value) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/vehicles/${value.id}`,
          method: 'delete',
          headers: {
            'access_token': localStorage.access_token
          }
        })

        this.productDataState = this.productDataState.filter(item => item.id !== value.id);

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async register(formData) {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/register',
          method: 'post',
          data: formData
        })

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async login(formData) {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/login',
          method: 'post',
          data: formData
        })
        if (data) {
          this.isLogin = true
        }
        if (data.role == 'admin') {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReservation() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/reservations',
          method: 'GET',
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async postReservation(formData) {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/reservations',
          method: 'post',
          data: formData,
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReservationById(id) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/reservations/${id}`,
          method: 'get',
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async editReservation(value) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/reservations/${value.id}`,
          method: 'put',
          data: value,
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
        // this.products = data
      } catch (error) {
        console.log(error);
      }
    },
    async deleteReservation(value) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/reservations/${value}`,
          method: 'delete',
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
      } catch (error) {
        console.log(error);
      }
    },
    async patchApproval(id) {
      try {
        const { data } = await axios({
          url: `http://localhost:3000/reservations/${id}`,
          method: 'patch',
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return data
        // this.products = data
      } catch (error) {
        console.log(error);
      }
    },
  }
})
