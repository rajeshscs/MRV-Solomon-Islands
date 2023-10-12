<template>
  <head>

  </head>
  <div>
    <router-view />
  </div>
</template>

<script>

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Poppins:wght@300&display=swap');

a, p{
  font-family: 'Inter', sans-serif;
  font-family: 'Poppins', sans-serif;
}

.breadcrumb-area {
  position: relative;
  background: url('http://environment.goappssolutions.com/wp-content/uploads/2021/11/all.jpg') no-repeat center center fixed;
  background-size:cover;
  background-attachment: fixed;
  height: 300px; /* Set the desired fixed height */

}

.all-banner img {
  display: none; /* Hide the image tag, as it's not needed for the background */
}
</style>