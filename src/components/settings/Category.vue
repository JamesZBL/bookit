<template>
  <v-ons-page>
    <Title back title="分类管理"/>
    <div class="wrapper">
      <ul class="list-group" v-sortable="{ handle: '.handle' }">
        <li class="list-group-item">Foo <i class="handle"></i></li>
        <li class="list-group-item">Bar <i class="handle"></i></li>
        <li class="list-group-item">Baz <i class="handle"></i></li>
      </ul>
    </div>
  </v-ons-page>
</template>

<script>
import Title from "@/components/Title";
export default {
  name: "Category",
  components: {
    Title
  }
};
</script>