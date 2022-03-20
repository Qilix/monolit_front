<template>
  <v-app>
   <Navbar/>
   <router-view/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Quote from '@/views/Quote'


export default {
  name: 'App',
  components: {
    Navbar,Quote
  }
};
</script>
