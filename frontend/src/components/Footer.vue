<template>
  <footer data-aos="fade" data-aos-delay="50" class="footer p-0 bg" style=" color: aliceblue; background-color: #001000 !important;">
     <br>
     <div class="container-fluid px-5 text-start">
        <div class="row">
           <div class="col-lg-3 col-md-3 col-sm-6">
              <div class="site-logo" style="padding: 12px;">
                 <img src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid"  />
              </div>
              <p class="text-left text-start">Lorem non bibendum ligula bibendum. Nulla facilisi. Morbi sed ante vitae erat bibendum accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque luctus libero a fringilla.</p>
           </div>
           <div class="col-lg-3 col-md-3 col-sm-6">
              <h3 class="mr-3" >Contact Information</h3>
              <div v-for="item in data.message" :key="item.name">

               <div class="media">
                  <p  v-if="item.address"> <i class="bi bi-geo-alt mr-3 b text-start" ></i>{{ item.address }}</p>
               </div>
               <br>
               <div class="media">
                  <p v-if="item.email"><i class="bi bi-envelope mr-3" ></i>{{ item.email }}</p>
               </div>
            </div>
              <br>
            </div>
            <div  v-for="item in data.message.parent_data.contact_number" :key="item.contact_number" >
               <div class="media">
                  <p><i class="bi bi-telephone mr-3" v-if="item.contact_number"></i>{{ item.contact_number }}</p>
               </div>
               <br>
            </div>

           <div class="col-lg-3 col-md-3 col-sm-6">
              <h3 class="mr-3 text-start" >Present Pages</h3>
              <ul class="list-unstyled mx-4">
                 <li>
                    <router-link to="/home" class="custom-link text-start"><i class="bi bi-chevron-right" style="font-weight: 900; !important"></i> Home</router-link>
                 </li>
                 <li>
                    <router-link to="/about" class="custom-link text-start"><i class="bi bi-chevron-right" style="font-weight: 900; !important"></i> About MRV Tool</router-link>
                 </li>
                 <li>
                    <router-link to="/project" class="custom-link text-start"><i class="bi bi-chevron-right" style="font-weight: 900; !important"></i> Projects</router-link>
                 </li>
                 <li>
                    <router-link to="/reports" class="custom-link text-start"><i class="bi bi-chevron-right" style="font-weight: 900; !important"></i> Reports</router-link>
                 </li>
                 <li>
                    <router-link to="/knowledgeresource" class="custom-link text-start"><i class="bi bi-chevron-right" style="font-weight: 900; !important"></i> Knowledge Resources</router-link>
                 </li>
              </ul>
           </div>
           <div class="col-lg-3 col-md-3 col-sm-6">
              <h3 class="mr-3"> Our Partners</h3>
              <div class="row">
                 <div v-for="item in data.message" :key="item.name">
                    <div class="col-6 col-sm-5 mb-4">
                       <div v-if="item.partner1">
                          <img  :src="item.partner1" alt="" class="img-fluid ">
                       </div>
                    </div>
                    <div class="col-6 col-sm-5 mb-4">
                       <div v-if="item.partner2">
                          <img :src="item.partner2" alt=""  class="bg-white img-fluid ">
                       </div>
                    </div>
                    <div class="col-6 col-sm-5 mb-4">
                       <div v-if="item.partner3">
                          <img  :src="item.partner3" alt="" class="img-fluid ">
                       </div>
                    </div>
                    <div class="col-6 col-sm-5 mb-4">
                       <div v-if="item.partner4">
                          <img :src="item.partner4" alt=""  class="bg-white img-fluid ">
                       </div>
                    </div>
                    <!-- <div class="col-6 col-sm-5 mb-4">
                       <div v-if="item.partner5">
                         <img  :src="item.partner5" alt="" class="img-fluid ">
                       </div>
                       </div>
                       <div class="col-6 col-sm-5 mb-4">
                       <div v-if="item.partner6">
                         <img :src="item.partner6" alt=""  class="bg-white img-fluid ">
                       </div>
                       </div> -->
                 </div>
              </div>
           </div>
        </div>
     </div>
     <hr>
     <div class="copyright text-center pt-4">
        Copyright © 2022 <a href="#" class="text-light"><strong>mrvtools.com</strong></a> All Rights Reserved
     </div>
     <br>
  </footer>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
  };
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
  .custom-link {
  color: aliceblue;
  margin-right: 4px;
  line-height: 40px;
  transition: .2s;
  }
  .custom-link:hover {
  color: red !important;
  text-decoration: none;
  transition: .2s;
  font-weight: 600;
  }
  p,
  li {
  line-height: 1.6;
  color: rgba(240, 248, 255, 0.884);
  font-size: 14px;
  text-align: left;
  font-family: 'Poppins', sans-serif;
  font-weight: lighter;
  }
  h3 {
  font-weight: 600;
  font-size: 18px;
  color: aliceblue;
  }
  img {
  border-radius: 5px;
  }
  .site-logo{
  width: 121px !important;
  /* background-color: #fff; */
  }
  .bg{
  background-image: url('../assets/images/footer.png');
  padding: 0 !important;
  }
  img{
  background-color: none !important;
  }
</style>