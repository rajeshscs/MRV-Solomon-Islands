<template>
   <Header />
    <!-- .entry-header -->
    <!-- <section class="breadcrumb-area"> -->

<!-- <div class="container-fluid">
<div class="row">
   <div class="col-12">
      <div class="all-banner" style="position: relative;">
      </div>
      <br><br>
      <div class="inner-content clearfix">
         <div class="title" style="margin-left: 100px; margin-top: 10px; position: relative;">
            <h1 style="font-weight: 800; color: white;">About</h1>
            <div style="position: absolute; top: -10px; left: 0; width: 10%; border-top: 5px solid white;"></div>
         </div> -->
         <!-- <div class="breadcrumb-menu" style="position: absolute; top: 200px; right: 200px; word-spacing: 30px; padding: 20px;">
            <a style="color: #fff;" href="#">Home </a>
            <a style="color: #fff;" href="#"> About</a>
         </div> 
      </div>
   </div>
</div>
</div> -->
<!-- </section> -->

<div  class="counter-area fix area-padding"  id="about">
 <div class="container-fluid" data-aos="flip-up " data-aos-delay="100">
    <div class="row" data-aos="flip-up " data-aos-delay="100">
       <div class="col-md-12 col-sm-12 col-xs-12 wow fadeInLeft" data-wow-delay="0.3s">
         <h3 style="color: #000; font-weight: 700;" class="text-start">Basic information of MRV tool</h3>
         <br> 

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure adipisci doloribus dicta eius. Quia eligendi tempora eaque excepturi aspernatur, cupiditate accusantium officia ex dignissimos quae, sunt laboriosam quisquam. Hic molestiae quia deleniti voluptatem exercitationem esse obcaecati dolor doloremque! Enim molestiae illum culpa ullam nostrum nulla vero earum maiores aliquam neque?</p>
          <br> 

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum magnam autem assumenda molestias quasi quod? </p>
          <br> 

          <p>2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam praesentium, ea obcaecati assumenda explicabo repellendus cumque aspernatur numquam.</p>
          <br> 

          <p>3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum assumenda est, harum illo, placeat non aliquid voluptates blanditiis, eos explicabo ut deleniti laborum ab? </p>
          <br> 

          <p>4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores a, aliquid fugit omnis ullam rem, perspiciatis obcaecati facere earum assumenda quod ea dolores!</p>
          <br> 

          <h3 data-aos="flip-up " data-aos-delay="100" style="color: #000; font-weight: 700;" class="text-start">What is the new and latest development in MRV </h3>
          <br> 

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias voluptas laborum natus qui possimus enim architecto hic quo. Quaerat velit debitis pariatur recusandae repudiandae, aut numquam illum error mollitia voluptate at dolores nihil repellendus?</p>
          <br> 

          <p>The ultimate MRV Tool</p>
          <br> 

          <p> 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, architecto facere! Suscipit iure impedit neque vel? Non et voluptate sit quis dolorum id! </p>
          <br> 

          <p>2. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur natus neque iure perferendis fuga.</p>
          <br> 

          <p>3. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, ratione dolore eius error voluptas quis facere consectetur ea quidem hic libero illo doloremque consequatur! Dolorum beatae eaque id officia corrupti.</p>
          
       </div>
    </div>
 </div>
</div>


<router-view />


<Footer />
</template>
<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'


</script> 



<style scoped>
.breadcrumb-area {
  /* position: relative; */
  /* background: url('../assets/images/footer.png');  */
  background: url('../src/assets/images/edited.jpeg'); /* no-repeat center center fixed; */
  background-size:cover;
  /* background-attachment: fixed; */
  height: 500px; 
}

p, h3{
margin-left: 20px;
}

</style>