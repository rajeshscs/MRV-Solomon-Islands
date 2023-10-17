<template>
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
          <img src="../assets/images/report.jpg" class="p-5 report-image">
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
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

@media (max-width: 768px) {
    .img{
      position: relative;
      background-color: #00220012;
      height: 19rem;
  }
  .report-image{
      width: 100%;
      height: 100%;
      margin: auto;
      position: relative;
  }
}

.report-image {
  width: 80%;
  height: 100%;
  margin: auto;
  position: relative;
}

</style>
