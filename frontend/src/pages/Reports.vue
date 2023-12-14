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
                  <img :src="item.report_image1" class="report-image1">
              </div>
            </div>

            <div class="img p-1" v-if="item.report_image2">
              <div class="pattern-background">
                  <img src="../assets/images/pattern.png" style="height: 100%;">
              </div>
              <div>
                  <img :src="item.report_image2" class="report-image2">
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
  console.log(data)
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
    var values = data._rawValue.message.parent_data.contact_number
    var childField = data._rawValue.message.child_table_data
    // const {report_image,report_image1,report_image2} = data._rawValue.message.parent_data
    var values = data._rawValue.message.parent_data

    // var contactField = data._rawValue.message.parent_data.contact_number
    // for (number of contactField){
    //   if(number.contact_number){
    //     console.log("contact_number", contact_number);
    //   }
    // }
    for (var item of childField){
      if (item.image){
        console.log("item",item.image);
      }
      else{
        console.log("no item found");
      }
    }
  
    console.log("responsee", values);
  };
  
  // const fetchPartnerLogos = async () => {
  //   try {
  //     const response = await axios.get('http://your-api-url-for-partner-logos');
  //     if (response.status === 200) {
  //       partnerLogos.value = response.data; // Assuming your API returns an array of partner logos
  //     } else {
  //       throw new Error('Network response was not ok');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
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
  .report-image, .report-image1, .report-image2 {
  width: 80% !important;
  height: 493px !important;
  margin: auto;
  position: relative;
  padding: 38px 0px !important;
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