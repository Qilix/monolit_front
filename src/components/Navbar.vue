<template>
     <v-container class="d-flex justify-center pt-5">
      <v-app-bar
          max-width="1200px"
          elevation="4"
          outlined
        >
        <h1>Цитаты</h1>
        <v-spacer/>
        <CreateQuote/>
        <!-- <Testquote/> -->
        </v-app-bar >
    </v-container>
</template>

<script>
import CreateQuote from '@/components/CreateQuote'

export default {
  components: {
    CreateQuote
  }
};
</script>