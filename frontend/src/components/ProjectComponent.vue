<template>
   <!-- <section class="breadcrumb-area with-overlay"></section> -->
<div>
    <div class="tab-area fix area-padding bg-color wow fadeInUp" data-aos="fade-right " data-aos-delay="100" data-wow-delay="0.3s" id="projects">
       <div class="container-fluid">
           <div class="section-headline text-center">
            <h2 style="color: #000; font-weight: 700; font-size: 3rem; font-family: Inter;" class="p-5 text-center">Our <span style="color: green; font-weight: 700;">Projects</span></h2>
           </div>
            <ul v-for="item in data.message" :key="item.name" class="pr-blw-img-list" style="list-style: none; display:flex">
            <li v-if="item.project_image1" class="list_image">
               <img :src="item.project_image1" class="pro_image">
               <div class="overlay"><h5 style="margin-top: 30%;">{{item.project_image1_title}}</h5></div>
            </li>
            <li v-if="item.project_image2" class="list_image">
               <img :src="item.project_image2" class="pro_image">
               <div class="overlay"><h5 style="margin-top: 30%;"></h5>{{item.project_image2_title}}</div>
            </li>
            <li v-if="item.project_image3" class="list_image">
               <img :src="item.project_image3" class="pro_image">
               <div class="overlay"><h5 style="margin-top: 30%;">{{item.project_image3_title}}</h5></div>
            </li>
            </ul>
           <br>
           <br>
 
           <div class="row">
            <div class="tab-menu mx-5 mb-4">
   <!-- Start Nav tabs -->

            <ul style="margin-right: 35px;" data-aos="fade-right " data-aos-delay="100" class="nav nav-pills flex-wrap tab_parent" id="pills-tab" role="tablist" >
               <li class="nav-item active tab_child">
                  <a class="nav-link style-class" id="pills-home-tab" href="#p-view-2" role="tab" data-toggle="tab" aria-controls="pills-home" aria-selected="true">Adaptation </a>
               </li>
               <li class="nav-item tab_child">
                  <a class="nav-link style-class" id="pills-profile-tab" href="#p-view-5" role="tab" data-toggle="tab" aria-controls="pills-profile" aria-selected="false">Mitigation </a>
               </li>
               <li class="nav-item tab_child">
                  <a class="nav-link style-class" id="pills-contact-tab" href="#p-view-6" role="tab" data-toggle="tab" aria-controls="pills-contact" aria-selected="false">Cross cutting</a>
               </li> 
               <li class="nav-item tab_child">
                  <a class="nav-link style-class" id="pills-contact-tab" href="#p-view-7" role="tab" data-toggle="tab" aria-controls="pills-contact" aria-selected="false">Enablers</a>
               </li>
               <li class="nav-item tab_child">
                  <a class="nav-link style-class" id="pills-contact-tab" href="#p-view-7" role="tab" data-toggle="tab" aria-controls="pills-contact" aria-selected="false">Transparency</a>
               </li>
               <li class="nav-item tab_child">
                  <a class="nav-link style-class" id="pills-contact-tab" href="#p-view-7" role="tab" data-toggle="tab" aria-controls="pills-contact" aria-selected="false">Support</a>
               </li>
            </ul>
         </div>
         <!-- </div> -->


               <div class="container-fluid">
            <div class="col-md-12 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.7s">
               <div class="tab-content p-4" >
                  <!-- Start Tab Content -->
                  <div class="tab-pane active" id="p-view-2" >
                  <div class="tab-inner" >
                     <div class="table-responsive" data-aos="fade-right " style="height: 50rem;" data-aos-delay="100">
                     <table class="table table-striped table-bordered table-hover">
                        <thead style="background-color: #006600; color:white; padding: 20px">
                        <tr>
                           <th scope="col">Sno</th><th scope="col">Intervention</th><th scope="col">Sector</th>
                           <th scope="col">Subsector</th><th scope="col">Project Title</th><th scope="col">Implementing Agency</th>
                           <th scope="col">Area Name</th><th scope="col">Project Cost (USD)</th><th scope="col">Sources of Funding</th>
                           <th scope="col">Start Date</th><th scope="col">End Date</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider table-divider-color"  style="overflow: auto;">
                        <tr v-for="table_item in data.message.parent_data.adaptation_table" :key="table_item.name" >
                           <th style="padding: 10px;" scope="row">{{table_item.idx}}</th>
                           <td v-if="table_item.intervention">{{table_item.intervention}}</td>
                           <td v-if="table_item.sector">{{table_item.sector}}</td>
                           <td v-if="table_item.subsector">{{table_item.subsector}}</td>
                           <td v-if="table_item.project_title">{{table_item.project_title}}</td>
                           <td v-if="table_item.implementing_agency">{{table_item.implementing_agency}}</td>
                           <td v-if="table_item.area_name">{{table_item.area_name}}</td>
                           <td v-if="table_item.project_costusd">{{table_item.project_costusd}}</td>
                           <td v-if="table_item.source_of_funding">{{table_item.source_of_funding}}</td>
                           <td v-if="table_item.start_date">{{table_item.start_date}}</td>
                           <td v-if="table_item.end_date">{{table_item.end_date}}</td>
                        </tr>
                        </tbody>
                     </table>
                     </div>
                  </div>
                  </div>
                  <div class="tab-pane" id="p-view-5">
                  <div class="tab-inner">
                     <div class="table-responsive">
                     <table class="table table-striped table-bordered table-hover">
             <thead style="background-color: #006600; color:white; padding: 20px">
                        <tr>
                           <th style="padding: 20px;" scope="col">Sno</th><th style="padding: 20px;" scope="col">Intervention</th>
                           <th style="padding: 20px;" scope="col">Sector</th><th style="padding: 20px;" scope="col">Subsector</th>
                           <th style="padding: 20px;" scope="col">Project Title</th><th style="padding: 20px;" scope="col">Implementing Agency</th>
                           <th style="padding: 20px;" scope="col">Area Name</th><th style="padding: 20px;" scope="col">Project Cost (USD)</th>
                           <th style="padding: 20px;" scope="col">Sources of Funding</th><th style="padding: 20px;" scope="col">Start Date</th>
                           <th style="padding: 20px;" scope="col">End Date</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider table-divider-color">
                        <tr v-for="table_item in data.message.parent_data.mitigation_table" :key="table_item.name" >
                           <th style="padding: 10px;" scope="row">{{table_item.idx}}</th>
                           <td v-if="table_item.intervention">{{table_item.intervention}}</td>
                           <td v-if="table_item.sector">{{table_item.sector}}</td>
                           <td v-if="table_item.subsector">{{table_item.subsector}}</td>
                           <td v-if="table_item.project_title">{{table_item.project_title}}</td>
                           <td v-if="table_item.implementing_agency">{{table_item.implementing_agency}}</td>
                           <td v-if="table_item.area_name">{{table_item.area_name}}</td>
                           <td v-if="table_item.project_costusd">{{table_item.project_costusd}}</td>
                           <td v-if="table_item.source_of_funding">{{table_item.source_of_funding}}</td>
                           <td v-if="table_item.start_date">{{table_item.start_date}}</td>
                           <td v-if="table_item.end_date">{{table_item.end_date}}</td>
                        </tr>
                        </tbody>
                     </table>
                  </div>
                  </div>
                  </div>
                  <div class="tab-pane" id="p-view-6">
                  <div class="tab-inner">
                     <div class="table-responsive">
                     <table class="table table-striped table-bordered table-hover">
             <thead style="background-color: #006600; color:white; padding: 20px">
                        <tr>
                           <th style="padding: 20px;" scope="col">Sno</th><th style="padding: 20px;" scope="col">Intervention</th>
                           <th style="padding: 20px;" scope="col">Sector</th><th style="padding: 20px;" scope="col">Subsector</th>
                           <th style="padding: 20px;" scope="col">Project Title</th><th style="padding: 20px;" scope="col">Implementing Agency</th>
                           <th style="padding: 20px;" scope="col">Area Name</th><th style="padding: 20px;" scope="col">Project Cost (USD)</th>
                           <th style="padding: 20px;" scope="col">Sources of Funding</th><th style="padding: 20px;" scope="col">Start Date</th>
                           <th style="padding: 20px;" scope="col">End Date</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider table-divider-color">
                        <tr v-for="table_item in data.message.parent_data.cross_cutting_table" :key="table_item.name" >
                           <th style="padding: 10px;" scope="row">{{table_item.idx}}</th>
                           <td v-if="table_item.intervention">{{table_item.intervention}}</td>
                           <td v-if="table_item.sector">{{table_item.sector}}</td>
                           <td v-if="table_item.subsector">{{table_item.subsector}}</td>
                           <td v-if="table_item.project_title">{{table_item.project_title}}</td>
                           <td v-if="table_item.implementing_agency">{{table_item.implementing_agency}}</td>
                           <td v-if="table_item.area_name">{{table_item.area_name}}</td>
                           <td v-if="table_item.project_costusd">{{table_item.project_costusd}}</td>
                           <td v-if="table_item.source_of_funding">{{table_item.source_of_funding}}</td>
                           <td v-if="table_item.start_date">{{table_item.start_date}}</td>
                           <td v-if="table_item.end_date">{{table_item.end_date}}</td>
                        </tr>
                        </tbody>
                     </table>
                  </div>
                  </div>
                  </div>
                  <div class="tab-pane" id="p-view-7">
                  <div class="tab-inner">
                     <div class="table-responsive">
                     <table class="table table-striped table-bordered table-hover">
             <thead style="background-color: #006600; color:white; padding: 20px">
                        <tr>
                           <th style="padding: 20px;" scope="col">Sno</th> <th style="padding: 20px;" scope="col">Intervention</th>
                           <th style="padding: 20px;" scope="col">Sector</th> <th style="padding: 20px;" scope="col">Subsector</th>
                           <th style="padding: 20px;" scope="col">Project Title</th> <th style="padding: 20px;" scope="col">Implementing Agency</th>
                           <th style="padding: 20px;" scope="col">Area Name</th> <th style="padding: 20px;" scope="col">Project Cost (USD)</th>
                           <th style="padding: 20px;" scope="col">Sources of Funding</th> <th style="padding: 20px;" scope="col">Start Date</th>
                           <th style="padding: 20px;" scope="col">End Date</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider table-divider-color">
                           <tr v-for="table_item in data.message.parent_data.enablers_table" :key="table_item.name" >
                           <th style="padding: 10px;" scope="row">{{table_item.idx}}</th>
                           <td v-if="table_item.intervention">{{table_item.intervention}}</td>
                           <td v-if="table_item.sector">{{table_item.sector}}</td>
                           <td v-if="table_item.subsector">{{table_item.subsector}}</td>
                           <td v-if="table_item.project_title">{{table_item.project_title}}</td>
                           <td v-if="table_item.implementing_agency">{{table_item.implementing_agency}}</td>
                           <td v-if="table_item.area_name">{{table_item.area_name}}</td>
                           <td v-if="table_item.project_costusd">{{table_item.project_costusd}}</td>
                           <td v-if="table_item.source_of_funding">{{table_item.source_of_funding}}</td>
                           <td v-if="table_item.start_date">{{table_item.start_date}}</td>
                           <td v-if="table_item.end_date">{{table_item.end_date}}</td>
                        </tr>
                        </tbody>
                     </table>
                  </div>
                  </div>
                  </div>
                  <div class="tab-pane" id="p-view-6">
                  <div class="tab-inner">
                     <div class="table-responsive">
                     <table class="table table-striped table-bordered table-hover">
             <thead style="background-color: #006600; color:white; padding: 20px">
                        <tr>
                           <th style="padding: 20px;" scope="col">Sno</th><th style="padding: 20px;" scope="col">Intervention</th>
                           <th style="padding: 20px;" scope="col">Sector</th><th style="padding: 20px;" scope="col">Subsector</th>
                           <th style="padding: 20px;" scope="col">Project Title</th><th style="padding: 20px;" scope="col">Implementing Agency</th>
                           <th style="padding: 20px;" scope="col">Area Name</th><th style="padding: 20px;" scope="col">Project Cost (USD)</th>
                           <th style="padding: 20px;" scope="col">Sources of Funding</th><th style="padding: 20px;" scope="col">Start Date</th>
                           <th style="padding: 20px;" scope="col">End Date</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider table-divider-color">
                        <tr v-for="table_item in data.message.parent_data.transparency_table" :key="table_item.name" >
                           <th style="padding: 10px;" scope="row">{{table_item.idx}}</th>
                           <td v-if="table_item.intervention">{{table_item.intervention}}</td>
                           <td v-if="table_item.sector">{{table_item.sector}}</td>
                           <td v-if="table_item.subsector">{{table_item.subsector}}</td>
                           <td v-if="table_item.project_title">{{table_item.project_title}}</td>
                           <td v-if="table_item.implementing_agency">{{table_item.implementing_agency}}</td>
                           <td v-if="table_item.area_name">{{table_item.area_name}}</td>
                           <td v-if="table_item.project_costusd">{{table_item.project_costusd}}</td>
                           <td v-if="table_item.source_of_funding">{{table_item.source_of_funding}}</td>
                           <td v-if="table_item.start_date">{{table_item.start_date}}</td>
                           <td v-if="table_item.end_date">{{table_item.end_date}}</td>
                        </tr>
                        </tbody>
                     </table>
                  </div>
                  </div>
                  </div>
                  <div class="tab-pane" id="p-view-6">
                  <div class="tab-inner">
                     <div class="table-responsive">
                     <table class="table table-striped table-bordered table-hover">
             <thead style="background-color: #006600; color:white; padding: 20px">
                        <tr>
                           <th style="padding: 20px;" scope="col">Sno</th><th style="padding: 20px;" scope="col">Intervention</th>
                           <th style="padding: 20px;" scope="col">Sector</th><th style="padding: 20px;" scope="col">Subsector</th>
                           <th style="padding: 20px;" scope="col">Project Title</th><th style="padding: 20px;" scope="col">Implementing Agency</th>
                           <th style="padding: 20px;" scope="col">Area Name</th><th style="padding: 20px;" scope="col">Project Cost (USD)</th>
                           <th style="padding: 20px;" scope="col">Sources of Funding</th><th style="padding: 20px;" scope="col">Start Date</th>
                           <th style="padding: 20px;" scope="col">End Date</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider table-divider-color">
                        <tr v-for="table_item in data.message.parent_data.support_table" :key="table_item.name" >
                           <th style="padding: 10px;" scope="row">{{table_item.idx}}</th>
                           <td v-if="table_item.intervention">{{table_item.intervention}}</td>
                           <td v-if="table_item.sector">{{table_item.sector}}</td>
                           <td v-if="table_item.subsector">{{table_item.subsector}}</td>
                           <td v-if="table_item.project_title">{{table_item.project_title}}</td>
                           <td v-if="table_item.implementing_agency">{{table_item.implementing_agency}}</td>
                           <td v-if="table_item.area_name">{{table_item.area_name}}</td>
                           <td v-if="table_item.project_costusd">{{table_item.project_costusd}}</td>
                           <td v-if="table_item.source_of_funding">{{table_item.source_of_funding}}</td>
                           <td v-if="table_item.start_date">{{table_item.start_date}}</td>
                           <td v-if="table_item.end_date">{{table_item.end_date}}</td>
                        </tr>
                        </tbody>
                     </table>
                  </div>
                  </div>
                  </div>
               </div>
            </div>
            </div>
         </div>    
           <!-- end Row -->
       </div>
   </div>

