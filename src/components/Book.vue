<template id="book">
  <div class="scroll">
    <c-title title="我的账本"/>
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
              <v-card-text class="px-0 display card-name">{{i.display}}</v-card-text>
              <v-card-text
                class="px-0 delete"
                v-if="showDelete && i.type!=='default'"
                @click="onClickDeleteBook(i)"
              >
                <v-ons-icon icon="md-delete"></v-ons-icon>
              </v-card-text>
            </v-card>
            <div class="amount-wrapper amount-slim">
              <span class="amount-line">
                收入:
                <span class="book-amount" v-if="!i.id">{{formatMoneyClean(defaultBook.income)}}</span>
                <span class="book-amount" v-else>{{formatMoneyClean(i.income)}}</span>
              </span>
              <span class="amount-line">
                支出:
                <span class="book-amount" v-if="!i.id">{{formatMoneyClean(defaultBook.pay)}}</span>
                <span class="book-amount" v-else>{{formatMoneyClean(i.pay)}}</span>
              </span>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-btn absolute dark fab bottom right @click="onClickFab">
      <v-ons-icon :icon="showDelete? 'md-check':'md-plus'"></v-ons-icon>
    </v-btn>
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      @click="onClickEdit"
      class="fab-edit"
      v-show="!showDelete"
    >
      <v-ons-icon icon="md-edit"></v-ons-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from "@/request";
import { confirm, toast } from "@/notification";
import accounting from "accounting";
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
    },
    loaded() {
      return this.$store.state.loaded.book;
    },
    defaultBook() {
      return this.$store.state.defaultBook;
    }
  },
  mounted() {
    this.loadIfNeeded();
  },
  activated() {
    this.loadIfNeeded();
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

    onClickEdit() {
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
          this.$store.commit("setLoaded", { name: "record", value: false });
        });
    },

    setBookDefault() {
      this.$store.commit("setBookDefault");
    },

    formatMoneyClean(amount) {
      return accounting.formatMoney(amount, "");
    },

    loadIfNeeded() {
      const { $store } = this;
      if (!this.loaded) {
        this.loadBooks();
      }
    },

    loadBooks() {
      const { $store } = this;
      axios.get("/book").then(({ data }) => {
        $store.commit("setLoaded", "book");
        this.$store.commit(
          "setBooks",
          data.map(b => ({
            ...b,
            display: b.name
          }))
        );
      });
      axios.get("/settings").then(({ data }) => {
        const { activeBookId } = data;
        this.$store.commit("setSelectedBook", {
          id: activeBookId
        });
      });
      axios.get("/book/default").then(({ data }) => {
        this.$store.commit("setDefaultBook", data);
      });
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
  font-size: 28px;
  right: 5px;
  top: -12px;
  color: white;
}

.delete {
  font-size: 28px;
  position: absolute;
  bottom: 0;
  z-index: 2;
  line-height: 30px;
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

.card-name {
  line-height: 50px;
}

.amount-wrapper {
  padding: 4px 0 12px 0;
  line-height: 1;
}

.amount-wrapper * {
  display: inline-block;
  font-size: 12px;
  color: #999999;
}

.amount-line {
  width: 100%;
  text-align: justify;
  padding: 0 6px 0 6px;
}

.book-amount {
  float: right;
}

.fab-edit {
  right: 90px;
  font-size: 20px !important;
}
</style>
