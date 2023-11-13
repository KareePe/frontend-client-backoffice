<template>
  <Toolbars />
  <Navbar text="บิลจัดส่ง" />
  <div class="p-4 sm:ml-64">
    <div class="flex w-full justify-between">
      <div class="card">
        <div>ยอดเรียกเก็บจากขนส่ง</div>
        <v-btn color="#084F93" variant="flat">สถานะเรียกเก็บ</v-btn>
      </div>

      <v-btn
        color="#084F93"
        variant="flat"
        size="large"
        rounded="lg"
        prepend-icon="mdi-upload"
      >
        ดาวน์โหลดบิลจัดส่ง
      </v-btn>
    </div>
    <!-- button zone -->
    <div class="flex w-full mt-4 space-x-4">
      <v-btn
        variant="outlined"
        class="text-none"
        v-bind:style="[
          active === 'flash'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' },
        ]"
        @click="() => fnChangeActive('flash')"
      >
        Flash Express
      </v-btn>
      <v-btn
        variant="outlined"
        class="text-none"
        v-bind:style="[
          active === 'kerry'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' },
        ]"
        @click="() => fnChangeActive('kerry')"
      >
        Kerry Express
      </v-btn>
      <v-btn
        variant="outlined"
        class="text-none"
        v-bind:style="[
          active === 'jandt'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' },
        ]"
        @click="() => fnChangeActive('jandt')"
      >
        J&T Express
      </v-btn>
      <v-btn
        variant="outlined"
        class="text-none"
        v-bind:style="[
          active === 'thai'
            ? { border: '1px solid #084F93', color: '#084F93' }
            : { border: '1px solid #EEEDF1', color: '#000' },
        ]"
        @click="() => fnChangeActive('thai')"
      >
        Thai Post Express
      </v-btn>
    </div>
    <!-- dashborad card -->
    <div class="mt-4 grid grid-cols-3 gap-4">
      <!-- <CardDashBoard icon="mdi-menu" value="3" title="ทั้งหมด" unit="รายการ" /> -->
      <CardDashBoard
        icon="mdi-currency-usd"
        :value="user"
        title="ยอดรวมที่ต้องชำระ"
        unit="บาท"
        iconSize="x-large"
      />
      <!-- <CardDashBoard
        icon="mdi-truck"
        value="3,300"
        title="ยอดรวมที่ขนส่งเรียกเก็บ"
        unit="บาท"
        iconSize="x-large"
      />
      <CardDashBoard
        icon="mdi-receipt-text-outline"
        value="1,100"
        title="จำนวนที่เก็บจากลูกค้าแล้ว"
        unit="บาท"
        iconSize="large"
      />
      <CardDashBoard
        icon="mdi-receipt-text-clock"
        value="2,200"
        title="จำนวนที่ยังไม่เรียกเก็บจากลูกค้า"
        unit="บาท"
        iconSize="large"
      />
      <CardDashBoard
        icon="mdi-cash"
        value="1,100"
        title="ส่วนต่าง"
        unit="บาท"
        iconSize="x-large"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
type activeType = "flash" | "kerry" | "thai" | "jandt";
definePageMeta({
  middleware: "auth-middleware",
});
const active = ref<activeType>("flash");

const fnChangeActive = (value: activeType) => {
  active.value = value;
};

</script>
<script></script>
<style scoped>
.card {
  @apply border border-[#EEEDF1] rounded-md p-2 flex space-x-5 justify-center items-center;
}

.dashboardCard {
  @apply border border-[#EEEDF1] rounded-md w-full box-border p-5;
}
</style>
