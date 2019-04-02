<template id="book">
  <div class="scroll" v-on:swiperight="onPressCard">
    <c-title title="账本"/>
    <div class="wrapper card-wrapper fab-wrapper">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex v-for="(i,index) in books" :key="index" xs4>
            <v-card dark :color="i.color" class="book" @click="onClickBook(i)">
              <div class="mask" v-if="showDelete"></div>
              <v-ons-icon
                icon="md-bookmark"
                v-if="(selectedBook.display === i.display || selectedBook.id === i.id) && !showDelete"
                class="bookmark"
              ></v-ons-icon>
              <v-card-text class="px-0 display">{{i.display}}</v-card-text>
              <v-card-text
                class="px-0 delete"
                v-if="showDelete && i.type!=='default'"
                @click="onClickDeleteBook(i)"
              >
                <v-ons-icon icon="md-delete"></v-ons-icon>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-btn absolute dark fab bottom right @click="onClickFab">
      <v-ons-icon :icon="showDelete? 'md-check':'md-plus'"></v-ons-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from "@/request";
import { confirm, toast } from "@/notification";
export default {
  name: "book",
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
    onClickBook(book) {
      const { $store } = this;
      if (this.showDelete) return;
      axios
        .put("/settings/active-book", {
          activeBookId: book.id || null
        })
        .then(r => {
          $store.commit("setSelectedBook", book);
        });
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
      const _this = this;
      confirm(`确定要删除 ${book.display} 吗？`, function() {
        axios.delete(`/book/${book.id}`).then(r => {
          _this.removeBook(book);
          _this.setBookDefault();
        });
      });
    },

    removeBook(book) {
      axios
        .put("/settings/active-book", {
          activeBookId: null
        })
        .then(r => {
          this.$store.commit("removeBook", book);
        });
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
  text-shadow: rgba(0, 0, 0, 0.33) 1px 1px 2px;
}

.bookmark {
  position: absolute;
  font-size: 22px;
  right: 5px;
  top: -9px;
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
