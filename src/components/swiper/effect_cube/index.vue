<template>
<swiper :effect="'cube'" :grabCursor="true" :cubeEffect='{
  "shadow": true,
  "slideShadows": true,
  "shadowOffset": 20,
  "shadowScale": 0.94
}' :pagination="true" class="mySwiper">
  <swiper-slide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide>
  <swiper-slide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide>
  <swiper-slide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide>
  <swiper-slide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide>
  </swiper>
</template>
<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import "swiper/css/effect-cube"
import "swiper/css/pagination"


// import Swiper core and required modules
import SwiperCore, {
  EffectCube,Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([EffectCube,Pagination]);


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
        
        
    };
  },
  methods: {
    
  }
  
}
</script>

<style scoped>
.swiper {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>