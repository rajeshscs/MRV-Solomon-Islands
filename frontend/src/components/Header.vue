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
    <img src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid p-2" />
  </div>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav w-100 mr-2">
      <li class="nav-item mr-2"> <!-- Reduce margin -->
        <router-link to="/home"  class="custom-link text-lg p-3" style="transition:.3s;">Home</router-link>
      </li>
      <li class="nav-item mr-2"> <!-- Reduce margin -->
        <router-link to="/about" class="custom-link text-lg p-3" style="transition:.3s;">About MRV Tool</router-link>
      </li>
      <li class="nav-item mr-2"> <!-- Reduce margin -->
        <router-link to="/project"  class="custom-link text-lg p-3" style="transition:.3s;">Project</router-link>
      </li>
      <li>
      <router-link to="/reports"  class="custom-link text-lg p-3" style="transition:.3s;">Reports</router-link>
      </li>
      <li class="nav-item mr-2"> <!-- Reduce margin -->
        <router-link to="/knowledgeresource"  class="custom-link text-lg p-3" style="transition:.3s;">Knowledge Resources</router-link>
      </li>
    </ul>
  </div>
  <div class="ml-auto">
    <a href="https://mrvtools.go1cms.com/login#login">
    <button class="btn custom-btn btn-md" >Login</button>
    </a>
  </div> 
</nav>
<section  class="breadcrumb-area">

</section>

<router-view />

  </header>
</template>

<script scoped>
export default {
  data() {
    return {
      // Define separate keys for each route
      aboutRefreshKey: 0,
    };
  },
};

$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
  $(document).scroll(function () {
    var $nav = $(".custom-link");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});
</script>

<style scoped>
.bg {
  background-image: linear-gradient(rgba(128, 128, 128, 0.701), rgba(128, 128, 128, 0.118));
  border: none;
}
.navbar-fixed-top.scrolled {
  /* transition: 10s; */
  background-color: #ffffffe1 !important;
  transition: background-color 200ms linear;
}

.custom-link.scrolled {
  /* transition: 10s; */
  color: black;
}

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



.custom-link:hover {
  color: red;
  text-decoration: none;
  font-weight: 700 !important;
}
.custom-btn {
background-color: rgba(255, 0, 0, 0.678);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.344);
    color: #fff;
    text-decoration: none;
    border: none;
    margin-right: 40px;
    border-radius: 4px;
  }
  
  .custom-btn:hover {
    box-shadow: 0 0 10px rgba(255, 191, 191, 0.109);
    color: #fff;
  }

.cus-navbar {
  margin-bottom: 0 !important;
  border-radius: 0 !important;
}

</style>
