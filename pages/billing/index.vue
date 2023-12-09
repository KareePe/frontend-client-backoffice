<template>
  <Toolbars />
  <Navbar text="การเงิน,ค่าขนส่ง" />
  <div class="p-4 sm:ml-64">
    <div
      variant="flat"
      class="lg:flex block gap-[15px] !rounded-[8px] items-center justify-center mt-[2px]"
    >
      <div
        variant="flat"
        class="lg:flex flex-col block gap-[15px] !rounded-[8px] border border-[#C4C6CF] items-center justify-center lg:basis-8/12 p-[32px]"
      >
        <div variant="flat" class="flex flex-row !w-full">
          <div class="lg:basis-6/12 lg:my-0 my-[15px] !h-full flex flex-col">
            <b class="text-[16px] text-[#000] font-semibold"
              >จัดการชุดข้อมูลต้นทุน</b
            >
            <b class="text-[14px] text-[#000000]/[0.6] font-normal"
              >ระบุต้นทุนค่าขนส่งที่ได้รับจากผู้ให้บริการขนส่ง</b
            >
          </div>
          <div class="lg:basis-6/12" flat>
            <div
              :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] justify-end`"
            >
              <NuxtLink to="/billing/cost" flat>
                <div
                  :class="`${'bg-[#D1E4FF]/[0.16] text-[#084F93]'} pt-[12px] pb-[12px] pl-[16px] pr-[16px] !rounded-[8px] text-[14px]`"
                  style="cursor: pointer"
                >
                  จัดการข้อมูลต้นทุน
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div style="height: 1px; width: 100%; background-color: #eeedf1" />
        <div variant="flat" class="flex flex-row !w-full mt-[1rem]">
          <div class="lg:basis-6/12 lg:my-0 my-[15px] !h-full flex flex-col">
            <b class="text-[16px] text-[#000] font-semibold"
              >จัดการชุดข้อมูลราคาขาย</b
            >
            <b class="text-[14px] text-[#000000]/[0.6] font-normal"
              >กำหนดราคาขายที่ต้องการแก่ผู้ใช้บริการแพลตฟอร์ม SalesX</b
            >
          </div>
          <div class="lg:basis-6/12" flat>
            <div
              :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] justify-end`"
            >
              <NuxtLink to="/billing/sell" flat>
                <div
                  :class="`${'bg-[#D1E4FF]/[0.16] text-[#084F93]'} pt-[12px] pb-[12px] pl-[16px] pr-[16px] !rounded-[8px] text-[14px]`"
                  style="cursor: pointer"
                >
                  ตั้งค่าราคาขาย
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div style="height: 1px; width: 100%; background-color: #eeedf1" />
        <div variant="flat" class="flex flex-row !w-full mt-[1rem]">
          <div class="lg:basis-6/12 lg:my-0 my-[15px] !h-full flex flex-col">
            <b class="text-[16px] text-[#000] font-semibold"
              >จัดการชุดข้อมูลใบแจ้งหนี้</b
            >
            <b class="text-[14px] text-[#000000]/[0.6] font-normal"
              >อนุมัติจัดการบิลใบแจ้งหนี้ค่าขนส่ง</b
            >
          </div>
          <div class="lg:basis-6/12" flat>
            <div
              :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] justify-end`"
            >
              <NuxtLink to="/billing/invoice" flat>
                <div
                  :class="`${'bg-[#D1E4FF]/[0.16] text-[#084F93]'} pt-[12px] pb-[12px] pl-[16px] pr-[16px] !rounded-[8px] text-[14px]`"
                  style="cursor: pointer"
                >
                  จัดการใบแจ้งหนี้
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div style="height: 1px; width: 100%; background-color: #eeedf1" />
        <div variant="flat" class="flex flex-row !w-full mt-[1rem]">
          <div class="lg:basis-6/12 lg:my-0 my-[15px] !h-full flex flex-col">
            <b class="text-[16px] text-[#000] font-semibold"
              >สถานะการเรียกเก็บเงินรายคำสั่งซื้อ</b
            >
            <b class="text-[14px] text-[#000000]/[0.6] font-normal"
              >รายละเอียดสถานะการเก็บเงินรายคำสั่งซื้อ</b
            >
          </div>
          <div class="lg:basis-6/12" flat>
            <div
              :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] justify-end`"
            >
              <NuxtLink to="/billing/order" flat>
                <div
                  :class="`${'bg-[#D1E4FF]/[0.16] text-[#084F93]'} pt-[12px] pb-[12px] pl-[16px] pr-[16px] !rounded-[8px] text-[14px]`"
                  style="cursor: pointer"
                >
                  จัดการรายการ
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div style="height: 1px; width: 100%; background-color: #eeedf1" />
        <div variant="flat" class="flex flex-row !w-full mt-[1rem]">
          <div class="lg:basis-6/12 lg:my-0 my-[15px] !h-full flex flex-col">
            <b class="text-[16px] text-[#000] font-semibold"
              >การกระทบยอดค่าขนส่ง</b
            >
            <b class="text-[14px] text-[#000000]/[0.6] font-normal"
              >เทียบรายการค่าขนส่งระหว่างผู้ใช้งานและผู้ให้บริการขนส่ง</b
            >
          </div>
          <div class="lg:basis-6/12" flat>
            <div
              :class="`flex flex-nowrap gap-[15px] py-[8px] px-[16px] rounded-[8px] justify-end`"
            >
              <NuxtLink to="/billing/cod" flat>
                <div
                  :class="`${'bg-[#D1E4FF]/[0.16] text-[#084F93]'} pt-[12px] pb-[12px] pl-[16px] pr-[16px] !rounded-[8px] text-[14px]`"
                  style="cursor: pointer"
                >
                  จัดการรายการ
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
definePageMeta({
  middleware: "auth-middleware",
});
const active = ref("flash");
const tab = ref("status");

