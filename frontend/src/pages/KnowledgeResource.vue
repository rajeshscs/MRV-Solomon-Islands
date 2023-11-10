<template>
  <div>
    <Header />
    <knowledgeResource  :data="data" />
    <Footer :data="data" />
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import knowledgeResource from '@/components/KnowledgeResource.vue'

import { ref, onMounted } from 'vue';
import axios from 'axios';

const data = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get('http://192.168.0.183:8189/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all');

    if (response.status === 200) {
      data.value = response.data;
    } else {
      throw Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

