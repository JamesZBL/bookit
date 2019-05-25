<template>
  <div class="scroll">
    <c-title title="版权信息" back/>
    <div class="wrapper">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="(item, index) in libs" :key="index" xs12>
            <v-card @click="openLink(item.link)" class="blue-grey--text text--darken-3">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{item.name}}</h3>
                </div>
              </v-card-title>
              <v-divider light></v-divider>
              <v-card-text>
                <div>{{item.description}}</div>
              </v-card-text>
              <v-divider light></v-divider>
              <v-card-text>
                <div class="body-1 blue-grey--text text--darken-1">{{item.author}}</div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
import { libs } from "./libs.js";
export default {
  name: "copyright",
  data() {
    return {
      libs
    };
  },
  methods: {
    openLink(url) {
      window.open(encodeURI(url));
    }
  }
};
</script>