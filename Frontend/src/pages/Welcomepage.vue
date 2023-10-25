<script>
export default {
  
}
</script>

<template>
  <div class="center-content">
    <h1>Welcome to Sekawan</h1><br>
    <div class="button-container">
      <button @click="$router.push('/login')" type="button" class="btn btn-light">Login</button>
      <button @click="$router.push('/register')" type="button" class="btn btn-light">Register</button>
    </div>
  </div>
</template>

<style>
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Center vertically within the viewport */
}

.button-container {
  display: flex;
  gap: 25%; /* Adjust the spacing between buttons */
}
</style>
