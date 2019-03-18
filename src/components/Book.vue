<template id="book">
  <v-ons-page v-on:swiperight="onPressCard">
    <c-title title="账本"/>
    <div class="wrapper card-wrapper">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex v-for="(i,index) in books" :key="index" xs4>
            <v-touch>
              <v-card dark :color="i.color" class="book" @click="selectBook(i)">
                <div class="mask" v-if="showDelete"></div>
                <v-ons-icon
                  icon="md-bookmark"
                  v-if="selectedBook.display === i.display && !showDelete"
                  class="bookmark"
                ></v-ons-icon>
                <v-card-text class="px-0 display">{{i.display}}</v-card-text>
                <v-card-text
                  class="px-0 delete"
                  v-if="showDelete && i.type!=='default'"
                  @click="onClickDeleteBook"
                >
                  <v-ons-icon icon="md-delete"></v-ons-icon>
                </v-card-text>
              </v-card>
            </v-touch>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-ons-fab @click="onClickFab" position="bottom right">
      <v-ons-icon :icon="showDelete? 'md-check':'md-plus'"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      showDelete: false
    };
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
      if (this.showDelete) return;
      $store.commit("setSelectedBook", book);
    },

    onClickFab() {
      const { showDelete } = this;
      if (showDelete) this.onPressEditFinish();
      else this.onClickNewBook();
    },

    onClickNewBook() {
      this.$router.push("/book/new");
    },

    onPressCard() {
      this.showDelete = true;
    },

    onPressEditFinish() {
      this.showDelete = false;
    },

    onClickDeleteBook(book) {
      this.removeBook(book);
      this.setBookDefault();
    },

    removeBook(book) {
      this.$store.commit("removeBook", book);
    },

    setBookDefault() {
      this.$store.commit("setBookDefault");
    }
  }
};
</script>

<style scoped>
.book {
  height: 100px;
  font-size: 14px;
  overflow: hidden;
  text-shadow: 1px 1px 2px #0000004d;
}

.bookmark {
  position: absolute;
  font-size: 22px;
  right: 5px;
  top: -5px;
  color: white;
}

.delete {
  font-size: 28px;
  position: absolute;
  bottom: 2px;
  z-index: 2;
}

.display {
  z-index: 2;
}

.mask {
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.303);
  position: absolute;
}
</style>
