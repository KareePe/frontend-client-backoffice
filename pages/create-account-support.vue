<template>
  <Toolbars />
  <Navbar text="สนับสนุนการขาย,สร้างลิงค์สนับสนุน" />
  <!-- <Navbar :text="navbar" v-else /> -->
  <!-- <Navbar text="Create account support" /> -->
  <!-- <Navbar :text="navbar" v-if="viewProduct === true" /> -->

  <div class="p-4 md:ml-64">
    <div
      class="lg:flex block lg:flex-wrap flex-nowarp justify-end items-start mb-[15px]"
    >
      <v-btn
        @click="fn_submit"
        flat
        color="#084F93"
        class="flex bg-[#084F93] text-white justify-center gap-[8px] !rounded-[8px] items-center lg:!w-[200px] w-full !h-[56px]"
      >
        <v-icon icon="mdi-plus" color="#fff"></v-icon>
        สร้าง
      </v-btn>
    </div>
    <v-form ref="forms" v-model="valid" lazy-validation class="">
      <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
        <v-card
          variant="flat"
          class="!p-[15px] lg:basis-4/12 basis-full mb-[15px] border border-[#EEEDF1] !rounded-[8px]"
        >
          <p class="text-[16px]">ข้อมูลลูกค้า</p>
          <div class="my-[15px]">
            <v-text-field
              label="ชื่อ-สกุล"
              v-model="inputData.name"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกชื่อลูกค้า']"
            ></v-text-field>
            <v-text-field
              label="ชื่อ-สกุล"
              v-model="inputData.email"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[
                (v) =>
                  (v == '' || null
                    ? false
                    : /[a-zA-Z0-9-_.]+@([a-zA-z]+\.)([a-zA-Z]{2,4}|[a-zA_Z]{2,4}.[a-zA-Z]{2,4})$/.test(
                        v
                      )) ||
                  'รูปแบบไม่ถูกต้อง กรุณากรอกตามตัวอย่าง เช่น sam@gmail.com, me@outlook.co.th',
              ]"
            ></v-text-field>
            <v-text-field
              label="เบอร์โทรติดต่อ"
              v-model="inputData.phone"
              variant="outlined"
              class="!min-h-[56px]"
            ></v-text-field>
          </div>

          <v-card
            variant="flat"
            class="!p-[15px] lg:basis-4/12 basis-full mb-[15px] border border-[#EEEDF1] !rounded-[8px]"
          >
            <p class="text-[16px] mb-[15px]">ข้อมูลแพ็คเกจ</p>
            <div
              class="mt-[15px] !w-full justify-between flex-row-reverse flex flex-nowrap gap-[15px] border border-[#EEEDF1] rounded-[8px] py-[8px] px-[16px]"
            >
              <v-radio-group
                v-model="inputData.radiosPackage"
                :hide-details="true"
                class="justify-between flex"
              >
                <v-radio
                  value="Standard"
                  density="compact"
                  :hide-details="true"
                  class="flex justify-between flex-row-reverse my-[15px]"
                >
                  <template v-slot:label>
                    <p>Standard</p>
                  </template>
                </v-radio>
                <v-radio
                  value="Business"
                  density="compact"
                  :hide-details="true"
                  class="flex justify-between flex-row-reverse my-[15px]"
                >
                  <template v-slot:label>
                    <p>Business</p>
                  </template>
                </v-radio>
                <v-radio
                  value="Business +"
                  density="compact"
                  :hide-details="true"
                  class="flex justify-between flex-row-reverse my-[15px]"
                >
                  <template v-slot:label>
                    <p>Business +</p>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
          </v-card>
          <p class="text-[14px] mb-[15px] text-[#74777F]">โค้ดส่วนลด (ถ้ามี)</p>
          <div
            class="lg:flex block gap-[15px] items-start lg:ml-[30px] ml-0 lg:mx-[15px] mx-0 my-[15px]"
          >
            <v-text-field
              label="กรอกโค้ดส่วนลด"
              v-model="newTag"
              variant="outlined"
              class="rounded-[8px] !h-[56px] lg:!max-w-[366px] lg:w-[366px] !max-w-full w-full"
              hide-details
            />
            <v-btn
              color="#084F93"
              flat
              class="lg:w-[100px] w-full lg:mt-0 mt-[15px] min-h-[56px] !rounded-[8px]"
              >ตกลง</v-btn
            >
          </div>
          <!-- <div class="lg:basis-4/12 basis-full">
            <v-text-field
              label="กรอกโค้ดส่วนลด"
              v-model="inputData.name"
              variant="outlined"
              class="!min-h-[56px]"
            ></v-text-field>
          </div> -->
        </v-card>
        <v-card
          variant="flat"
          class="!p-[15px] lg:basis-4/12 basis-full mb-[15px] border border-[#EEEDF1] !rounded-[8px]"
        >
          <p class="text-[16px]">ข้อมูลธุรกิจลูกค้า</p>
          <div class="my-[15px]">
            <v-text-field
              label="ชื่อธุรกิจ"
              v-model="inputData.bizName"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกชื่อธุรกิจ']"
            ></v-text-field>
            <v-select
              label="ประเภทธุรกิจ"
              v-model="inputData.bizType"
              class="!min-h-[56px]"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
              variant="outlined"
              clearable
              :rules="[(v) => !!v || 'กรุณากรอกเลือกประเภทธุรกิจ']"
            ></v-select>
            <v-text-field
              label="ที่อยู่"
              v-model="inputData.address"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกที่อยู่']"
            ></v-text-field>
            <v-text-field
              label="เลขที่ผู้เสียภาษี"
              v-model="inputData.taxId"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกเลขที่ผู้เสียภาษี']"
            ></v-text-field>
          </div>

          <p class="text-[14px] mb-[15px] text-[#74777F]">
            ระบุจำนวนพนักงานของคุณ
          </p>
          <div
            class="mt-[15px] !w-full justify-between flex-row-reverse flex flex-nowrap gap-[15px] border border-[#EEEDF1] rounded-[8px] py-[8px] px-[16px]"
          >
            <v-radio-group
              v-model="inputData.radiosEmp"
              :hide-details="true"
              class="justify-between flex"
            >
              <v-radio
                value="Standard"
                density="compact"
                :hide-details="true"
                class="flex justify-between flex-row-reverse my-[15px]"
              >
                <template v-slot:label>
                  <p>1 คน</p>
                </template>
              </v-radio>
              <v-radio
                value="Business"
                density="compact"
                :hide-details="true"
                class="flex justify-between flex-row-reverse my-[15px]"
              >
                <template v-slot:label>
                  <p>2 คน - 9 คน</p>
                </template>
              </v-radio>
              <v-radio
                value="Business +"
                density="compact"
                :hide-details="true"
                class="flex justify-between flex-row-reverse my-[15px]"
              >
                <template v-slot:label>
                  <p>10 คน - 20 คน</p>
                </template>
              </v-radio>
              <v-radio
                value="Business +"
                density="compact"
                :hide-details="true"
                class="flex justify-between flex-row-reverse my-[15px]"
              >
                <template v-slot:label>
                  <p>21 คนขึ้นไป</p>
                </template>
              </v-radio>
            </v-radio-group>
          </div>
        </v-card>
        <v-card
          variant="flat"
          class="!p-[10px] lg:basis-4/12 basis-full mb-[15px] border border-[#EEEDF1] !rounded-[8px]"
        >
          <p class="text-[16px]">ข้อมูลขนส่ง</p>
          <div class="my-[15px]">
            <v-select
              label="กำหนดขนส่ง"
              v-model="inputData.logistic"
              class="!min-h-[56px]"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
              variant="outlined"
              clearable
              :rules="[(v) => !!v || 'กรุณากรอกเลือกประเภทธุรกิจ']"
            ></v-select>
            <v-select
              label="ชุดราคา"
              v-model="inputData.price"
              class="!min-h-[56px]"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
              variant="outlined"
              clearable
              :rules="[(v) => !!v || 'กรุณากรอกเลือกประเภทธุรกิจ']"
            ></v-select>
            <v-text-field
              label="วงเงินเครดิต"
              v-model="inputData.credit"
              variant="outlined"
              class="!min-h-[56px]"
              :rules="[(v) => !!v || 'กรุณากรอกเลขที่ผู้เสียภาษี']"
            ></v-text-field>
          </div>
        </v-card>
      </div>
    </v-form>
  </div>

  <v-dialog v-model="dialog" width="386px" class="rounded-[8px]">
    <v-card class="!p-[5px] !rounded-[8px]">
      <v-card-text class="relative !p-[10px] text-center">
        <v-icon
          icon="mdi-check-circle"
          size="x-large"
          color="#12B76A"
          class="mb-[20px]"
        ></v-icon>
        <p
          class="text-[16px] font-bold text-[#000]/[0.6] text-center mb-[10px]"
        >
          สร้างผู้ใช้งานเรียบร้อย
        </p>
        <p class="text-[14px] text-[#000]/[0.6]">
          สามารถนำ Url นี้ส่งต่อให้ลูกค้าเพื่อเข้าสู่ระบบ
        </p>

        <v-text-field
          v-model="url"
          :loading="loading"
          density="compact"
          variant="outlined"
          label="Search templates"
          append-inner-icon="mdi-content-copy"
          single-line
          hide-details
          class="mt-[15px]"
          prefix="url"
          @click:append-inner="fn_copyUrl"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          :loading="loading"
          class="!bg-[#084F93] text-white !rounded-[8px] !w-full !h-[48px] pb-[8px] px-[16px] text-center"
          @click="dialog = false"
          >ตกลง</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, computed } from "vue";

