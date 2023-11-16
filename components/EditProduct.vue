<script setup>
import { computed, ref, watch } from "vue";
const { tab } = defineProps(["tab"]);
const emit = defineEmits(["goBack"]);

const checkbok = ref(false);
const mock_data = ref(["อาหาร"]);
const mock_second2_data = ref([
  "อาหารสด",
  "อาหารสด1",
  "อาหารสด2",
  "อาหารสด3",
  "อาหารสด4",
]);

const fnDeleteDataPrimary = (index) => {
  mock_data.value = [
    ...mock_data.value.slice(0, index),
    ...mock_data.value.slice(index + 1),
  ];
};
const fnDeleteDataSecondary = (index) => {
  mock_second2_data.value = [
    ...mock_second2_data.value.slice(0, index),
    ...mock_second2_data.value.slice(index + 1),
  ];
};

const fnAppendDataSecondary = () => {
  mock_second2_data.value.push("");
};

const fnBackBtn = () => {
  emit("goBack");
};
</script>
<!-- @click:append="fnDeleteData" -->
<template>
  <div
    :class="[
      tab !== 'secondary2'
        ? 'grid grid-cols-2 gap-4'
        : 'grid grid-cols-1 gap-4',
    ]"
  >
    <div class="space-y-4" v-if="tab === 'primary'">
      <div class="text-[20px] font-bold">หมวดหมู่รอง</div>

      <div class="card flex flex-col space-y-2 pr-6">
        <div class="text-[16px]">หมวดหมู่รอง 1</div>
        <v-text-field
          v-for="(item, index) in mock_data"
          variant="outlined"
          density="comfortable"
          class="w-full"
          :model-value="item"
          append-inner-icon="mdi-delete-outline"
          hide-details
          @click:append-inner="fnDeleteDataPrimary(index)"
        ></v-text-field>
        <div class="text-[14px]">หมวดหมู่รอง 2</div>
        <div class="flex" v-for="(item, index) in mock_second2_data">
          <v-icon size="40" color="#084F93">mdi-arrow-right-bottom</v-icon>
          <v-text-field
            variant="outlined"
            density="comfortable"
            class="w-full"
            :model-value="item"
            append-inner-icon="mdi-delete-outline"
            @click:append-inner="fnDeleteDataSecondary(index)"
            hide-details
            @input="
              (event) => {
                mock_second2_data[index] = event.target.value;
              }
            "
          ></v-text-field>
        </div>
        <div class="flex justify-end">
          <v-btn
            prepend-icon="mdi-plus"
            color="#084F93"
            variant="plain"
            @click="fnAppendDataSecondary"
          >
            เพิ่มหมวดหมู่
          </v-btn>
        </div>
      </div>
    </div>

    <div class="space-y-4" v-if="tab === 'secondary1'">
      <div class="text-[20px] font-bold">หมวดหมู่รอง 1</div>

      <div class="card flex flex-col space-y-2 pr-6">
        <div class="text-[16px]">หมวดหมู่รอง 2</div>
        <v-text-field
          v-for="(item, index) in mock_data"
          variant="outlined"
          density="comfortable"
          class="w-full"
          :model-value="item"
          append-inner-icon="mdi-delete-outline"
          hide-details
          @click:append-inner="fnDeleteDataPrimary(index)"
        ></v-text-field>
        <div class="flex justify-end">
          <v-btn prepend-icon="mdi-plus" color="#084F93" variant="plain">
            เพิ่มหมวดหมู่
          </v-btn>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div class="text-[20px] font-bold">ตัวเลือกสินค้า</div>
      <div class="card flex flex-col space-y-3">
        <div class="flex w-full space-x-4 justify-center items-center">
          <div>ประเภท</div>
          <v-select
            label="เลือกประเภท"
            v-if="!checkbok"
            hide-details
            density="compact"
            class="w-full"
            variant="outlined"
            :items="[
              'California',
              'Colorado',
              'Florida',
              'Georgia',
              'Texas',
              'Wyoming',
            ]"
          ></v-select>
          <v-text-field
            v-else
            variant="outlined"
            density="compact"
            class="w-full"
            hide-details
          ></v-text-field>
        </div>
        <div class="flex w-full space-x-4">
          <v-checkbox
            label="เพิ่มระบุประเภทด้วยตัวเอง"
            v-model="checkbok"
            hide-details
          ></v-checkbox>
          <!-- <input
            id="check_type"
            type="checkbox"
            name="check_type"
            v-model="checkbok"
          >
          <label for="check_type" class="cursor-pointer select-none"
            >เพิ่มระบุประเภทด้วยตัวเอง</label
          > -->
          <!-- <v-checkbox>
            <template v-slot:label>
              <div>เพิ่มระบุประเภทด้วยตัวเอง</div>
            </template>
          </v-checkbox> -->
        </div>
        <div class="flex justify-end" v-if="tab !== 'primary'">
          <v-btn prepend-icon="mdi-plus" color="#084F93" variant="plain">
            เพิ่มหมวดหมู่
          </v-btn>
        </div>
      </div>
      <v-btn
        v-if="tab === 'primary'"
        color="#084F93"
        variant="flat"
        size="large"
        rounded="lg"
        prepend-icon="mdi-plus"
      >
        เพิ่มตัวเลือกสินค้า
      </v-btn>
    </div>
  </div>
  <div class="flex flex-row space-x-3 justify-end">
    <v-btn
      class="!px-[200px]"
      color="#084F93"
      variant="outlined"
      size="x-large"
      rounded="lg"
      @click="fnBackBtn"
    >
      กลับ
    </v-btn>
    <v-btn
      class="!px-[200px]"
      color="#084F93"
      variant="flat"
      size="x-large"
      rounded="lg"
      @click="fnBackBtn"
    >
      บันทึก
    </v-btn>
  </div>
</template>

<style scoped>
.card {
  @apply border border-[#EEEDF1] rounded-md p-4 flex space-x-2;
}
</style>
