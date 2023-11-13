<template>
  <Toolbars />
  <Navbar text="Order info" />
  <div class="p-4 sm:ml-64">
    <div
      class="bg-[#E9E7EB] p-2 rounded-t-md border-x border-t border-[#E9E7EB]"
    >
      <v-text-field
        placeholder="เพิ่มตัวกรอง"
        variant="outlined"
        hide-details="auto"
      ></v-text-field>
      <div class="pt-2">
        <v-chip
          v-for="(item, index) in chipData"
          color="#0BA5EC"
          :key="index"
          class="mr-2 text-[14px]"
          >{{ item }}</v-chip
        >
      </div>
    </div>
    <div class="p-5 text-[#084F93] border border-[#E9E7EB] bg-[#E9E7EB] text-[14px] leading-5">
      ข้อมูลคำสั่งซื้อทั้งหมด 20000 รายการ
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] pb-[15px]"
    >
      <v-data-table
        :items="tableItem"
        :headers="headersTable"
        item-key="id"
        :expanded.sync="expanded"
        show-expand
        no-data-text="ไม่มีข้อมูล"
      >

        <template
          v-slot:item="{ item, toggleExpand, isExpanded, internalItem }"
        >
          <tr>
            <td>
              <button @click="toggleExpand(internalItem)">
                <v-icon aria-hidden="false" class="cursor-pointer">
                  {{
                    isExpanded(internalItem)
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}
                </v-icon>
              </button>
            </td>
            <td>{{ item.id }}</td>
            <td class="flex items-center">
              <img
                class="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
              <div class="whitespace-nowrap ml-2 text-[16px] leading-[22px] tracking-[-0.31%]">
                {{ item.market }}
              </div>
            </td>
            <td class="text-[16px] leading-5 tracking-[-0.23%]">{{ item.apps }}</td>
            <td class="text-[16px] leading-5 tracking-[-0.23%]">{{ item.totals }}</td>
            <td class="text-[16px] leading-5 tracking-[-0.23%]">{{ item.billing }}</td>
            <td class="text-[16px] leading-5 tracking-[-0.23%]">{{ item.status }}</td>
            <td class="text-[16px] leading-5 tracking-[-0.23%]">{{ item.create_date }}</td>
          </tr>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <td :colspan="columns.length">
            <div
              class="2xl:w-[35%] xl:w-[45%] lg:w-[60%] md:w-[65%] sm:w-[50%] w-[45%] p-2"
            >
              <div class="flex pl-14 flex-col">
                <div class="containerItemDetail">
                  <div class="flex items-center">
                    <img
                      class="w-10 h-10 rounded-full mr-3"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                    <div class="title">{{ item.buyer }}</div>
                  </div>
                  <div class="leading-5 text-[14px] font-bold">
                    {{ item.status }}
                  </div>
                </div>

                <div class="containerItemDetail text-normal mt-2 space-y-1">
                  <div class="flex items-center">
                    <div>หมายเลขคำสั่งซื้อ</div>
                  </div>
                  <div>2 รายการ</div>
                </div>
                <div class="containerItemDetail text-normal space-y-1">
                  <div class="flex items-center w-[70%] justify-between">
                    <div>สายชาร์จไอโฟน</div>
                    <div>x8</div>
                  </div>
                  <div>฿6,320</div>
                </div>
                <div class="containerItemDetail text-normal space-y-1">
                  <div class="flex items-center w-[70%] justify-between">
                    <div>โรบอทดูดฝุ่น</div>
                    <div>x1</div>
                  </div>
                  <div>฿15,000</div>
                </div>
                <div class="containerItemDetail text-normal mt-1">
                  <div class="flex items-center w-full justify-between">
                    <div class="text-[#084F93]">9 ชิ้น</div>
                    <div>
                      <span class="mr-3">ยอดรวมการสั่งซื้อ</span> ฿21,230
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});

const expanded = [];

const chipData = ["ชื่อลุกค้า", "Order No.", "เบอร์โทร"];

const headersTable = [
  {
    title: "",
    key: "",
    sortable: false,
  },
  {
    title: "เลขที่คำสั่งซื้อ",
    align: "start",
    key: "id",
  },
  {
    title: "ร้านค้า",
    align: "start",
    key: "market",
  },
  {
    title: "ช่องทาง",
    align: "start",
    key: "apps",
  },
  {
    title: "ยอดทั้งหมด",
    align: "start",
    key: "totals",
  },
  {
    title: "การเก็บเงิน",
    align: "start",
    key: "billing",
  },
  {
    title: "สถานะ",
    align: "start",
    key: "status",
  },
  {
    title: "วันที่สร้าง",
    align: "start",
    key: "create_date",
  },
];

const tableItem = [
  {
    id: 1453453234,
    market: "ตู้แปลง1",
    apps: "line",
    totals: "20,543.98 บาท",
    billing: "COD",
    status: "สำเร็จ",
    create_date: "20/06/2021",
    buyer: "Alice",
  },
  {
    id: 2454564545,
    market: "ตู้แปลง2",
    apps: "shopee",
    totals: "20,543.98 บาท",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021",
    buyer: "Fonnumnum",
  },
  {
    id: 3456456456,
    market: "ตู้แปลง3",
    apps: "facebook",
    totals: "20,543.98 บาท",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021",
    buyer: "Peter",
  },
];
</script>

<style scoped>
* {
  font-family: "SFThonburi";
}
thead tr {
  background-color: #e9e7eb;
}

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
