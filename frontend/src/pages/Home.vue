<template >
  <Header />
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div v-for="(item, index) in data.message.parent_data.carousel_image" :key="index" class="carousel-item" :class="{ active: index === 0 }">
      <div class="card mx-0 image-overlay cus-card" style="height: 50rem;">
        <img v-if="item.image" :src="item.image" class="d-block w-100 h-100 carousel_image" alt="...">
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
     <div>
      <div
        data-aos="fade-right"
        data-aos-delay="50"
        class="about-area report-section about-2 fix wow fadeInUp"
        data-wow-delay="0.3s"
        id="reports"
        >
        <hr style="border-color: #8f8f8f;">
        <h1 style="color: #000; font-weight: 700; font-size: 3rem; font-family: Inter;" class="p-5 text-center">
           National <span style="color: green; font-weight: 700;">GHG</span> Inventory
        </h1>
        <div class="container-fluid">
           <div class="row" v-for="item in data.message" :key="item.name">
            <div class="img p-1"  v-if="item.report_image">
              <div class="pattern-background">
                  <img src="../assets/images/pattern.png" style="height: 100%;">
              </div>
              <div>
                  <img :src="item.report_image" class="report-image">
              </div>
            </div>

            <div class="img p-1"  v-if="item.report_image1">
              <div class="pattern-background">
                  <img src="../assets/images/pattern.png" style="height: 100%;">
              </div>
              <div>
                  <img :src="item.report_image1" class="report-image report-image1">
              </div>
            </div>

            <div class="img p-1" v-if="item.report_image2">
              <div class="pattern-background">
                  <img src="../assets/images/pattern.png" style="height: 100%;">
              </div>
              <div>
                  <img :src="item.report_image2" class="report-image report-image2">
              </div>
            </div>  
           </div>
        </div>
     </div>
     </div>
     <!-- Knowledge Resource Carousel -->
     <div>
      <hr style="border-color: 1px #8f8f8f;">   
      <h1 data-aos="fade-right" data-aos-delay="100" style="color: #000; font-weight: 700; font-size: 3rem; font-family: Inter;" class="pt-5 pb-3 text-center">
            Knowledge <span style="color: green; font-weight: 700;">Resources</span>
         </h1>
        <knowledgeResource  :data="data" />
        <br>
     </div>
  </div>
  <Footer  :data="data" />
</template>
<script setup>
  import Footer from '@/components/Footer.vue'
  import Header from '@/components/Header.vue'
  import knowledgeResource from '@/components/KnowledgeResource.vue'
  import ProjectComponent from '@/components/ProjectComponent.vue'
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const data = ref([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all');
  
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
  setTimeout(() => {
   $('.breadcrumb-area').attr('style', "display:none !important;")
  }, 1000);
</script>
<style >
 .breadcrumb-area{
   display: none !important;
 }
  .card-link:hover .card {
  transition: .2s;
  box-shadow: 4px 8px 14px 4px rgba(0, 0, 0, 0.098); 
  }
  .carousel_image{
   border-radius:0 !important;
   object-fit: cover;
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
  }     
  .img {
  position: relative;
  background-color: #00220012;
  height: auto;
  }
  .pattern-background {
  height: 100%;
  position: absolute;
  z-index: -1;
  }
  .report-image {
  width: 80%;
  height: auto !important;
  margin: auto;
  position: relative;
  padding: 25px 0;
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
  }
  @media only screen and (max-width: 600px) {
  .custom-col {
  flex: 0 0 calc(50% - 20px); 
  margin: 10px;
  }
  }
</style>