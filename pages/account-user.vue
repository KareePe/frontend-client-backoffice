<template>
  <Toolbars />
  <Navbar text="Business info,Users account" />

  <div class="p-4 sm:ml-64">
    <v-text-field
      v-model="search"
      variant="outlined"
      label="ค้นหาบัญชีผู้ใช้ เบอร์โทร"
      prepend-inner-icon="mdi-magnify"
      class="!max-w-[480px] min-h-[56px] rounded-[8px] mb-[15px]"
      single-line
      hide-details
      @click:prepend-inner="onClick"
    ></v-text-field>
    <v-card variant="flat" class="border border-[#EEEDF1] rounded-[8px] pb-[15px]">
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
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <div class="flex flex-wrap my-[10px]">
                <div
                  v-for="(itemBiz, indexBiz) in item.business"
                  :key="indexBiz"
                  class="-ml-[15px]"
                >
                  <img
                    :src="`/images/${itemBiz.bizImg}`"
                    class="w-[40px] h-[40px]"
                    alt=""
                  />
                </div>
                <div>
                  <v-btn
                    icon="mdi-plus"
                    density="compact"
                    color="#EEEDF1"
                    class="!w-[40px] !h-[40px]"
                    flat
                  ></v-btn>
                </div>
              </div>
            </td>
            <td>
              <div class="flex gap-[15px]">
                <div
                  :class="`w-[20px] h-[20px] ${
                    item.status === 'เปิดใช้งาน'
                      ? 'bg-[#12B76A]'
                      : 'bg-[#BA1A1A]'
                  } rounded-full`"
                ></div>
                {{ item.status }}
              </div>
            </td>
            <td>
              <v-btn icon="mdi-play" flat></v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
    <!-- <v-text-field
      :model-value="itemsPerPage"
      class="pa-2"
      hide-details
      label="Items per page"
      min="-1"
      max="15"
      type="number"
      @update:model-value="itemsPerPage = parseInt($event, 10)"
    ></v-text-field> -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";
let page = ref(1);
let itemsPerPage = 10;
let itemPerPageSelect = ref(10);
let search = ref("");

const headers = [
  {
    title: "User ID",
    align: "start",
    key: "id",
  },
  {
    title: "ชื่อ-นามสกุล",
    align: "center",
    key: "name",
  },
  {
    title: "อีเมล",
    align: "center",
    key: "email",
  },
  {
    title: "เบอร์โทร",
    align: "center",
    key: "phone",
  },
  {
    title: "ธุรกิจ",
    align: "center",
    key: "business",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: " ",
    align: "center",
    key: "href",
  },
];
let items = [
  {
    id: "767885874",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    email: "test@email.com",
    phone: "087-783-7482",
    business: [
      { biz: "mc donald", bizImg: "mc-logo.png" },
      { biz: "starbucks", bizImg: "starbuck-logo.png" },
      { biz: "burger king", bizImg: "burger-logo.png" },
      { biz: "pizza company", bizImg: "pizza-logo.png" },
    ],
    status: "เปิดใช้งาน",
    href: "",
  },
  {
    id: "988786866",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    email: "test@email.com",
    phone: "087-783-7482",
    business: [
      { biz: "mc donald", bizImg: "mc-logo.png" },
      { biz: "starbucks", bizImg: "starbuck-logo.png" },
      { biz: "burger king", bizImg: "burger-logo.png" },
      { biz: "pizza company", bizImg: "pizza-logo.png" },
    ],
    status: "ระงับการใช้งาน",
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
</script>

<style>
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
.v-data-table-footer__pagination{
    margin: 15px 0 !important;
}
.v-data-table-footer__info,.v-data-table-footer__pagination {
  display: none !important;
}
</style>
