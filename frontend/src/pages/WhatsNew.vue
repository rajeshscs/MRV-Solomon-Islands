<template>
  <div class="template">
    <div class="whats-new-section">
      <h2>What's New</h2>
      <div v-for="item in data.add_new_content" :key="item.title" class="news-item">
        <img :src="item.add_image" alt="News Image" class="news-image">
        <div class="news-content">
          <h3 class="news-title">{{ item.title }}</h3>
          <p class="news-description">{{ item.content }}</p>
          <a href='${item.add_url}' class="read-more">Read More : {{ item.add_url }}</a>
        </div>
      </div>
  
      <!-- Modal -->
      <div id="myModal" class="modal" v-if="isModalOpen">
        <span class="close" @click="closeModal">&times;</span>
        <img class="modal-content" :src="modalImage" id="img01">
      </div>
    </div>
  </div>
  </template>
  
  <style>
  /* Your existing styles */
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }
  .template{
    /* box-shadow: 0 2px 4px #0000001a;  */
    display: flex;
    gap: 30px;
      flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .whats-new-section {
    width: 90%;
    flex-direction: column;
    background-color: #fff;
    padding: inherit;
    border-radius: 8px;
    box-shadow: 0 2px 4px #0000001a;
    align-content: center;
}
  
  .whats-new-section h2 {
    position: relative;
    top: 20px;
    margin-bottom: 40px;
    text-align: center;
    color: #333;
  }
  
  .news-item {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    padding: 30px 30px;;
  }
  
  .news-item:last-child {
    border-bottom: none;
  }
  
  .news-image {
    width: 335px;
    height: 250px;
    -o-object-fit: cover;
    object-fit: cover;
    margin-right: 20px;
    border-radius: 8px;
  }
  
  .news-content {
    flex: 1;
  }
  
  .news-title {
    font-size: 1.5em;
    margin: 0;
    color: #007BFF;
  }
  .news-title h3{
    padding: 18px 0;
  }
  
  .news-date {
    font-size: 0.9em;
    color: #666;
    margin: 5px 0;
  }
  
  .news-description {
    font-size: 1em;
    color: #333;
    margin: 10px 0;
  }
  
  .read-more {
    text-decoration: none;
    color: #007BFF;
    font-weight: bold;
  }
  
  .read-more:hover {
    text-decoration: underline;
  }
  
  /* Modal styles */
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.9);
  }
  
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }
  
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }
  
  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
  @media (max-width: 576px) {
    .news-item {
      flex-direction: column;
    }
}

  </style>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const data = ref([]);
  const isModalOpen = ref(false);
  const modalImage = ref('');
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all');
      if (response.status === 200) {
        data.value = response.data.message;
        console.log("Dta == ",data);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const openModal = (src) => {
    modalImage.value = src;
    isModalOpen.value = true;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  