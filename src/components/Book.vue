<template id="book">
  <v-ons-page>
    <c-title title="账本"/>
    <div class="wrapper card-wrapper">
      <v-ons-card>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex v-for="(i,index) in books" :key="index" xs4>
              <v-card dark :color="i.color" class="book" @click="selectBook(i)">
                <v-ons-icon
                  icon="md-bookmark"
                  v-if="selectedBook.display === i.display"
                  class="bookmark"
                ></v-ons-icon>
                <v-card-text class="px-0">{{i.display}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-ons-card>
    </div>
    <v-ons-fab @click="onClickNewBook" position="bottom right">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {};
  },
  computed: {
    books() {
      return this.$store.state.books;
    },
    selectedBook() {
      return this.$store.state.selectedBook;
    }
  },
  methods: {
    selectBook(book) {
      const { $store } = this;
      $store.commit("setSelectedBook", book);
    },

    onClickNewBook() {
      this.$router.push("/book/new");
    }
  }
};
</script>

<style scoped>
.book {
  height: 100px;
  font-size: 14px;
  overflow: hidden;
}

.bookmark {
  position: absolute;
  font-size: 22px;
  right: 5px;
  top: -5px;
  color: white;
}
</style>
