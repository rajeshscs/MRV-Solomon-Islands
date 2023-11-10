<template>
  <div>
     <Header />
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
     <Footer :data="data" />
  </div>
</template>
<script setup>
  import Footer from '@/components/Footer.vue'
  import Header from '@/components/Header.vue'
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const data = ref([]);
  const partnerLogos = ref([]); // To store partner logos
  
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
  
  const fetchPartnerLogos = async () => {
    try {
      const response = await axios.get('http://your-api-url-for-partner-logos');
      if (response.status === 200) {
        partnerLogos.value = response.data; // Assuming your API returns an array of partner logos
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  onMounted(() => {
    fetchData();
    fetchPartnerLogos();
  });
</script>
<style scoped>
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
  width: 80% !important;
  height: 493px !important;
  margin: auto;
  position: relative;
  }
  @media(max-width: 768px) {
  .img {
  position: relative;
  background-color: #00220012;
  height: 24rem;
  }
  .report-image {
  width: 100%;
  height: 223px !important;
  margin: auto;
  position: relative;
  }
  }
</style>