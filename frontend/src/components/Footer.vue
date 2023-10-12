<template>
   <footer class="footer" style="background-color: #1f1f1f; color: aliceblue;">
     <br>
     <div class="container-fluid px-5">
       <div class="row">
         <div class="col-lg-3 col-md-3 col-sm-6">
           <div class="site-logo">
             <img src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid" />
           </div>
           <p class="text-left">The Ministry of Environment and Forestry developed Kenya’s Monitoring Reporting and Verification (MRV) system/tool to facilitate climate change reporting by sectors as is required by the Climate Change Act, 2016. The Development of the system was supported by the NDC support project</p>
         </div>
         <div class="col-lg-3 col-md-3 col-sm-6">
           <h3>Contact Information</h3>
           <div class="media">
             <i class="bi bi-geo-alt mx-2 pt-1"></i>
             <p>Climate Change Directorate<br>Ministry of Environment Forestry<br>National Climate Change Resource Centre<br>Dagoretti Corner, Ngong Road<br>P.O BOX 30259, 00100 GPO<br>Nairobi, Kenya</p>
           </div>
           <div class="media">
             <i class="bi bi-telephone mx-2"></i>
             <p>+254 20 2730808, +254 20 2730809, +254 20 2725707</p>
           </div>
           <div class="media">
             <i class="bi bi-envelope mx-2"></i>
             <p>psoffice@environment.go.ke</p>
           </div>
         </div>
         <div class="col-lg-3 col-md-3 col-sm-6">
           <h3 class="text-light">Country Presence</h3>
           <ul class="list-unstyled">
             <li>
               <router-link to="/home" class="custom-link">Home</router-link>
             </li>
             <li>
               <router-link to="/about" class="custom-link">About MRV Tool</router-link>
             </li>
             <li>
               <router-link to="/project" class="custom-link">Projects</router-link>
             </li>
             <li>
               <router-link to="/reports" class="custom-link">Reports</router-link>
             </li>
             <li>
               <router-link to="/knowledgeresource" class="custom-link">Knowledge Resources</router-link>
             </li>
           </ul>
         </div>
         <div class="col-lg-3 col-md-3 col-sm-6">
           <h3>Our Partners</h3>
           <div class="row">
             <div class="col-6 col-sm-5 mb-4">
               <img src="http://imrvtool.com/wp-content/uploads/2022/04/partner-4.jpg" alt="" class="img-fluid ">
             </div>
             <div class="col-6 col-sm-5 mb-4">
               <img src="http://imrvtool.com/wp-content/uploads/2022/04/partner-3.jpg" alt="" class="img-fluid ">
             </div>
             <div class="col-6 col-sm-5 mb-4">
               <img src="http://imrvtool.com/wp-content/uploads/2022/04/partner-2.jpg" alt="" class="img-fluid ">
             </div>
             <div class="col-6 col-sm-5 mb-4">
               <img src="http://imrvtool.com/wp-content/uploads/2022/05/logo-4.jpg" alt="" class="img-fluid ">
             </div>
           </div>
         </div>
       </div>
     </div>
     <hr>
      <div class="copyright text-center">
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
   }
   .custom-link:hover {
     color: red;
     text-decoration: none;
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
     width: 30%;
   }
 </style>
 