</div>
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


.nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover {
    color: #fff !important;
    background-color: green;
    border:none !important;
    box-shadow: #014b053e 0 0 10px;
    
}

.tab-area .nav-pills .nav-link:not(.active):hover {
    color: #000000 !important;
    background-color: green !important;
}

.style-class:hover {
  color: red !important;
  font-weight: 700;
}
.pro_image{
   width: 100%; height: auto; object-fit: cover;
}
.list_image{
   position: relative;
   margin-right: 10px;
   display:flex;
   margin-left:10px;
   box-shadow: 0 0 4px #000;
   border-radius: 8px;
}
.style-class {
    color: rgb(0, 0, 0) !important;
    background-color:none !important;
    border: 0.1px solid #0000006c !important;
    font-size: 15px !important;
    font-weight: 500;
    border-radius: 4px !important ; 
    margin-left: 10px;
    margin-top: 10px !important;
  }

.tab-menu{
   size: 20% !important;
   width: 90%;
}
.tab-menu ul{
   box-shadow: none !important;
}
@media only screen and (max-width: 600px) {
   .list_image{
      display:flex;
      height: 200px !important;
   }
   .pr-blw-img-list{
      flex-direction: column;
      gap: 24px;
   }

   .tab_parent{
       display: flex!important;
       gap: 5px!important;
       margin: 0!important;
       justify-content: space-between;
       flex-wrap: nowrap!important;
       overflow: auto!important;
   }
   .tab_child{
      flex: 0 0 auto;
   }
   .nav-item a{
    margin: 0!important;
    font-size: 11px!important;
    padding: 5px 10px !important;
    border: 1px solid #ddd!important;
   }
   .tab-menu{
      margin: auto;
      margin: 0!important;
      width: 100%!important;
      padding-inline: 13px!important;
   }
   .tab-content{
      padding: 0!important;
      margin-top: 25px!important;
   }
}
</style>