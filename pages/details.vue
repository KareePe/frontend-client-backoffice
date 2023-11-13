<template>
  <Toolbars />
  <Navbar text="Order info" />
  <div class="container-tw">
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
          class="mr-2"
          >{{ item }}</v-chip
        >
      </div>
    </div>
    <div class="p-5 text-[#084F93] border border-[#E9E7EB] bg-[#E9E7EB]">
      ข้อมูลคำสั่งซื้อทั้งหมด 20000 รายการ
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] pb-[15px]"
    >
      <v-data-table
        :headers="headersTable"
        :expanded="expanded"
        :items="tableItem"
        item-value="name"
        show-expand
        no-data-text="ไม่มีข้อมูล"
        item-key="id"
      >
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">More info about {{ item.market }}</td>
          </tr>
        </template>
      </v-data-table>
      <v-data-table
        :items="items"
        :headers="headers"
        :item-key="itemKey"
        :expanded.sync="expandedItems"
        show-expand
      >
        <template v-slot:expanded-row="{ columns, item }">
          <!-- <div class="w-full bg-red-500">
            <div>Expanded content for {{ item.name }}</div>
          </div> -->
          <tr>
            <td :colspan="columns.length">
              <div class="bg-red w-full">
                Expanded content for {{ item.name }}
              </div>
            </td>
          </tr>
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
    id: 1,
    market: "ตู้แปลง1",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021",
  },
  {
    id: 2,
    market: "ตู้แปลง2",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021",
  },
  {
    id: 3,
    market: "ตู้แปลง3",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021",
  },
];
</script>

<script>
export default {
  data() {
    return {
      expandedItems: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Age", value: "age" },
        { text: "Country", value: "country" },
      ],
      items: [
        { id: 1, name: "John Doe", age: 30, country: "USA" },
        { id: 2, name: "Jane Doe", age: 25, country: "Canada" },
        { id: 3, name: "Bob Smith", age: 40, country: "UK" },
      ],
    };
  },
};
</script>

<style scoped>
.container-tw {
  @apply p-4 sm:ml-64;
}
</style>
