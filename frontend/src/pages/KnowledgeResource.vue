<template>
   <div>
     <Header />
     <h1
       data-aos="fade-right"
       data-aos-delay="100"
       style="color: #000; font-weight: 700; font-size: 3rem; font-family: Inter;"
       class="pt-5 pb-3 text-center"
     >
       Knowledge <span style="color: green; font-weight: 700;">Resources</span>
     </h1>
     <div
       id="carouselExampleControls"
       class="carousel carousel-dark slide"
       data-bs-ride="carousel"
     >
       <div class="carousel-inner">
         <div class="carousel-item pt-4 pb-3 active">
           <div class="container">
             <div class="row">
               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-1.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Fertilize <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>
               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-2.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Cultivation <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>
               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-3.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Adaptation <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>
               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-4.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Planting <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <!-- Duplicate the carousel items and adjust the image paths as needed -->
         <div class="carousel-item pt-4 pb-3">
           <div class="container">
             <div class="row">
               <!-- Duplicate the three columns here -->
               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-5.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Resources <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>

               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-6.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Mitigation <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>
               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-7.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Navigation <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>
               <div class="col col-md-3 col-sm-2 col-xs-3 custom-col">
                 <div class="card mx-3 image-overlay cus-card">
                   <img
                     src="../assets/images/carousel/Untitled-8.jpg"
                     class="card-img-top"
                     style="border-radius: 1px;"
                     alt="..."
                   />
                   <a
                     href="#"
                     class="cus-text p-3 mobile-hidden"
                     style="text-decoration: none; color: #000; font-weight: 900;"
                     >Enablers <i class="bi bi-chevron-right "></i
                   ></a>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
 
       <button
         class="carousel-control-prev"
         type="button"
         data-bs-target="#carouselExampleControls"
         data-bs-slide="prev"
       >
         <span
           style="margin-right: 40px !important;"
           class="carousel-control-prev-icon"
           aria-hidden="true"
         ></span>
         <span class="visually-hidden">Previous</span>
       </button>
       <button
         class="carousel-control-next"
         type="button"
         data-bs-target="#carouselExampleControls"
         data-bs-slide="next"
       >
         <span
           style="margin-left: 40px !important;"
           class="carousel-control-next-icon"
           aria-hidden="true"
         ></span>
         <span class="visually-hidden">Next</span>
       </button>
     </div>
   </div>
   <br>
   <Footer />
 </template>
 
 <script setup>
  import Footer from '../components/Footer.vue'
  import Header from '../components/Header.vue'
  import Breadcrumb from '../components/Breadcrumb.vue'
</script>
<style scoped>
  .cus-card{
  transition: .2s;
  box-shadow: 0px 0px 10px #0000002e;
  border-radius: 10px;
  }
  .cus-card:hover{
  transition: .2s;
  box-shadow: 0 0 10px #00000056;
  }     

@media (max-width: 576px) {
   /* .carousel-control-next{
      margin-right: 30px!important;
   }
   .carousel-control-prev{
      margin-left: 30px!important;
   } */

  .cus-card {
   text-overflow: hidden;
   width: 100%;
   /* width: 48%;  */
   margin-right: 10px;
   }
  .text-center{
  font: inline;
  }
  .custom-col{
   padding: 20px !important;
   display: table !important;
  }
  .container{
   width: 90%;
  }

}

  

</style>