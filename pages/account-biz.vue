<template>
  <Toolbars />
  <Navbar text="Business info,Business account" v-if="detailData.length <= 0" />

  <div class="p-4 sm:ml-64">
    <v-text-field
      v-model="search"
      variant="outlined"
      label="ค้นหาธุรกิจ"
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

      <div v-else class="h-[260px] flex justify-center items-center">
        <p>ยังไม่มีรายการ</p>
      </div>
    </v-card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted } from "vue";

let navbar = ref("Business info,Business account");
let detailData = ref([]);

const headers = [
  {
    title: "รูป",
    align: "start",
    key: "logo",
  },
  {
    title: "รหัสธุรกิจ",
    align: "start",
    key: "bizId",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "bizname",
  },
  {
    title: "เบอร์โทรติดต่อ",
    align: "center",
    key: "phone",
  },
  {
    title: "ที่อยู่",
    align: "center",
    key: "address",
  },
  {
    title: "ประเภทเครกิต",
    align: "center",
    key: "credit",
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

let items = [];
</script>

<style></style>
