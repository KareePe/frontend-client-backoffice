<template>
  <Toolbars />
  <Navbar text="กระทบยอด COD" />
  <div class="ContainerLayout">
    <!-- button Switch -->
    <div class="flex w-full justify-between items-center">
      <div class="card">
        <v-btn
          v-bind:color="tab === 'Order' ? '#084F93' : '#fff'"
          variant="flat"
          @click="() => fnChangeTabs('Order')"
          rounded="lg"
          >คำสั่งซื้อ (926)</v-btn
        >
        <v-btn
          v-bind:color="tab === 'Payment' ? '#084F93' : '#fff'"
          variant="flat"
          rounded="lg"
          @click="() => fnChangeTabs('Payment')"
          >ทำจ่าย</v-btn
        >
        <v-btn
          v-bind:color="tab === 'History' ? '#084F93' : '#fff'"
          variant="flat"
          rounded="lg"
          @click="() => fnChangeTabs('History')"
          >ประวัติ (310)</v-btn
        >
      </div>
      <div style="width: 300px" v-if="tab === 'Order'">
        <v-text-field
          label="วันที่"
          variant="outlined"
          density="compact"
          prepend-inner-icon="mdi-calendar-month"
          hide-details="auto"
        ></v-text-field>
      </div>
      <v-btn
        color="#084F93"
        variant="flat"
        size="large"
        rounded="lg"
        prepend-icon="mdi-plus"
        v-if="tab !== 'Order'"
        class="px-16"
      >
        เพิ่มรายการ
      </v-btn>
    </div>
    <!-- content Order-->
    <div
      class="mt-4 p-5 text-[#084F93] rounded-t-md border border-[#E9E7EB] bg-[#E9E7EB] text-[14px] leading-5"
      v-if="tab === 'Order'"
    >
      ข้อมูลคำสั่งซื้อทั้งหมด {{ dataTableOrder.length }} รายการ
    </div>
    <div
      v-if="tab === 'Order'"
      class="bg-[#E9E7EB] p-2 border border-[#E9E7EB]"
    >
      <v-text-field
        placeholder="เพิ่มตัวกรอง"
        variant="outlined"
        hide-details="auto"
        density="compact"
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
    <!-- table Order -->
    <v-card
      v-if="tab === 'Order'"
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] pb-[15px]"
    >
      <v-data-table
        v-if="dataTableOrder.length > 0"
        :items="dataTableOrder"
        :headers="headersTableOrder"
        item-key="id"
        :expanded.sync="expanded"
        show-expand
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page-text="จำนวนแสดงผล"
        :page="page"
        :items-per-page="itemsPerPage"
      >
        <template
          v-slot:item="{ item, toggleExpand, isExpanded, internalItem }"
        >
          <tr>
            <td
              class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.name }}
            </td>
            <td
              class="text-[#084F93] text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.id }}
            </td>
            <td
              class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.status_order }}
            </td>
            <td
              class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.create_date }}
            </td>
            <td
              class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.price }}
            </td>
            <td
              class="text-[16px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.payment }}
            </td>
            <td class="text-[16px] leading-5 tracking-[-0.23%]">
              <div class="flex justify-start items-center">
                <div
                  class="w-4 h-4 mr-1 rounded-full"
                  v-bind:style="{
                    backgroundColor:
                      item.status === 'ยืนยันแล้ว' ? '#12B76A' : '#BA1A1A'
                  }"
                ></div>
                {{ item.status }}
              </div>
            </td>
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
          </tr>
        </template>

        <template v-slot:expanded-row="{ columns, item }">
          <td :colspan="columns.length">
            <div
              class="border-t border-x border-[#EEEDF1] w-full grid grid-cols-12 gap-4 p-2 px-16"
            >
              <div class="col-span-2">
                <div class="opacity-[60%]">ช่องทางการขาย / แพลตพอร์ม</div>
                <div class="whitespace-nowrap">Social Media - Facebook</div>
              </div>
              <div class="col-span-2">
                <div class="opacity-[60%]">วิธีการชำระเงิน</div>
                <div>{{ item.payment }}</div>
              </div>
              <div class="col-span-2">
                <div class="opacity-[60%]">น้ำหนัก</div>
                <div>1.0 กิโลกรัม</div>
              </div>
              <div class="col-span-4">
                <div class="opacity-[60%]">เหตุผลในการยกเลิก</div>
                <div>-</div>
              </div>
              <div class="col-span-2">
                <div class="h-full justify-end space-x-5 flex">
                  <v-icon color="#74777F" size="large"
                    >mdi-file-document-remove-outline</v-icon
                  >
                  <v-icon color="#74777F" size="large"
                    >mdi-file-document-check-outline</v-icon
                  >
                </div>
              </div>
            </div>
            <div
              class="border-b border-[#EEEDF1] w-full grid grid-cols-12 gap-4 p-2 px-16"
            >
              <div class="col-span-2">
                <div class="opacity-[60%]">สิ้นค้า</div>
                <div class="whitespace-nowrap">
                  <div>รองเท้าแตะ x1</div>
                  <div>ปาท่องโก๋ x3</div>
                  <div>
                    ลิปสติก x5
                    <span class="text-[#084F93] cursor-pointer"
                      >ดูเพิ่มเติม</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-span-2">
                <div class="opacity-[60%]">เบอร์โทร</div>
                <div>081-234-5678</div>
              </div>
              <div class="col-span-2">
                <div class="opacity-[60%]">ผู้สร้างออเดอร์</div>
                <div>Admin 1</div>
              </div>
              <div class="col-span-6">
                <div class="opacity-[60%]">ยกเลิกโดย</div>
                <div>-</div>
              </div>
            </div>
          </td>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
      <div v-else class="h-[260px] flex justify-center items-center">
        <p>ยังไม่มีรายการ</p>
      </div>
    </v-card>

    <!-- content payment  -->
    <v-card
      v-if="tab === 'Payment'"
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] pb-[15px] mt-4"
    >
      <v-data-table
        :items="dataTablePayment"
        :headers="headTablePayment"
        item-key="id"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        items-per-page-text="จำนวนแสดงผล"
        :items-per-page="itemsPerPage"
        :page="page"
      >
        <template v-slot:no-data>
          <div
            class="h-[600px] flex justify-center items-center flex-col space-y-3"
          >
            <div class="opacity-[60%]">ยังไม่มีรายการ</div>
            <v-btn
              color="#084F93"
              variant="outlined"
              size="x-large"
              rounded="lg"
              prepend-icon="mdi-plus"
              class="px-16"
            >
              เพิ่มรายการ
            </v-btn>
          </div>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
    </v-card>

    <!-- content History -->
    

    <!-- pagination  -->
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
definePageMeta({
  middleware: "auth-middleware"
})
type tapType = "Order" | "Payment" | "History"

