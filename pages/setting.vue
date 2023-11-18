<script setup lang="ts">
import { ref, computed, watch } from "vue";
type headerTableType<T> = {
  title: string;
  key: keyof T | "";
  sortable?: boolean;
  align?: "center" | "start" | "end";
}[];
type itemTableType = {
  username: string;
  role: string;
  status: "active" | "inactive";
  tel?: string;
  email?: string;
};
type userType = {
  username: string;
  role: string;
  tel?: string;
  email: string;
};

definePageMeta({
  middleware: "auth-middleware",
});

const refNavBar = ref(["Setting"]);
const headersTable: headerTableType<itemTableType> = [
  {
    key: "username",
    title: "ชื่อผู้ใช้",
    align: "center",
  },
  {
    key: "role",
    title: "บทบาท",
    align: "center",
  },
  {
    key: "status",
    title: "สถานะ",
    align: "center",
  },
  {
    key: "",
    title: "",
    sortable: false,
  },
];

const itemsTable: itemTableType[] = [
  {
    role: "Super admin",
    status: "active",
    username: "กรกนก กันชัย",
    tel: "09882asd7",
    email: "kornkanok@gmail.com",
  },
  {
    role: "Admin",
    status: "active",
    username: "กนกนก กันชีย",
    tel: "0923237445",
    email: "",
  },
  {
    role: "Operator",
    status: "inactive",
    username: "ภานาวี วีเบอร์",
    tel: "098888777",
    email: "panawee@gmail.com",
  },
];

const openDialog = ref<boolean>(false);
const dialogMode = ref<"edit" | "append">("append");
const openDialogConfirm = ref<boolean>(false);
const openDialogConfirmDelete = ref<boolean>(false);
const toggleSnackbar = ref<boolean>(false);
const toggleSnackbarDelete = ref<boolean>(false);
const confirmDeleteField = ref("");
const isLoading = ref(false);
const url = ref("https://salesx.co/invite?6f1jz9612mq..");
const formValue = ref<itemTableType>({
  username: "",
  status: "inactive",
  role: "Super Admin",
  email: "",
  tel: "",
});
const ruleAppend = ref([
  (value: any) => {
    if (value) return true;

    return "กรุณากรอกข้อมูล";
  },
]);

const fnhandleSubmit = async (event: any) => {
  const results = await event;
  // console.log(event.target[0].checked);
  // console.log(event.target[1].value);
  // console.log(event.target[2].value);
  // console.log(event.target[3].value);
  // console.log(event.target[4].value);
  if (results.valid) {
    if (dialogMode.value === "append") {
      formValue.value = {
        username: event.target[0].value,
        email: event.target[1].value,
        tel: event.target[2].value,
        role: event.target[3].value,
        status: "active",
      };
    } else {
      formValue.value = {
        username: event.target[1].value,
        email: event.target[2].value,
        tel: event.target[3].value,
        role: event.target[4].value,
        status: event.target[0].checked ? "active" : "inactive",
      };
    }
    openDialog.value = false;
    toggleSnackbar.value = true;
    openDialogConfirm.value = true;
  }
};
const fnhandleCloseModal = () => {
  openDialog.value = false;
};

const fnHandleEditClick = (data: itemTableType) => {
  dialogMode.value = "edit";
  openDialog.value = true;
  formValue.value = data;
};

const fnHandleAppendClick = () => {
  openDialog.value = true;
  dialogMode.value = "append";
  formValue.value = {
    username: "",
    status: "active",
    role: "Super Admin",
    email: "",
    tel: "",
  };
};
const ruleConfirmDelete = ref([
  (value: any) => {
    if (value === "ต้องการลบ") return true;

    return "กรุณากรอก 'ต้องการลบ' ";
  },
]);

const fnHandleConfirmDelete = () => {
  if (confirmDeleteField.value === "ต้องการลบ") {
    toggleSnackbarDelete.value = true;
    openDialogConfirmDelete.value = false;
  } else {
  }
};

const fnCopy = () => {
  isLoading.value = true;
  navigator.clipboard.writeText(url.value);

  setTimeout(() => {
    openDialogConfirm.value = false;
    isLoading.value = false;
  }, 1500);
  navigator.clipboard.writeText(url.value);
};
</script>

