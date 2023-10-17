<template>
  <header class="header">
    <nav class="navbar cus-navbar navbar-expand-lg navbar-fixed-top bg navbar-light p-0">
      <button
        class="navbar-toggler text-white"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="site-logo ml-auto mr-auto "> <!-- Display only on lg and smaller screens -->
        <img src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid p-2" />
      </div>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100 mr-2">
          <li class="nav-item mr-2">
            <router-link to='/home' class="custom-link text-lg p-3 active" style="transition:.3s;">Home</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to='/about' class="custom-link text-lg p-3" :class="{ 'active-link': $route.path === '/about' }" style="transition:.3s;">About MRV Tool</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to='/project' class="custom-link text-lg p-3" :class="{ 'active-link': $route.path === '/project' }" style="transition:.3s;">Project</router-link>
          </li>
          <li>
            <router-link to='/reports' class="custom-link text-lg p-3" :class="{ 'active-link': $route.path === '/reports' }" style="transition:.3s;">Reports</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to='/knowledgeresource' class="custom-link text-lg p-3" :class="{ 'active-link': $route.path === '/knowledgeresource' }" style="transition:.3s;">Knowledge Resource</router-link>
          </li>
        </ul>
      </div>
      <div>
        <a href="https://mrvtools.go1cms.com/login#login">
        <button class="btn custom-btn btn-md">Login</button>
        </a>
      </div>
    </nav>


    
<router-view />
  
    </header>
    <div  id="carouselExampleIndicators"  data-aos="fade-down " data-aos-delay="50"  class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/images/herobanner-2.jpg" class="d-block w-100 h-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/herobanner-3.jpg" class="d-block w-100 h-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/bann5.jpg" class="d-block w-100 h-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <i  class="bi bi-chevron-left bi-2x"></i>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <i  class="bi bi-chevron-right bi-2x"></i>
      <span class="visually-hidden">Next</span>
    </button>
  </div>


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
.active{
  color: green !important;
  text-decoration: none;
  font-weight: 700 !important;

}


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
  width: 45%;
  margin-left: 20px;
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



.active, .custom-link:hover {
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


/* toggle nav area */

.navbar-toggler-icon {
    display: inline-block;
    width: 2.5em;
    height: 2.5em;
    vertical-align: middle;
    background-image: var(--bs-navbar-toggler-icon-bg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 93%;
    color: #fff;
}

.navbar-toggler:hover {
    text-decoration: none;
    height: 30px;
    width: 45px;
}


@media (max-width: 576px) {
    /* .carousel {x
      margin-top: 80px;
    } */
    .img-fluid{
    padding: 20px !important;
  }
    .navbar-toggler:focus {
      text-decoration: none;
      outline: 0;
      box-shadow:none !important;
    }
    .mr-auto {
        margin-right: 99px !important;
    }
    .ml-auto {
    margin-left: -31px;
  }
    .site-logo img {
    width: 31%;
    margin-right: 10px;
    padding: 0px !important;
}
}
.bi-chevron-left{
    font-weight: bold !important;
    font-size: 3rem !important;
}
.bi-chevron-right{
    font-weight: bold !important;
    font-size: 3rem !important;
}


.bg {
  background-image: linear-gradient(rgba(58, 58, 58, 0.701), rgba(79, 79, 79, 0.289));
  border: none;
}

</style>

  