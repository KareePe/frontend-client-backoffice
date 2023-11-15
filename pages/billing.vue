<template>
  <Toolbars />
  <Navbar text="บิลจัดส่ง" />
  <div class="p-4 sm:ml-64">
    <!-- button Switch -->
    <div class="flex w-full justify-between">
      <div class="card">
        <v-btn
          v-bind:color="tab === 'transportation' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px]"
          @click="() => fnChangeTabs('transportation')"
          >ยอดเรียกเก็บจากขนส่ง</v-btn
        >
        <v-btn
          v-bind:color="tab === 'status' ? '#084F93' : '#fff'"
          variant="flat"
          class="!rounded-[8px]"
          @click="() => fnChangeTabs('status')"
          >สถานะเรียกเก็บ</v-btn
        >
      </div>
      <v-btn
        color="#084F93"
        variant="flat"
        size="large"
        class="!rounded-[8px]"
        prepend-icon="mdi-tray-arrow-down"
        v-if="tab === 'status'"
      >
        ดาวน์โหลดบิลจัดส่ง
      </v-btn>
      <v-btn
        color="#084F93"
        variant="flat"
        size="large"
        class="!rounded-[8px]"
        prepend-icon="mdi-tray-arrow-up"
        v-if="tab === 'transportation'"
      >
        อัปโหลดบิลจัดส่ง
      </v-btn>
    </div>
    <!-- button zone -->
    <div class="flex w-full mt-4 space-x-4" v-if="tab === 'status'">
      <v-btn
        variant="outlined"
        class="text-none !rounded-[8px]"
        v-bind:style="[
          active === 'flash'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' }
        ]"
        @click="() => fnChangeActive('flash')"
      >
        Flash Express
      </v-btn>
      <v-btn
        variant="outlined"
        class="text-none !rounded-[8px]"
        v-bind:style="[
          active === 'kerry'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' }
        ]"
        @click="() => fnChangeActive('kerry')"
      >
        Kerry Express
      </v-btn>
      <v-btn
        variant="outlined"
        class="text-none !rounded-[8px]"
        v-bind:style="[
          active === 'jandt'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' }
        ]"
        @click="() => fnChangeActive('jandt')"
      >
        J&T Express
      </v-btn>
      <v-btn
        variant="outlined"
        class="text-none !rounded-[8px]"
        v-bind:style="[
          active === 'thai'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' }
        ]"
        @click="() => fnChangeActive('thai')"
      >
        Thai Post Express
      </v-btn>
    </div>
    <!-- dashborad card -->
    <div class="mt-4 grid grid-cols-3 gap-4" v-if="tab === 'status'">
      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#084F93" size="x-large">
              mdi-menu
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">ทั้งหมด</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">3</div>
          <div class="text-[20px]">รายการ</div>
        </div>
      </div>

      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#084F93" size="x-large">
              mdi-currency-usd
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">ยอดรวมที่ต้องชำระ</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">3,300</div>
          <div class="text-[20px]">บาท</div>
        </div>
      </div>

      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#084F93" size="x-large">
              mdi-truck
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">ยอดรวมที่ขนส่งเรียกเก็บ</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">3,300</div>
          <div class="text-[20px]">บาท</div>
        </div>
      </div>

      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#084F93" size="large">
              mdi-receipt-text-outline
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">จำนวนที่เก็บจากลูกค้าแล้ว</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">1,100</div>
          <div class="text-[20px]">บาท</div>
        </div>
      </div>

      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#084F93" size="large">
              mdi-receipt-text-clock
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">
            จำนวนที่ยังไม่เรียกเก็บจากลูกค้า
          </div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">2,200</div>
          <div class="text-[20px]">บาท</div>
        </div>
      </div>

      <div class="dashboardCard">
        <div class="flex">
          <div class="flex justify-center items-center">
            <v-icon class="mr-1" color="#084F93" size="x-large">
              mdi-cash
            </v-icon>
          </div>
          <div class="text-[22px] leading-[1.4]">ส่วนต่าง</div>
        </div>
        <div class="flex justify-end items-end mt-4">
          <div class="text-[34px] font-bold leading-[1.2] mr-2">1,100</div>
          <div class="text-[20px]">บาท</div>
        </div>
      </div>
    </div>

    <!-- table status-->
    <v-card class="mt-4 !rounded-[8px]" variant="flat" v-if="tab === 'status'">
      <v-data-table
        :items="dataTable"
        :headers="headersTable"
        item-key="id"
        no-data-text="ไม่มีข้อมูล"
        items-per-page-text="จำนวนแสดงผล"
        class="border"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-[14px] leading-5 tracking-[-0.23%]">
              {{ item.name }}
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.id }}
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.amount }}
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.total }}
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.status }}
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.import_data }}
            </td>
            <td class="flex justify-between items-center cursor-pointer">
              <v-icon @click="() => console.log('download')" color="#1A1C1E" size="small">
                mdi-tray-arrow-down
              </v-icon>
              <v-icon @click="() => console.log('eye')" color="#1A1C1E" size="small">
                mdi-eye-outline
              </v-icon>
            </td>
          </tr>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
    </v-card>

    <!-- table transportation-->
    <v-card class="mt-4 !rounded-[8px]" variant="flat" v-if="tab === 'transportation'">
      <v-data-table
        :items="dataTransportation"
        :headers="headerTransportation"
        item-key="id"
        no-data-text="ไม่มีข้อมูล"
        items-per-page-text="จำนวนแสดงผล"
        class="border"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <div class="flex items-center w-full justify-center">
                <img
                  class="w-9 h-9 rounded-full"
                  :src="item.image"
                  alt="user photo"
                />
              </div>
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.name }}
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.status }}
            </td>
            <td
              class="text-[14px] leading-5 tracking-[-0.23%] text-center pr-10"
            >
              {{ item.update_date }}
            </td>

            <td class="flex justify-center items-center cursor-pointer">
              <v-icon @click="() => console.log('download')" color="#1A1C1E" size="small">
                mdi-tray-arrow-down
              </v-icon>
            </td>
          </tr>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