let loading = ref(false);
let dialog = ref(false);
let valid = ref(true);
let inputData = ref({
  name: "",
  email: "",
  phone: "",
  radiosPackage: "",
  bizName: "",
  bizType: null,
  radiosEmp: "",
  address: "",
  taxId: "",
  logistic: null,
  price: null,
  credit: "",
});

let url = ref("www.salex.com/3257345");

const fn_submit = () => {
  dialog.value = true;
};

const fn_copyUrl = () => {
  loading.value = true;
  navigator.clipboard.writeText(url.value);
  // loading.value = false;
  alert.value = true;
  setTimeout(() => {
    dialog.value = false;
    loading.value = false;
  }, 1500);
};
</script>
<style>
.v-pagination__next .v-btn,
.v-pagination__prev .v-btn {
  border: 1px solid #c2c2c2 !important;
  border-radius: 8px !important;
}
.v-pagination__item--is-active .v-btn {
  background-color: #084f93;
  border-radius: 8px !important;
  color: #fff;
}
.v-data-table-footer__pagination {
  margin: 15px 0 !important;
}
.v-data-table-footer__info,
.v-data-table-footer__pagination {
  display: none !important;
}

thead tr {
  background-color: #e9e7eb;
}

.v-tab--selected {
  background-color: #094f93;
  border-radius: 8px !important;
  color: #fff !important;
}
.v-tab.v-tab {
  height: 38px;
  font-size: 14px;
}
.v-tab__slider {
  height: 0 !important;
}
</style>
