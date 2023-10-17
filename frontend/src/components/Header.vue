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
      <div class="site-logo ml-auto mr-auto "> <!-- Display only on lg and smaller screens -->
        <img src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid p-2" />
      </div>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav w-100 mr-2">
          <li class="nav-item mr-2">
            <router-link to='/home' class="custom-link text-lg p-3" style="transition:.3s;">Home</router-link>
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



/* toggle area */
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
  .img-fluid{
    padding: 10px;
    height: 50%;
  }
    .navbar-toggler:focus {
      text-decoration: none;
      outline: 0;
      box-shadow:none !important;
  }
    .mr-auto {
          margin-right: 79px !important;
      }
    .ml-auto {
    margin-left: -20px;
  }
  .breadcrumb-area {
    /* position: relative; */
    /* background: url(../assets/images/footer.png); */
    background: url(/src/assets/images/banner.jpeg);
    background-size: contain;
    /* background-attachment: fixed; */
    background-repeat: no-repeat;
    height: 130px;
    width: 100%;
}
.site-logo img {
    width: 31%;
    margin-right: 10px;
    padding: 0px !important;
}
.bg {
  background-image: linear-gradient(rgba(86, 86, 86, 0.823), rgba(57, 57, 57, 0.27));
  border: none;
  color: #fff;
}

.navbar-fixed-top.scrolled {
  /* transition: 10s; */
  background-color: #ffffffe1 !important;
  transition: background-color 200ms linear;
}
.custom-link.scrolled {
  color: rgb(255, 255, 255);
}
}
</style>
