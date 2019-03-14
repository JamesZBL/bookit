<template id="book">
  <v-ons-page>
    <c-title title="账本"/>
    <div class="wrapper card-wrapper">
      <v-ons-card>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex v-for="(i,index) in book" :key="index" xs4>
              <v-card dark color="purple">
                <v-ons-icon
                  icon="md-bookmark"
                  v-if="getCurrentBookDisplay() === i.display"
                  class="bookmark"
                ></v-ons-icon>
                <v-card-text class="px-0">{{i.display}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
import book from "@/book";
import { getCurrentBookDisplay } from "@/book";
export default {
  name: "Book",
  data() {
    return {
      book
    };
  },
  methods: {
    getCurrentBookDisplay
  }
};
</script>

<style scoped>
.book {
  text-align: center;
  height: 100px;
  background-color: blueviolet;
  color: white;
  border-radius: 5px;
}

.bookmark {
  position: absolute;
  right: 5px;
  top: 0;
}
</style>
