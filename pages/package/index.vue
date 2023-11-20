<template>
  <Toolbars />
  <Navbar text="แพ็คเกจสมาชิก" />

  <div class="p-4 sm:ml-64">
    <div class="lg:flex block lg:flex-wrap flex-nowarp justify-end items-start">
      <NuxtLink
        to="/article/add-article"
        flat
        color="#084F93"
        class="flex bg-[#084F93] text-white justify-center gap-[8px] rounded-[8px] items-center lg:!w-[200px] w-full !h-[56px]"
      >
        <v-icon icon="mdi-plus" color="#fff"></v-icon>
        สร้างแพ็คเกจ
      </NuxtLink>
    </div>

    <v-card
      variant="flat"
      class="border border-[#EEEDF1] !rounded-[8px] my-[15px]"
    >
      <v-data-table
        v-if="items.length > 0"
        v-model:page="page"
        :headers="headers"
        :items="items"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page-text="จำนวนแสดงผล"
        class="mb-[15px]"
      >
        <template #item="{ item }">
          <tr>
            <td class="text-center">{{ item.package }}</td>
            <td class="text-center">{{ item.price }}</td>
            <td class="text-center">
              <div class="flex gap-[10px] justify-center">
                <div class="bg-[#12B76A] w-[24px] h-[24px] !rounded-full"></div>
                <p>{{ item.package }}</p>
              </div>
            </td>
            <td class="text-center">
              <v-btn icon="mdi-trash-can-outline" flat></v-btn>
              <v-btn icon="mdi-file-edit-outline" flat @click="fn_href"></v-btn>
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
import { ref, onMounted } from "vue";
const router = useRouter();

const headers = [
  { title: "ชื่อแพ็คเกจ", align: "center", value: "package" },
  { title: "ราคา", align: "center", value: "price" },
  { title: "สถานะ", align: "center", value: "status" },
  { title: " ", align: "center", value: "href" },
];
let items = [
  {
    package: "Standard",
    price: "1,500 ฿",
    status: "เปิดใช้งาน",
  },
  {
    package: "Business",
    price: "1,500 ฿",
    status: "เปิดใช้งาน",
  },
  {
    package: "Business +",
    price: "1,500 ฿",
    status: "ยกเลิก",
  },
];

const fn_href = () => {
  router.push("/package/add-package");
};
</script>

<style></style>
