<template>
  <Toolbars />
  <Navbar text="การเงิน,ประวัติการจัดส่ง" />
  <div class="p-4 sm:ml-64">
    <div class="flex flex-row justify-between">
      <VueDatePicker
        v-model="dateRange"
        class="!max-w-[360px] !min-h-[56px] !rounded-[8px] mb-[15px]"
        range
      ></VueDatePicker>
      <v-text-field
        v-model="search"
        variant="outlined"
        label="ค้นหาบัญชีผู้ใช้ เบอร์โทร"
        prepend-inner-icon="mdi-magnify"
        class="!max-w-[480px] rounded-[8px] mb-[12px]"
        single-line
        density="compact"
        hide-details
      ></v-text-field>

      <!-- <v-text-field
        variant="outlined"
        label="วันที่"
        prepend-inner-icon="mdi-calendar-month"
        class="!max-w-[280px] min-h-[56px] rounded-[8px] mb-[15px]"
        single-line
        hide-details
      /> -->
    </div>
    <div
      class="bg-[#E9E7EB] p-2 !rounded-t-[8px] border-x border-t border-[#E9E7EB]"
    >
      <v-text-field
        placeholder="เพิ่มตัวกรอง"
        variant="outlined"
        hide-details
        density="compact"
      ></v-text-field>
      <div class="pt-2">
        <!-- <v-chip
          v-for="(item, index) in chipData"
          :key="index"
          class="mr-2 text-[14px] !text-[#0BA5EC] !bg-[#EEEDF1]"
          >{{ item }}</v-chip
        > -->
        <Chips v-for="(item, index) in chipData" :text="item" />
      </div>
    </div>
    <div
      class="p-5 text-[#084F93] border border-[#E9E7EB] bg-[#E9E7EB] text-[14px] leading-5"
    >
      รายการทั้งหมด {{ tableItem.length }} รายการ
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] !rounded-b-[8px] pb-[15px]"
    >
      <v-data-table
        v-if="tableItem.length > 0"
        :items="tableItem"
        :headers="headersTable"
        item-key="id"
        show-expand
        id="table-info"
        no-data-text="ไม่มีข้อมูล"
        items-per-page-text="จำนวนแสดงผล"
        class="!rounded-[0]"
      >
        <template v-slot:item="{ item }">
          <tr>
            <!-- <td>
              <button @click="toggleExpand(internalItem)">
                <v-icon aria-hidden="false" class="cursor-pointer">
                  {{
                    isExpanded(internalItem)
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}
                </v-icon>
              </button>
            </td> -->

            <td class="flex items-center">
              <img
                class="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
              <div
                class="whitespace-nowrap ml-2 text-[14px] leading-[22px] tracking-[-0.31%]"
              >
                {{ item.name }}
              </div>
            </td>
            <td class="text-[14px] leading-5 tracking-[-0.23%]">
              {{ item.name_sec }}
            </td>
            <td class="text-[14px] leading-5 tracking-[-0.23%]">
              {{ item.date }}
            </td>
            <td class="text-[14px] leading-5 tracking-[-0.23%] text-[#0BA5EC]">
              {{ item.no }}
            </td>
            <td class="text-[14px] leading-5 tracking-[-0.23%] text-[#0BA5EC]">
              {{ item.no_delivery }}
            </td>
            <td class="text-center">
              <div class="flex gap-[15px]">
                <div
                  :class="`w-[20px] h-[20px] ${
                    item.status === 'ยืนยันสำเร็จ'
                      ? 'bg-[#12B76A]'
                      : 'bg-[#BA1A1A]'
                  } !rounded-full`"
                ></div>
                <div class="text-[14px]">
                  {{ item.status }}
                </div>
              </div>
            </td>
            <td class="text-[14px] leading-5 tracking-[-0.23%]">
              {{ item.amount }}
            </td>
          </tr>
        </template>

        <template #bottom></template>
      </v-data-table>
      <div v-else class="h-[260px] flex justify-center items-center">
        <p>ยังไม่มีรายการ</p>
      </div>
    </v-card>

    <!-- pagination  -->
    <div class="text-center pt-2 flex justify-center items-center relative">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <div class="w-[140px] absolute right-0 mr-4 w-[170px]">
        <v-select
          label="จำนวนแสดงผล"
          variant="outlined"
          :items="[5, 10, 15, 20, 25, 30]"
          :item-title="(item) => item + ' รายการ'"
          :item-value="(item) => item"
          :model-value="itemsPerPage"
          density="compact"
          hide-details="auto"
          @update:modelValue="fnChangeSelect"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
definePageMeta({
  middleware: "auth-middleware",
});
const dateRange = ref([
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 7)),
]);
const expanded = [];

const chipData = [
  "ชื่อธุรกิจ",
  "ชื่อธุรกิจย่อย",
  "หมายเลขชุดข้อมูล",
  "หมายเลขบิลค่าขนส่ง",
  "สถานะ",
];
const headersTable = [
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "name",
  },
  {
    title: "ชื่อธุรกิจย่อย",
    align: "center",
    key: "name_sec",
  },
  {
    title: "วันที่และเวลา",
    align: "center",
    key: "date",
  },
  {
    title: "หมายเลขชุดข้อมูล",
    align: "center",
    key: "no",
  },
  {
    title: "หมายเลขบิลค่าขนส่ง",
    align: "center",
    key: "no_delivery",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "ยอดทั้งหมด",
    align: "center",
    key: "amount",
  },
];

const tableItem = [
  {
    name: "แมงป่อง",
    name_sec: "BU Name",
    date: "14/09/2023 15:38",
    no: "LINV231026SX0001A",
    no_delivery: "LINV231026SX0001A",
    status: "ยืนยันสำเร็จ",
    amount: "98,279.00 บาท",
  },
];
</script>

<style>
thead tr {
  background-color: #e9e7eb;
}
/* thead tr th:last-child {
  background-color: red;
} */
/* .v-table .v-table__wrapper > table > thead > tr > th {
  background-color: red;
} */
#table-info div table thead tr th:last-child {
  display: none;
}
#table-info div table thead tr th div span {
  color: black;
  opacity: 87%;
}
</style>

<style scoped>
.itemList {
  @apply flex justify-between w-full;
}

.containerItemDetail {
  @apply flex items-center justify-between w-full;
}

.title {
  line-height: 22px;
  letter-spacing: -0.31%;
  @apply font-bold text-[16px];
}

.text-normal {
  line-height: 16px;
  font-size: 12px;
}
</style>
