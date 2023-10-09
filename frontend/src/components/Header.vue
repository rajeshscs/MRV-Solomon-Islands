<template>
    <header class="header-one">
    <div class="lower-topbar">
       <div class="container">
          <div class="row">
             <div class="col col-sm-3">
                <div class="site-logo">
                   <a href="#"><img src="http://www.mecdm.gov.sb/templates/g5_hydrogen/custom/images/sig-coa.png" alt=""></a>
                </div>
             </div>
             <div class="col col-sm-9">
                <!---<div class="awards">
                   <div>
                       <div class="icon"><i class="fa fa-phone-square"></i></div>
                       <div class="award-info">
                           <h4>Call Us</h4>
                           <p>+254719439126</p>
                       </div>
                   </div>
                   <div>
                       <div class="icon"><i class="fa fa-envelope"></i></div>
                       <div class="award-info">
                           <h4>Email Us</h4>
                           <p>muchiri66@Yahoo.com</p>
                       </div>
                   </div>
                   </div>--->
             </div>
          </div>
       </div>
    </div>
    <!-- header-area start -->
    <div id="sticker" class="header-area header-area-2 hidden-xs">
       <div class="container">
          <div class="row">
             <!-- logo start -->
             <div class="col-md-12 col-sm-12">
                <div class="header-right-link">
                   <!-- search option start -->
                   <div class="search-inner">
                      <form action="#">
                         <div class="search-option">
                            <input type="text" placeholder="Search...">
                            <button class="button" type="submit"><i class="bi bi-search"></i></button>
                         </div>
                         <a class="main-search" href="#"><i class="bi bi-search"></i></a>
                      </form>
                   </div>
                   <a class="s-menu" href="http://144.91.97.45:3000/" target="_blank">Login</a>
                </div>
                <!-- mainmenu start -->
                <nav class="navbar navbar-default">
                   <div class="collapse navbar-collapse" id="navbar-example">
                      <div class="main-menu">
                         <ul class="nav navbar-nav navbar-right">
                            <li><router-link :to="`/landing`">Home</router-link></li>
                            <li><router-link :to="`/about`">About MRV Tool</router-link></li>
                            <li><router-link :to="`/project`">Project</router-link></li>
                            <li><router-link :to="`/reports`">Reports</router-link></li>
                            <li><router-link :to="`/knowledgeresource`">Knowledge Resources</router-link></li>
                         </ul>
                      </div>
                   </div>
                </nav>
                <!-- mainmenu end -->
             </div>
          </div>
       </div>
    </div>
    <!-- header-area end -->
    <!-- mobile-menu-area start -->
    <div class="mobile-menu-area hidden-lg hidden-md hidden-sm">
       <div class="container">
          <div class="row">
             <div class="col-md-12">
                <div class="mobile-menu">
                   <div class="logo">
                      <!-- <a href="landing"><img src="landingwp-content/uploads/2022/03/logo.png" alt="" /></a> -->
                   </div>
                   <nav id="dropdown">
                      <ul class="nav navbar-nav navbar-right">
                         <li><a href="/landing">Home</a></li>
                         <li><a href="/about">About IMRV Tool</a></li>
                         <li><a href="/project">Projects</a></li>
                         <li><a href="/reports">Reports</a></li>
                         <li><a href="/knowledgeresources">Knowledge  Resources</a></li>
                      </ul>
                   </nav>
                </div>
             </div>
          </div>
       </div>
    </div>
    <!-- mobile-menu-area end -->		
 </header>
</template>
<style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
</style>    