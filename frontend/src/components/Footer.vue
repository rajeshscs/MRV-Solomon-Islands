<template>
  <footer data-aos="fade-down " data-aos-delay="50" class="footer p-0 bg" style=" color: aliceblue; background-color: #001000 !important;">
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
          <div class="media">  
            <p> <i class="bi bi-geo-alt mr-3 b text-start" ></i>dolor sit amet, consectetur<br>Nullam vehicula ante<br>National Climate Change Resource Centre<br>massa rhoncus, non bibendum<br>a,sk, BOx 75722, 75275 GPO<br>asskj, Lavya</p>
          </div><br>

          <div class="media">
            <p><i class="bi bi-telephone mr-3" ></i>+883 939 3993, +883 939 3453, +883 939 4565</p>
          </div><br>

          <div class="media"> 
            <p><i class="bi bi-envelope mr-3" ></i>sample@gov.com</p>
          </div><br>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6">
          <h3 class="mr-3 text-start" >Country Presence</h3>
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
            <div class="col-6 col-sm-5 mb-4">
              <img src="../assets/images/logo/logo-4.jpg" alt="" class="img-fluid ">
            </div>
            <div class="col-6 col-sm-5 mb-4">
              <img src="../assets/images/logo/australian-gov.png" alt=""  class="bg-white img-fluid ">
            </div>
            <!-- <div class="col-6 col-sm-5 mb-4">
              <img src="../assets/images/logo/partner-2.jpg" alt="" class="img-fluid ">
            </div>
            <div class="col-6 col-sm-5 mb-4">
              <img src="../assets/images/logo/logo-1.jpg" alt="" class="img-fluid ">
            </div> -->
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