<template>
  <Toolbars />
  <NavbarDynamic :Breadcrumb="refNavBar" />
  <div class="ContainerLayout">
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] rounded-[8px] !p-3 space-y-5"
    >
      <div class="flex w-full justify-end items-center !mt-0">
        <v-btn
          color="#084F93"
          variant="flat"
          size="large"
          rounded="lg"
          prepend-icon="mdi-plus"
          class="px-16"
          @click="fnHandleAppendClick"
        >
          เพิ่มผู้ใช้งาน
        </v-btn>
      </div>

      <v-card
        variant="flat"
        class="border border-[#EEEDF1] rounded-[8px] pb-[15px]"
      >
        <v-data-table
          :items="itemsTable"
          :headers="headersTable"
          item-key="id"
          no-data-text="ไม่มีข้อมูล"
          items-per-page-text="จำนวนแสดงผล"
        >
          <template
            v-slot:item="{ item, toggleExpand, isExpanded, internalItem }"
          >
            <tr>
              <td class="text-table text-left">
                <div>
                  {{ item.username }}
                </div>
                <div class="text-[12px] opacity-[0.7] leading-3">
                  {{ item.email || item.tel }}
                </div>
              </td>
              <td class="text-table">
                {{ item.role }}
              </td>
              <td class="text-table">
                <div class="!flex !justify-center !items-center">
                  <div
                    class="w-4 h-4 mr-2 rounded-full"
                    v-bind:style="{
                      backgroundColor:
                        item.status === 'active' ? '#12B76A' : '#BA1A1A',
                    }"
                  ></div>
                  {{ item.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน" }}
                </div>
              </td>
              <td class="text-table">
                <!-- <v-icon
                  class="cursor-pointer"
                  size="30"
                  color="#1A1C1E"
                  @click="fnHandleEditClick(item)"
                >
                  mdi-play
                </v-icon> -->
                <v-btn
                  color="#1A1C1E"
                  @click="fnHandleEditClick(item)"
                  size="large"
                  icon="mdi-play"
                  variant="text"
                ></v-btn>
              </td>
            </tr>
          </template>
          <template v-slot:no-data>
            <div
              class="h-[240px] flex justify-center items-center flex-col space-y-3"
            >
              <div class="opacity-[60%]">ยังไม่มีรายการ</div>
            </div>
          </template>
          <template #bottom></template>
        </v-data-table>
      </v-card>
    </v-card>

    <!-- modal append and edit  -->
    <v-dialog v-model="openDialog" class="w-full max-w-sm">
      <v-card class="rounded-lg">
        <v-card-text class="flex justify-center items-center flex-col pb-0">
          <div class="text-base font-bold" style="letter-spacing: 0px">
            เพิ่มผู้ใช้งาน
          </div>
          <div class="absolute right-5 cursor-pointer">
            <v-icon @click="fnhandleCloseModal">mdi-close</v-icon>
          </div>
        </v-card-text>
        <v-card-text
          class="flex flex-col items-center w-full"
          :style="[
            dialogMode === 'edit'
              ? { paddingTop: '0px' }
              : { paddingTop: '16px' },
          ]"
        >
          <v-form
            class="w-full !m-0 space-y-1"
            @submit.prevent="fnhandleSubmit"
          >
            <!-- <v-switch
              v-if="dialogMode === 'edit'"
              color="rgb(8, 79, 147)"
              label="เปิดใช้งาน"
              inset
              :model-value="formValue.status === 'active' ? true : false"
              hide-details
            ></v-switch> -->
            <label
              class="relative inline-flex items-center cursor-pointer my-4"
              v-if="dialogMode === 'edit'"
            >
              <input
                type="checkbox"
                :model-value="formValue.status === 'active' ? true : false"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#084F93]"
              ></div>
              <span
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >เปิดใช้งาน</span
              >
            </label>
            <v-text-field
              class="w-full"
              :model-value="formValue.username"
              label="ชื่อผู้ใช้งาน"
              variant="outlined"
              rounded="lg"
              :rules="ruleAppend"
            ></v-text-field>
            <v-text-field
              class="w-full"
              :model-value="formValue.email"
              label="อีเมลผู้ใช้งาน"
              variant="outlined"
              rounded="lg"
            ></v-text-field>
            <v-text-field
              class="w-full"
              label="เบอร์โทร"
              :model-value="formValue.tel"
              variant="outlined"
              rounded="lg"
            ></v-text-field>
            <v-select
              label="ประเภทสิทธิ์ผู้ใช้งาน"
              class="w-full"
              hide-details="auto"
              rounded="lg"
              :items="['Super Admin', 'Admin', 'Operator']"
              :model-value="formValue.role"
              variant="outlined"
              :rules="ruleAppend"
            ></v-select>

            <div
              class="flex justify-between space-x-2 mb-2 mt-5 w-full"
              v-if="dialogMode === 'append'"
            >
              <v-btn
                color="#084F93"
                variant="flat"
                size="x-large"
                class="w-1/2"
                rounded="lg"
                type="submit"
              >
                เพิ่ม
              </v-btn>
              <v-btn
                color="#084F93"
                variant="outlined"
                size="x-large"
                class="w-1/2"
                rounded="lg"
                @click="fnhandleCloseModal"
              >
                ปิด
              </v-btn>
            </div>
            <div
              class="flex flex-col mb-2 mt-5 w-full"
              v-if="dialogMode === 'edit'"
            >
              <div class="flex w-full justify-between space-x-2 mb-3">
                <v-btn
                  color="#BA1A1A"
                  variant="outlined"
                  size="large"
                  class="w-[48%] !text-sm"
                  rounded="lg"
                  prepend-icon="mdi-delete-outline"
                  @click="
                    () => {
                      openDialogConfirmDelete = true;
                      fnhandleCloseModal();
                    }
                  "
                >
                  ลบผู้ใช้งาน
                </v-btn>
                <v-btn
                  color="#084F93"
                  variant="outlined"
                  size="large"
                  class="w-[48%] !text-sm"
                  rounded="lg"
                  prepend-icon="mdi-rotate-3d-variant"
                >
                  รีเซ็ตรหัส
                </v-btn>
              </div>
              <v-btn
                color="#084F93"
                variant="flat"
                size="large"
                class="w-full"
                rounded="lg"
                type="submit"
              >
                บันทึก
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- modal confirm -->
    <!-- <v-dialog v-model="openDialogConfirm" class="w-full max-w-md">
      <v-card class="rounded-lg">
        <v-card-text class="flex justify-center items-center flex-col">
          <div class="text-base font-bold" style="letter-spacing: 0px">
            สำเร็จ
          </div>
          <div class="absolute right-5 cursor-pointer">
            <v-icon @click="() => (openDialogConfirm = false)"
              >mdi-close</v-icon
            >
          </div>
        </v-card-text>
        <v-card-text class="flex flex-col items-center w-full space-y-4">
          <div
            class="leading-4 text-sm w-[80%] text-center opacity-[0.7]"
            style="letter-spacing: 0px"
          >
            คำเชิญใช้งานระบบได้ถูกส่งไปยังอีเมล test@gmail.com
            กรุณาตรวจสอบอีเมลหรือเข้าสู่ระบบโดยการใช้ลิงค์ต่อไปนี้
          </div>
          <v-text-field
            class="w-full"
            hideDetails
            label="URL"
            variant="outlined"
            readonly
            append-inner-icon="mdi-content-copy"
            @click:appendInner="fnCopy"
            v-model="url"
            rounded="lg"
          ></v-text-field>

          <div class="flex justify-between space-x-2 mb-2 w-full">
            <v-btn
              color="#084F93"
              variant="flat"
              size="x-large"
              class="w-full"
              rounded="lg"
              @click="() => (openDialogConfirm = false)"
            >
              ปิด
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="openDialogConfirm" width="386px" class="rounded-[8px]">
      <v-card class="!p-[5px] !rounded-[8px]">
        <v-card-text class="relative !p-[10px] text-center">
          <v-card-text class="flex justify-center items-center flex-col">
            <div class="text-base font-bold" style="letter-spacing: 0px">
              สำเร็จ
            </div>
            <div class="absolute right-5 cursor-pointer">
              <v-icon @click="() => (openDialogConfirm = false)"
                >mdi-close</v-icon
              >
            </div>
          </v-card-text>
          <p class="text-[14px] text-[#000]/[0.6]">
            คำเชิญใช้งานระบบได้ถูกส่งไปยังอีเมล test@gmail.com
            กรุณาตรวจสอบอีเมลหรือเข้าสู่ระบบโดยการใช้ลิงค์ต่อไปนี้
          </p>

          <v-text-field
            v-model="url"
            :loading="isLoading"
            density="compact"
            variant="outlined"
            label="Search templates"
            append-inner-icon="mdi-content-copy"
            single-line
            hide-details
            class="mt-[15px]"
            prefix="url"
            @click:append-inner="fnCopy"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            flat
            :loading="isLoading"
            class="!bg-[#084F93] text-white !rounded-[8px] !w-full !h-[48px] pb-[8px] px-[16px] text-center"
            @click="openDialogConfirm = false"
            >ตกลง</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- modal confirm del  -->
    <v-dialog v-model="openDialogConfirmDelete" class="w-full max-w-md">
      <v-card class="rounded-lg">
        <v-card-text class="flex justify-center items-center flex-col">
          <div class="flex flex-col justify-center items-center">
            <v-icon color="#BA1A1A" class="mb-1" size="70">
              mdi-information
            </v-icon>
            <div class="text-base font-bold mt-1" style="letter-spacing: 0px">
              ต้องการลบผู้ใช้งาน
            </div>
            <div class="text-xs mt-2 mb-0 opacity-[0.7]">
              กรุณาพิมพ์คำว่า “ต้องการลบ” เพื่อยืนยันการลบบัญชี
            </div>
          </div>
          <div class="absolute right-5 cursor-pointer top-3">
            <v-icon @click="() => (openDialogConfirmDelete = false)"
              >mdi-close</v-icon
            >
          </div>
        </v-card-text>
        <v-card-text class="flex flex-col items-center w-full space-y-4 pt-0">
          <v-form
            class="w-full !m-0 space-y-1"
            @submit.prevent="fnHandleConfirmDelete"
          >
            <v-text-field
              class="w-full"
              v-model="confirmDeleteField"
              placeholder="พิมพ์คำว่า 'ต้องการลบ'"
              variant="outlined"
              rounded="lg"
              :rules="ruleConfirmDelete"
            ></v-text-field>

            <div class="flex justify-center space-x-2 mb-2 w-full mt-1">
              <v-btn
                color="#BA1A1A"
                variant="flat"
                size="x-large"
                class="w-1/2"
                rounded="lg"
                type="submit"
              >
                ยืนยัน
              </v-btn>
              <v-btn
                color="#BA1A1A"
                variant="outlined"
                size="x-large"
                class="w-1/2"
                rounded="lg"
                @click="() => (openDialogConfirmDelete = false)"
              >
                ยกเลิก
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="toggleSnackbar"
      multi-line
      location="top"
      timeout="1500"
      class="[&>div]:bg-[#D1FADF] [&>div]:rounded-md [&>div]:box-border [&>div]:border-l-8 [&>div]:border-[#12B76A]"
    >
      <div class="flex items-center space-x-4">
        <v-icon color="#12B76A">mdi-check-circle</v-icon>
        <div>
          <div class="text-black font-bold text-[14px]">
            เพิ่มผู้ใช้งานสำเร็จ
          </div>
          <div class="text-black text-[14px]">
            {{ formValue?.username + " - " + formValue?.email }}
          </div>
        </div>
      </div>
    </v-snackbar>

    <v-snackbar
      v-model="toggleSnackbarDelete"
      multi-line
      location="top"
      timeout="1500"
      class="[&>div]:bg-[#D1FADF] [&>div]:rounded-md [&>div]:box-border [&>div]:border-l-8 [&>div]:border-[#12B76A]"
    >
      <div class="flex items-center space-x-4">
        <v-icon color="#12B76A">mdi-check-circle</v-icon>
        <div>
          <div class="text-black font-bold text-[14px]">ลบผู้ใช้งานแล้ว</div>
        </div>
      </div>
    </v-snackbar>
  </div>
</template>

<style scoped>
.text-table {
  @apply text-[14px] leading-5 text-center !pr-10;
}
</style>