const fnChangeActive = (value) => {
  active.value = value;
};
const fnChangeTabs = (value) => {
  tab.value = value;
};

const dataTable = [
  {
    id: "123151523",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    amount: "5",
    total: "3,000",
    status: "จ่ายแล้ว",
    import_data: "13/01/2566 21:00",
  },
  {
    id: "14141414",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    amount: "5",
    total: "3,000",
    status: "จ่ายแล้ว",
    import_data: "13/01/2566 21:00",
  },
  {
    id: "51524354",
    name: "นายทดสอบ นามสกุลไม่ยาว",
    amount: "5",
    total: "3,000",
    status: "จ่ายแล้ว",
    import_data: "13/01/2566 21:00",
  },
];

const headersTable = [
  {
    title: "ชื่อลูกค้า",
    align: "start",
    key: "name",
  },
  {
    title: "หมายเลขคำสั่งซื้อ",
    align: "center",
    key: "id",
  },
  {
    title: "จำนวนสินค้า",
    align: "center",
    key: "amount",
  },
  {
    title: "ยอดรวม",
    align: "center",
    key: "total",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "วันที่นำเข้า",
    align: "center",
    key: "import_date",
  },
  {
    title: "",
    sortable: false,
    key: "",
  },
];

const headerTransportation = [
  {
    title: "รูป",
    align: "center",
    key: "image",
    sortable: false,
  },
  {
    title: "ชื่อขนส่ง",
    align: "center",
    key: "name",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "อัพเดตวันที่",
    align: "center",
    key: "update_date",
  },
  {
    title: "ดาวน์โหลด",
    align: "center",
    key: "",
  },
];

const dataTransportation = [
  {
    image:
      "https://www.eksuwankased2001.co.th/wp-content/uploads/2019/10/flash-express-icon.jpg",
    name: "Flash Express",
    status: "เรียกเก็บ",
    update_date: "13/01/2566 21:00",
  },
  {
    image:
      "https://www.gadgetzone.in.th/wp-content/uploads/2015/01/icon-kerry-express.png",
    name: "Kerry Express",
    status: "ไม่มีการเรียกเก็บ",
    update_date: "13/01/2566 21:00",
  },
  {
    image:
      "https://play-lh.googleusercontent.com/vVGZ4OkxTaKxXUEajlP84odiR1wfCH6eF-YjIPSs89CmxzFZprhyMXfM3Bf-nOTvCVk=w240-h480-rw",
    name: "J&T Express",
    status: "เรียกเก็บ",
    update_date: "13/01/2566 21:00",
  },
  {
    image: "https://assets.aftership.com/couriers/svg/thailand-post.svg",
    name: "Thai Post Express",
    status: "ไม่มีการเรียกเก็บ",
    update_date: "13/01/2566 21:00",
  },
];
</script>

<style scoped>
.card {
  @apply border border-[#EEEDF1] !rounded-[8px] p-2 flex space-x-5 justify-center items-center;
}

.dashboardCard {
  @apply border border-[#EEEDF1] !rounded-[8px] w-full box-border p-[10px] flex flex-col justify-between;
}
</style>
