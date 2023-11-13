<template>
  <Toolbars />
  <Navbar text="Order info" />
  <div class="container">
    <div
      class="bg-[#f4f3f7] p-2 rounded-t-md border-x border-t border-[#E9E7EB]"
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
    <div class="p-5 text-[#084F93] border border-[#E9E7EB] bg-[#f4f3f7]">
      ข้อมูลคำสั่งซื้อทั้งหมด 20000 รายการ
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] pb-[15px]"
    >
      <v-data-table
        :headers="headersTable"
        :items="tableItem"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page="5"
        page="1"

      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.market }}</td>
            <td>{{ item.apps }}</td>
            <td>{{ item.totals }}</td>
            <td>{{ item.billing }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.create_date }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware"
})

const chipData = ["ชื่อลุกค้า", "Order No.", "เบอร์โทร"]

const headersTable = [
  {
    title: "เลขที่คำสั่งซื้อ",
    align: "start",
    key: "id"
  },
  {
    title: "ร้านค้า",
    align: "start",
    key: "market"
  },
  {
    title: "ช่องทาง",
    align: "start",
    key: "apps"
  },
  {
    title: "ยอดทั้งหมด",
    align: "start",
    key: "totals"
  },
  {
    title: "การเก็บเงิน",
    align: "start",
    key: "billing"
  },
  {
    title: "สถานะ",
    align: "start",
    key: "status"
  },
  {
    title: "วันที่สร้าง",
    align: "start",
    key: "create_date"
  }
]

const tableItem = [
  {
    id: "1",
    market: "ตู้แปลง",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021"
  },
  {
    id: "1",
    market: "ตู้แปลง",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021"
  },
  {
    id: "1",
    market: "ตู้แปลง",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021"
  },
  {
    id: "1",
    market: "ตู้แปลง",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021"
  },
  {
    id: "1",
    market: "ตู้แปลง",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021"
  },
  {
    id: "1",
    market: "ตู้แปลง",
    apps: "line",
    totals: "$20,543.98",
    billing: "COD",
    status: "กำลังจัดส่ง",
    create_date: "20/06/2021"
  }
]
</script>

<style scoped>
.container {
  @apply p-4 sm:ml-64;
}
.flexContainer {
  @apply flex;
}
.header {
  @apply bg-[#E9E7EB];
}
</style>
