<template>
  <Toolbars />
  <Navbar text="จัดการลูกค้า,บัญชีผู้ใช้งาน" />

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
    <v-card variant="flat" class="border border-[#EEEDF1] rounded-[8px]">
      <div class="bg-[#E9E7EB] p-[20px]">
        <b class="text-[14px] text-[#084F93]"
          >ข้อมูลทั้งหมด {{ items.length }} รายการ</b
        >
      </div>
      <v-data-table
        v-if="items.length > 0"
        v-model:page="page"
        :custom-filter="filterOnlyCapsText"
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :search="search"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page-text="จำนวนแสดงผล"
        class="mb-[15px]"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-center text-[14px]">{{ item.id }}</td>
            <td class="text-center text-[14px]">{{ item.name }}</td>
            <td class="text-center text-[14px]">{{ item.email }}</td>
            <td class="text-center text-[14px]">{{ item.phone }}</td>
            <td class="text-center text-[14px]">
              {{ item.business_number }}
            </td>
            <td class="text-center text-[14px]">
              {{ item.date_current }}
            </td>
            <td>
              <v-btn
                icon="mdi-play"
                flat
                @click="this.$router.push('/account-user/1234')"
              ></v-btn>
            </td>
          </tr>
        </template>
        <template #bottom></template>
      </v-data-table>
      <div v-else class="h-[260px] flex justify-center items-center">
        <p>ยังไม่มีรายการ</p>
      </div>
    </v-card>
    <div class="text-center pt-2 flex justify-center items-center relative">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <div class="w-[140px] absolute right-0 mr-4">
        <v-select
          label="จำนวนแสดงผล"
          variant="outlined"
          :items="[5, 10, 15, 20, 25, 30]"
          :item-title="(item) => item + ' รายการ'"
          :item-value="(item) => item"
          :model-value="itemsPerPage"
          density="compact"
          hide-details="auto"
          @update:modelValue="fnChangeRowPerPages"
        ></v-select>
      </div>
    </div>
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

let navbar = ref("จัดการลูกค้า,บัญชีผู้ใช้งาน");

const headers = [
  {
    title: "User ID",
    align: "center",
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
    title: "จำนวนธุรกิจที่เกี่ยวข้อง",
    align: "center",
    key: "business_number",
  },
  {
    title: "เข้าใช้งานล่าสุด",
    align: "center",
    key: "date_current",
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
    business_number: "2",
    date_current: "22/11/2566 (18.32)",
    href: "",
  },
  {
    id: "988786866",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    email: "test@email.com",
    phone: "087-783-7482",
    business_number: "1",
    date_current: "22/11/2566 (18.32)",
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
.v-data-table-footer__pagination {
  margin: 15px 0 !important;
}
.v-data-table-footer__info,
.v-data-table-footer__pagination {
  display: none !important;
}

thead tr {
  background-color: #e9e7eb;
}
</style>
