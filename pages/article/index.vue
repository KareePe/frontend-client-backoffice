<template>
  <Toolbars />
  <Navbar text="บทความ" />

  <div class="p-4 sm:ml-64">
    <v-col cols="12">
      <v-row>
        <v-text-field
          v-model="search"
          variant="outlined"
          label="ค้นหา"
          prepend-inner-icon="mdi-magnify"
          class="!max-w-[480px] min-h-[56px] rounded-[8px] ml-[12px]"
          single-line
          hide-details
          @click:prepend-inner="onClick"
        />
        <v-spacer />
        <v-btn
          color="#084F93"
          class="!max-w-[480px] min-h-[56px] rounded-[8px] mr-[12px]"
          @click="addArticle"
        >
          + เพิ่มบทความ
        </v-btn>
      </v-row>
      <v-card
        variant="flat"
        class="border border-[#EEEDF1] rounded-[8px] pb-[15px] mt-[30px]"
      >
        <v-data-table
          v-model:page="page"
          :custom-filter="filterOnlyCapsText"
          :headers="headers"
          :items="items"
          :items-per-page="itemsPerPage"
          :search="search"
          no-data-text="ไม่มีข้อมูล"
          hide-default-footer
        >
          <template #[`item.href`]="{}">
            <v-btn icon="mdi-play" flat></v-btn>
          </template>
        </v-data-table>
      </v-card>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-col>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
let page = ref(1);
let itemsPerPage = 10;
let search = ref("");

const headers = [
  { title: "หัวข้อ", align: "center", value: "title", width: "15%" },
  { title: "words", align: "center", value: "words", width: "20%" },
  { title: "ผู้สร้าง", align: "center", value: "createBy", width: "20%" },
  { title: "วันที่สร้าง", align: "center", value: "createAt", width: "12%" },
  { title: "สถานะ", align: "center", value: "status", width: "20%" },
  { title: " ", align: "center", value: "href", width: "13%" },
];
let items = [
  {
    title: "หัวข้อ1",
    words: "1160",
    createBy: "Teenai",
    createAt: "20/12/2000",
    status: "ร่าง",
    href: "",
  },
  {
    title: "หัวข้อ2",
    words: "2000",
    createBy: "Teenai",
    createAt: "11/12/2022",
    status: "ร่าง",
    href: "",
  },
  {
    title: "หัวข้อ3",
    words: "900",
    createBy: "Teenai",
    createAt: "13/07/2021",
    status: "สาธารณะ",
    href: "",
  },
];

const filterOnlyCapsText = (value, query, item) => {
  return (
    value != null &&
    query != null &&
    typeof value === "string" &&
    value.toString().indexOf(query) !== -1
  );
};

const pageCount = computed(() => {
  //   console.log(items.length);
  //   console.log(itemsPerPage);
  //   const result = Math.ceil(items.length / 5);
  //   return result;
  return Math.ceil(items.length / itemsPerPage);
});

const addArticle = () => {
  useRouter().push('/article/addArticle');
};
</script>

<style scoped>
.v-pagination__next .v-btn,
.v-pagination__prev .v-btn {
  border: 1px solid #c2c2c2 !important;
  border-radius: 8px !important;
}
.v-pagination__item--is-active .v-btn {
  background-color: #084f93;
  border-radius: 8px !important;
  color: #fff;
}
.v-data-table-footer__pagination {
  margin: 15px 0 !important;
}
.v-data-table-footer__info,
.v-data-table-footer__pagination {
  display: none !important;
}
</style>
