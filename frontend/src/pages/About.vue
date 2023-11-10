<template>
  <div>
    <Header />

    <div class="counter-area fix area-padding" id="about">
      <div class="container-fluid" data-aos="fade-right" data-aos-delay="100">
        <div class="row" data-aos="fade-right" data-aos-delay="100">
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

const data = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get('http://192.168.0.183:8189/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all');

    if (response.status === 200) {
      data.value = response.data;
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  // var values = data
  // var field = values.heading
  var childField = data._rawValue.message.child_table_data2
  for (var item of childField){
    if (item.image){
      console.log("item",item.image);
    }
    else{
      console.log("no item found");
    }
  }

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
.breadcrumb-area {
  /* position: relative; */
  /* background: url('../assets/images/footer.png');  */
  background: url('../src/assets/images/edited.jpeg'); /* no-repeat center center fixed; */
  background-size:cover;
  /* background-attachment: fixed; */
  height: 500px; 
}

p{
margin-left: 20px;
}

</style>