<template>
  <header class="header">
    <nav class="navbar cus-navbar navbar-expand-lg navbar-fixed-top bg navbar-light p-0">
      <button
      style="border: none !important;"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      
        <span><i class="bi bi-list" style="color: rgb(39, 39, 39) !important;"></i></span>
      </button>
      <div class="site-logo ml-auto mr-4 "> <!-- Display only on lg and smaller screens -->
        <router-link to='/home'><img style="color: white"  src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid p-2" /></router-link>
      </div>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100 mr-2">
          <li class="nav-item mr-2">
            <router-link to='/home' class="custom-link text-lg " style="transition:.3s; margin-right:20px;">Home</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to='/about' class="custom-link text-lg " :class="{ 'active-link': $route.path === '/about' }" style="transition:.3s; margin-right:20px;">About MRV Tool</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to='/project' class="custom-link text-lg " :class="{ 'active-link': $route.path === '/project' }" style="transition:.3s; margin-right:20px;">Project</router-link>
          </li>
          <li>
            <router-link to='/reports' class="custom-link text-lg " :class="{ 'active-link': $route.path === '/reports' }" style="transition:.3s; margin-right:20px;">Reports</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to='/knowledgeresource' class="custom-link text-lg " :class="{ 'active-link': $route.path === '/knowledgeresource' }" style="transition:.3s; margin-right:20px;">Knowledge Resource</router-link>
          </li>
        </ul>
      </div>
      <div>
        <a href="https://mrvtools.go1cms.com/login#login">
        <button class="btn custom-btn btn-md">Login</button>
        </a>
      </div>
    </nav>
    <section class="breadcrumb-area"></section> <!-- Hide on small (sm) screens and below -->
    <router-view />
  </header>
</template>

<script scoped>
import { ref, onMounted, onUnmounted } from 'vue';

// Function to handle the click event and add "active" class
function handleRouterLinkClick(event) {
  const current = document.querySelector('.custom-link.active');
  if (current) {
    current.classList.remove('active');
  }
  event.target.classList.add('active');
}

onMounted(() => {
  // Attach click event listener to the router-links
  const routerLinks = document.querySelectorAll('.custom-link');
  routerLinks.forEach((link) => {
    link.addEventListener('click', handleRouterLinkClick);
  });
});

onUnmounted(() => {
  // Remove event listeners to prevent memory leaks
  const routerLinks = document.querySelectorAll('.custom-link');
  routerLinks.forEach((link) => {
    link.removeEventListener('click', handleRouterLinkClick);
  });
});



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


.active-link {
  color: rgb(0, 174, 0) !important;
  text-decoration: none;
  font-size: 17px !important;
  font-weight: 700 !important;

}


.bg {
  background-image: linear-gradient(rgba(92, 92, 92, 0.687), rgba(128, 128, 128, 0.118));
  border: none;
}
.navbar-fixed-top.scrolled {
  transition: 1s;
  background-color: #fff !important;
  /* background-image: linear-gradient(#ffffffe7, #f3f3f33e) !important;  border: none; */
  transition: background-color 200ms linear;
}

.custom-link.scrolled {
  transition: 1s;
  color: rgb(0, 0, 0);
}

/* Reduce the logo size */
.site-logo img {
  margin-left: 10px;
  height: 91px;
  margin-right: 36px;
  padding: 12px !important;
}li {
  font-size: 18px;
  font-weight: 500;
  color: rgb(0, 0, 0);
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
  color: rgba(255, 255, 255, 0.749);
  text-decoration: none;
  /* font-weight: 700 !important; */
}

.custom-btn {
    background-color: rgba(255, 0, 0, 0.678);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.113);
    color: #fff;
    text-decoration: none;
    border: none;
    margin-right: 34px;
    width: 92px;
    border-radius: 4px;
    position: absolute;
    top: 19px !important;
    right: 0;
    margin: 10px;
  }
  
  .custom-btn:hover {
    box-shadow: 0 0 10px rgba(255, 191, 191, 0.109);
    color: #fff;
  }

.cus-navbar {
  margin-bottom: 0 !important;
  border-radius: 0 !important;
}



/* toggle area */
.bi-list {
  
  font-size: 32px;
  border: none;
    background-size: 93%;
}

.bi-list:hover {
    text-decoration: none;
    height: 30px;
    width: 45px;
}

@media (max-width: 576px) {
  .custom-btn{
    top:0 !important;
  }
  .img-fluid{
    padding: 10px;
    height: 50%;
  }
    .navbar-toggler:focus {
      text-decoration: none;
      outline: 0;
      box-shadow:none !important;
  }

.ml-auto {
    margin-right: 232px;
    margin-top: 4px;

}
.site-logo img {
    height: 49px !important;
    margin-left: 0px !important;
    margin-right: 34px !important;
    padding: 1px !important;
    color: #ffffff41;
}


.custom-link.scrolled {
  transition: 10s;
  color: rgb(255, 255, 255);
}

.breadcrumb-area {
    background: url("../assets/images/carousel/Untitled-3.jpg");
    background-size: cover;
    height: 202px;
}
}
</style>