type tableItemTypeOrder = {
  name: string
  id: string
  status_order: "เสร็จสิ้น" | "ที่ต้องจัดส่ง"
  create_date: string
  price: string
  payment: string
  status: "รอยืนยัน" | "ยืนยันแล้ว"
}
type tableItemTypePayment = {
  id: string
  num_of_order: number
  total: string
  status: "รอดำเนินการ"
}

type tableHeaderType<T> = {
  title: string
  key: keyof T | ""
  align?: "start" | "center" | "end"
  sortable?: boolean
}[]

let tab = ref<tapType>("Payment")
let page = ref(1)
let itemsPerPage = 3
const expanded: any = []
const headersTableOrder: tableHeaderType<tableItemTypeOrder> = [
  {
    key: "payment",
    title: "ชื่อลุกค้า",
    align: "center"
  },
  {
    key: "id",
    title: "หมายเลขคำสั่งซื้อ",
    align: "center"
  },
  {
    key: "status_order",
    title: "สถานะคำสั่งซื้อ",
    align: "center"
  },
  {
    key: "create_date",
    title: "วันที่สร้าง",
    align: "center"
  },
  {
    key: "price",
    title: "ราคา",
    align: "center"
  },
  {
    key: "payment",
    title: "รูปแบบชำระเงิน",
    align: "center"
  },
  {
    key: "status",
    title: "สถานะ",
    align: "center"
  },
  {
    key: "",
    title: ""
  }
]
const dataTableOrder: tableItemTypeOrder[] = [
  {
    create_date: "13/12/2000 20:00",
    id: "1231231231",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "ยืนยันแล้ว",
    status_order: "ที่ต้องจัดส่ง"
  },
  {
    create_date: "13/12/2000 20:00",
    id: "53242342",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "ยืนยันแล้ว",
    status_order: "เสร็จสิ้น"
  },
  {
    create_date: "13/12/2000 20:00",
    id: "23241516",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "เสร็จสิ้น"
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6123135",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "เสร็จสิ้น"
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6132323234",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "ที่ต้องจัดส่ง"
  },
  {
    create_date: "13/12/2000 20:00",
    id: "6134134",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    payment: "COD",
    price: "2,000",
    status: "รอยืนยัน",
    status_order: "ที่ต้องจัดส่ง"
  }
]

const dataTablePayment: tableItemTypePayment[] = [
  {
    id: "123123dasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "Casdasda123sd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "12C3asdasd1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "1223232d1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "ggaasdasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  }
]

const dataTableHistory: tableItemTypePayment[] = [
  {
    id: "123123dasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "Casdasda123sd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "12C3asdasd1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "1223232d1d",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  },
  {
    id: "ggaasdasd",
    num_of_order: 23,
    total: "8,975.00",
    status: "รอดำเนินการ"
  }
]

const headTablePayment: tableHeaderType<tableItemTypePayment> = [
  {
    key: "id",
    title: "CODS ID",
    align: "center"
  },
  {
    key: "num_of_order",
    title: "จำนวนออเดอร์",
    align: "center"
  },
  {
    key: "total",
    title: "ยอดทั้งหมด",
    align: "center"
  },
  {
    key: "status",
    title: "สถานะ",
    align: "center"
  }
]

const chipData = [
  "ชื่อลุกค้า",
  "หมายเลขคำสั่งซื้อ",
  "สถานะคำสั่งซื้อ",
  "วิธีชำระเงิน",
  "สถานะรายได้"
]
const fnChangeTabs = (value: tapType) => {
  tab.value = value
  page.value = 1
}
const pageCount = computed(() => {
  return Math.ceil(eval(`dataTable${tab.value}`).length / itemsPerPage)
})
</script>

<style scoped>
.card {
  @apply border border-[#EEEDF1] rounded-md p-2 flex space-x-2 justify-center items-center;
}
</style>
