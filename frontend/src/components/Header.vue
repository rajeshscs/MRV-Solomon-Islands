<template>
  <header class="header">
    <nav class="navbar cus-navbar navbar-expand-lg navbar-fixed-top bg navbar-light p-0">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="site-logo">
        <!-- Update the src attribute to the correct path -->
        <img src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid" />
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-4">
            <router-link to="/home" class="custom-link text-lg">Home</router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link to="/about" class="custom-link text-lg">About MRV Tool</router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link to="/project" class="custom-link text-lg">Project</router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link to="/reports" class="custom-link text-lg">Reports</router-link>
          </li>
          <li class="nav-item mr-4">
            <router-link to="/knowledgeresource" class="custom-link text-lg">Knowledge Resources</router-link>
          </li>
        </ul>
      </div>
      <div class="ml-auto">
        <button  class="btn custom-btn btn-lg">Login</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Reduce the logo size */
.site-logo img {
  max-width: 30%; /* Adjust the size as needed */
  margin-left: 70px;
}

li {
  font-size: 18px;
  font-weight: 500;
  color: rgb(255, 255, 255);
}


.mr-4 {
  margin-left: 20px;
}

.custom-link {
  color: rgb(255, 255, 255);
  margin-left: 10px;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Inter'
}

.bg {
  background-color: rgba(0, 0, 0, 0.103);
}

.custom-link:hover {
  color: red;
  text-decoration: none;
}

.custom-btn {
  background-color: rgb(202, 0, 0);
  color: #fff;
  text-decoration: none;
  border: none;
  margin-right: 40px;
  border-radius: 4px;
}

.custom-btn:hover {
  background-color: #ff0000;
  text-decoration: none;
  color: #fff;
}

.cus-navbar {
  margin-bottom: 0 !important;
  border-radius: 0 !important;
}

</style>