definePageMeta({
  middleware: "auth-middleware"
})
const active = ref("flash")
const tab = ref("status")

const fnChangeActive = (value) => {
  active.value = value
}
const fnChangeTabs = (value) => {
  tab.value = value
}

const dataTable = [
  {
    id: "123151523",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    amount: "5",
    total: "3,000",
    status: "จ่ายแล้ว",
    import_data: "13/01/2566 21:00"
  },
  {
    id: "14141414",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    amount: "5",
    total: "3,000",
    status: "จ่ายแล้ว",
    import_data: "13/01/2566 21:00"
  },
  {
    id: "51524354",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    amount: "5",
    total: "3,000",
    status: "จ่ายแล้ว",
    import_data: "13/01/2566 21:00"
  }
]

const headersTable = [
  {
    title: "ชื่อลูกค้า",
    align: "start",
    key: "name"
  },
  {
    title: "หมายเลขคำสั่งซื้อ",
    align: "center",
    key: "id"
  },
  {
    title: "จำนวนสินค้า",
    align: "center",
    key: "amount"
  },
  {
    title: "ยอดรวม",
    align: "center",
    key: "total"
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status"
  },
  {
    title: "วันที่นำเข้า",
    align: "center",
    key: "import_date"
  },
  {
    title: "",
    sortable: false,
    key: ""
  }
]

const headerTransportation = [
  {
    title: "รูป",
    align: "center",
    key: "image",
    sortable: false
  },
  {
    title: "ชื่อขนส่ง",
    align: "center",
    key: "name"
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status"
  },
  {
    title: "อัพเดตวันที่",
    align: "center",
    key: "update_date"
  },
  {
    title: "ดาวน์โหลด",
    align: "center",
    key: ""
  }
]

const dataTransportation = [
  {
    image:
      "https://www.eksuwankased2001.co.th/wp-content/uploads/2019/10/flash-express-icon.jpg",
    name: "Flash Express",
    status: "เรียกเก็บ",
    update_date: "13/01/2566 21:00"
  },
  {
    image:
      "https://www.gadgetzone.in.th/wp-content/uploads/2015/01/icon-kerry-express.png",
    name: "Kerry Express",
    status: "ไม่มีการเรียกเก็บ",
    update_date: "13/01/2566 21:00"
  },
  {
    image:
      "https://play-lh.googleusercontent.com/vVGZ4OkxTaKxXUEajlP84odiR1wfCH6eF-YjIPSs89CmxzFZprhyMXfM3Bf-nOTvCVk=w240-h480-rw",
    name: "J&T Express",
    status: "เรียกเก็บ",
    update_date: "13/01/2566 21:00"
  },
  {
    image: "https://assets.aftership.com/couriers/svg/thailand-post.svg",
    name: "Thai Post Express",
    status: "ไม่มีการเรียกเก็บ",
    update_date: "13/01/2566 21:00"
  }
]
</script>

<style scoped>
.card {
  @apply border border-[#EEEDF1] !rounded-[8px] p-2 flex space-x-5 justify-center items-center;
}

.dashboardCard {
  @apply border border-[#EEEDF1] !rounded-[8px] w-full box-border p-[10px] flex flex-col justify-between;
}
</style>
