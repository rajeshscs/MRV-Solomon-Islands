<template >

  <Header />
  <h1 data-aos="fade-right " data-aos-delay="100" style="color: #000; font-weight: 700; font-size: 3rem; font-family: Inter;" class="pt-4 pb-3 text-center">Knowledge <span style="color: green; font-weight: 700;">Resources</span></h1>
  <div id="carouselExampleControls"   class="carousel carousel-dark   slide" data-bs-ride="carousel">
   <div class="carousel-inner">
      <div class="carousel-item pt-4 pb-3 active">
         <div class="card-wrapper container-sm d-flex justify-content-between">
            <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b2.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            </div>
            <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b3.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            </div>
            <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b4.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            </div>
            <!-- <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b5.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            </div> -->
         </div>
      </div>
      <!-- Duplicate the carousel items and adjust the image paths as needed -->
      <!-- Make sure to update the image paths in the duplicated carousel items -->

      <div class="carousel-item pt-4 pb-3">
         <div class="card-wrapper container-sm d-flex justify-content-between">
            <!-- Duplicate the card elements with different image paths -->
            <!-- Adjust the image paths accordingly -->
            <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b6.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            </div>
            <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b7.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            </div>
            <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b2.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            <!-- </div>
            <div class="card mx-3 image-overlay cus-card">
               <img src="../assets/images/b3.jpg" class="card-img-top" style='border-radius: 1px;' alt="...">
               <a href="#" class="p-3 mobile-hidden" style="text-decoration: none; color: #000; font-weight: 900;">Link to <i style="margin-left: 80%;" class="bi bi-chevron-right "></i></a>
            </div> -->
         </div>
      </div>
      </div>
      <!-- Add more carousel items as needed -->

   </div>

   <!-- Add carousel controls -->
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span  class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
   </button>
</div>
  <Footer />
</template>
<script setup>
  import Footer from '../components/Footer.vue'
  import Header from '../components/Header.vue'
  import Breadcrumb from '../components/Breadcrumb.vue'
</script>
<style scoped>
  .card-link:hover .card {
  transition: .2s;
  box-shadow: 4px 8px 14px 4px rgba(0, 0, 0, 0.2);
  }
  .cus-card{
  transition: .2s;
  box-shadow: 0px 0px 10px #0000002e;
  border-radius: 10px;
  }
  .cus-card:hover{
  transition: .2s;
  box-shadow: 0 0 10px #00000056;
  }     
  @media (max-width: 768px) {
  .cus-card {
  width: 48%; 
  margin-right: 10px;
  }
  }
  @media (max-width: 576px) {
  .cus-card {
  width: 100%;
  margin-right: 0; 
  }
  .text-center{
  font: inline;
  }
  }
  
</style>