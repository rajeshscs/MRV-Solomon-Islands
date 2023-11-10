<template >
  <HomeHeader />
  <div  id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
     <div v-for="item in data.message" :key="item.name" class="carousel-inner">
        <div v-if="item.carousel1" class="carousel-item active">
           <div class="card mx-0 image-overlay cus-card">
              <img :src="item.carousel1" class="d-block w-100 h-100" alt="...">
           </div>
        </div>
        <div v-if="item.carousel2" class="carousel-item">
           <div class="card mx-0 image-overlay cus-card">
              <img :src="item.carousel2"  class="d-block w-100 h-100" alt="...">
           </div>
        </div>
        <div v-if="item.carousel2" class="carousel-item">
           <div class="card mx-0 image-overlay cus-card">
              <img :src="item.carousel2"  class="d-block w-100 h-100" alt="...">
           </div>
        </div>
     </div>
     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <i style="font-size: 35px;" class="bi bi-chevron-left bi-2x"></i>
     <span class="visually-hidden">Previous</span>
     </button>
     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <i style="font-size: 35px;" class="bi bi-chevron-right bi-2x"></i>
     <span class="visually-hidden">Next</span>
     </button>
  </div>
  <div>
     <ProjectComponent :data="data" />
     <!-- Report  -->
     <div>
        <div
           data-aos="fade-right"
           data-aos-delay="50"
           class="about-area report-section about-2 fix wow fadeInUp"
           data-wow-delay="0.3s"
           id="reports"
           >
           <h1 style="color: #000; font-weight: 700; font-size: 3rem; font-family: Inter;" class="p-5 text-center">
              National <span style="color: green; font-weight: 700;">GHG</span> Inventory
           </h1>
           <div class="container-fluid">
              <div class="row">
                 <div class="img p-1">
                    <div class="pattern-background">
                       <img src="../assets/images/pattern.png" style="height: 100%;">
                    </div>
                    <div v-for="item in data.message" :key="item.name">
                       <div v-if="item.report_image">
                          <img :src="item.report_image" class="p-5 report-image">
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
     <!-- Knowledge Resource Carousel -->
     <div>
        <knowledgeResource  :data="data" />
        <br>
     </div>
  </div>
  <Footer  :data="data" />
</template>
<script setup>
  import Footer from '@/components/Footer.vue'
  import HomeHeader from '@/components/HomeHeader.vue'
  import knowledgeResource from '@/components/KnowledgeResource.vue'
  import ProjectComponent from '@/components/ProjectComponent.vue'
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const data = ref([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.0.183:8189/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all');
  
      if (response.status === 200) {
        data.value = response.data;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    var values = data._rawValue.message.parent_data
    var field = values.heading
    var childField = data._rawValue.message.child_table_data
    for (var item of childField){
      if (item.image){
        console.log("item",item.image);
      }
      else{
        console.log("no item found");
      }
    }
  
    console.log("response", values);
    console.log("response", field);
  };
  
  onMounted(() => {
    fetchData();
  });
      
   
</script>
<style >
  /* .right.carousel-control:hover{
  border-radius: 20px;
  border-width: 20% red;
  border:navy;
  color: red;
  } */
  .card-link:hover .card {
  transition: .2s;
  box-shadow: 4px 8px 14px 4px rgba(0, 0, 0, 0.098); /* Customize the shadow style as needed */
  }
  .cus-card{
  transition: .2s;
  box-shadow: 0px 0px 10px #0000002e;
  border-radius: 10px;
  border: none !important;
  }
  .cus-card:hover{
  transition: .2s;
  box-shadow: 0 0 10px #00000056;
  }       /* Media Queries for responsiveness */
  /* Report view css */
  .img {
  position: relative;
  background-color: #00220012;
  height: 50rem;
  }
  .pattern-background {
  height: 100%;
  position: absolute;
  z-index: -1;
  }
  .report-image {
  width: 80%;
  height: 493px !important;
  margin: auto;
  position: relative;
  }
  /* Table */
  @media (max-width: 768px) {
  .img{
  position: relative;
  background-color: #00220012;
  height: 19rem;
  }
  .report-image {
  width: 94%;
  height: 120% !important;
  margin: auto;
  position: unset;
  }
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
  padding: 10px !important;
  display: table !important;
  }
  .container{
  width: 90%;
  }
  /* .carousel-control-prev-icon{
  margin-right: 34px;
  }
  .carousel-control-next-icon{
  margin-left: 34px;
  } */
  }
  @media only screen and (max-width: 600px) {
  .custom-col {
  flex: 0 0 calc(50% - 20px); /* Adjust width as needed */
  margin: 10px;
  }
  }
</style>