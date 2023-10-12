<template>
   <header class="header">
     <nav class="navbar cus-navbar navbar-expand-lg fixed-top navbar-light bg p-0">
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
       <div class="site-logo">
         <!-- Update the src attribute to the correct path -->
         <img src="../assets/images/sig-coa.png" alt="Logo" loading="lazy" class="img-fluid" />
       </div>
       <div class="collapse navbar-collapse" id="navbarNav">
         <ul class="navbar-nav ml-auto">
           <li class="nav-item mr-4">
             <router-link to="/home" class="custom-link">Home</router-link>
           </li>
           <li class="nav-item mr-4">
             <router-link to="/about" class="custom-link">About MRV Tool</router-link>
           </li>
           <li class="nav-item mr-4">
             <router-link to="/project" class="custom-link">Project</router-link>
           </li>
           <li class="nav-item mr-4">
             <router-link to="/reports" class="custom-link">Reports</router-link>
           </li>
           <li class="nav-item mr-4">
             <router-link to="/knowledgeresource" class="custom-link">Knowledge Resources</router-link>
           </li>
         </ul>
       </div>
       <div class="ml-auto">
        <button class="btn custom-btn btn-md"><a class="s-menu" href="http://144.91.97.45:3000/" target="_blank">Login</a></button>
       </div>
     </nav>
   </header>
 </template>
 
 <style scoped>
 @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Poppins:wght@300&display=swap');

 .site-logo img {
   max-width: 25%; 
   margin-left: 70px;
 }
 
 li {
   font-size: 18px;
   font-weight: 500;
   color: rgb(255, 255, 255);
 }
 
 .mr-4 {
   margin-right: 30px;
 }

 .custom-link {
   color: aliceblue;
   margin-left: 10px;
   font-size: 14px;
   font-weight: 600;
   font-family: 'Inter'
 }
 
 .bg {
   background-color: #006600;
 }
 
 .custom-link:hover {
   color: red;
   text-decoration: none;
 }
 
 .custom-btn {
   background-color: rgb(202, 0, 0);
   color: #fff;
   text-decoration: none;
   border: none;
   margin-right: 40px;
   border-radius: 4px;
 }
 
 .custom-btn:hover {
   background-color: #ff0000;
   text-decoration: none;
   color: #fff;
 }
  .cus-navbar {
   margin-bottom: 0 !important;
   border-radius: 0 !important;
 }
 
 </style>
 