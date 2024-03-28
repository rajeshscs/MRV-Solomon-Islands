<template>
  <div>
    <Header />
    <section class="breadcrumb-area with-overlay"></section>
    <div class="counter-area fix area-padding" id="about">
      <div class="container-fluid" data-aos="fade-right" data-aos-delay="100">
        <div class="row" data-aos="fade-right" data-aos-delay="100">
          <h2 style="color: #000; font-weight: 700; font-size: 3rem; font-family: Inter;" class="p-5 text-center"> About<span style="color: green; font-weight: 700;"> MRV Tools</span></h2>

          <div class="col-md-12 col-sm-12 col-xs-12 wow fadeInLeft" data-wow-delay="0.3s">
            <div v-for="item in data.message" :key="item.name">
              <div v-if="item.about_heading_1">
                <h3 style="color: #000; font-weight: 700;" class="text-start">{{ item.about_heading_1 }}</h3>
              </div>
              <p v-if="item.description_1">
                {{ item.description_1 }}
              </p>
              <br>

              <div v-if="item.about_heading_2">
                <h3 style="color: #000; font-weight: 700;" class="text-start">{{ item.about_heading_2 }}</h3>
              </div>
              <p v-if="item.description_2">
                {{ item.description_2 }}
              </p>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>

    <router-view />

    <Footer :data="data" />
  </div>
</template>
<script setup>
  import Footer from '@/components/Footer.vue'
  import Header from '@/components/Header.vue'
// import { createListResource } from 'frappe-ui';
import { ref, onMounted } from 'vue';
import axios from 'axios';
$.ajax({
   success:function(){
      $('.breadcrumb-area').attr('style', "display:block !important;")
   }
  }) 

const data = ref([]);

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
  var childField = data._rawValue.message.child_table_data2
  for (var item of childField){
    if (item.image){
      console.log("item",item.image);
    }
    else{
      console.log("no item found");
    }
  }


  var contact = data._rawValue.message.parent_data
  for (var item of contact){
    if (item.contact_number){
      console.log("item",item.contact_number);
    }
    else{
      console.log("no item found");
    }
  }


  console.log("response", contact);
  console.log("response", childField);

  // console.log("response", values);
  // console.log("response", field);
};

onMounted(() => {
  fetchData();
});



// const actions = createListResource({
//   doctype: 'FrontendList',
//   fields: ["name"],
//   limit: 100
// });
// const action_data = actions.reload();
// console.log("data", action_data);

// actions.reload()


</script> 


<style scoped>

p{
margin-left: 20px;
}

</style>