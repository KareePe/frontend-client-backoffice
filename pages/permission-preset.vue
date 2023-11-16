<script setup lang="ts">
import { ref, watch, computed } from "vue"
type headerTableType<T> = {
  title: string
  key: keyof T | ""
  sortable?: boolean
  align?: "center" | "start" | "end"
}[]
type itemTableType = {
  role: string
  status: "active" | "inactive"
}
type statePageType = "append" | "default" | "edit"
type permissionsType = {
  name: string
  value: boolean
}
definePageMeta({
  middleware: "auth-middleware"
})

const headersTable: headerTableType<itemTableType> = [
  {
    key: "role",
    title: "บทบาท",
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

const itemsTable: itemTableType[] = [
  {
    role: "Super admin",
    status: "active"
  },
  {
    role: "Admin",
    status: "active"
  },
  {
    role: "Operator",
    status: "inactive"
  }
]

const Permission = ref([
  {
    name: "Dashboard",
    permissions: [
      {
        name: "สรุปยอดการขาย",
        value: false
      },
      {
        name: "สรุปออเดอร์",
        value: false
      },
      {
        name: "สินค้าขายดีวันนี้",
        value: false
      },
      {
        name: "แผนภาพสินค้าขายดี",
        value: false
      },
      {
        name: "ปริมาณการสร้างออเดอร์ (ออเดอร์ต่อวัน)",
        value: false
      }
    ]
  },
  {
    name: "คลังสินค้า",
    permissions: [
      {
        name: "เพิ่มสินค้าใหม่",
        value: false
      },
      {
        name: "นำเข้ารายการสินค้า",
        value: false
      },
      {
        name: "แก้ไขสินค้า",
        value: false
      },
      {
        name: "ลบสินค้า",
        value: false
      },
      {
        name: "กู้คืนสินค้า",
        value: false
      },
      {
        name: "เปลี่ยนแปลงจำนวนสินค้า",
        value: false
      },
      {
        name: "สรุปภาพรวมสินค้า",
        value: false
      },
      {
        name: "ประวัติสินค้า",
        value: false
      },
      {
        name: "รวมสินค้า",
        value: false
      }
    ]
  },
  {
    name: "ออเดอร์",
    permissions: [
      {
        name: "สร้างออเดอร์ใหม่",
        value: false
      },
      {
        name: "แก้ไขออเดอร์",
        value: false
      },
      {
        name: "ลบออเดอร์",
        value: false
      },
      {
        name: "กู้คือออเดอร์",
        value: false
      },
      {
        name: "สร้างการส่งสินค้า",
        value: false
      },
      {
        name: "ส่งออกรายการออเดอร์",
        value: false
      },
      {
        name: "พิมพ์ออเดอร์ทั้งหมด",
        value: false
      }
    ]
  },
  {
    name: "ภาพรวมอย่างละเอียด",
    permissions: [
      {
        name: "ยอดขาย",
        value: false
      },
      {
        name: "คำสั่งซื้อ",
        value: false
      },
      {
        name: "สินค้าขายดี",
        value: false
      },
      {
        name: "ยอดโอนเงินค่า COD",
        value: false
      },
      {
        name: "สินค้าที่ส่งในแต่ละวัน",
        value: false
      },
      {
        name: "ปริมาณการสร้างออเดอร์",
        value: false
      },
      {
        name: "ช่องทางการขาย",
        value: false
      },
      {
        name: "แผนภาพช่องทางการขาย",
        value: false
      }
    ]
  },
  {
    name: "ทีมงาน",
    permissions: [
      {
        name: "เพิ่มทีมงานใหม่",
        value: false
      },
      {
        name: "แก้ไขข้อมูลทีมงาน",
        value: false
      },
      {
        name: "ลบทีมงาน",
        value: false
      }
    ]
  },
  {
    name: "บทบาท",
    permissions: [
      {
        name: "เพิ่มบทบาทใหม่",
        value: false
      },
      {
        name: "แก้ไขข้อมูลบทบาท",
        value: false
      },
      {
        name: "ลบบทบาท",
        value: false
      }
    ]
  },
  {
    name: "ร้านค้า",
    permissions: [
      {
        name: "แก้ไขข้อมูลร้านค้า",
        value: false
      }
    ]
  },
  {
    name: "ตัวแทน",
    permissions: [
      {
        name: "เพิ่มตัวแทน",
        value: false
      },
      {
        name: "แก้ไขตัวแทน",
        value: false
      },
      {
        name: "ลบตัวแทน",
        value: false
      },
      {
        name: "กู้คืนตัวแทน",
        value: false
      }
    ]
  },
  {
    name: "ช่องทางการขาย",
    permissions: [
      {
        name: "เฟซบุ๊กไลฟ์",
        value: false
      }
    ]
  },
  {
    name: "แชตร้านค้า",
    permissions: [
      {
        name: "ช่องทางสนธนา",
        value: false
      },
      {
        name: "มอบหมายแอดมิน",
        value: false
      }
    ]
  },
  {
    name: "Sale Page",
    permissions: [
      {
        name: "สร้าง Sale Page",
        value: false
      }
    ]
  },
  {
    name: "แพ็กเกจ",
    permissions: [
      {
        name: "จัดการแพ็กเกจ",
        value: false
      }
    ]
  }
])

const checkBoxChecking = computed(() => {
  return PermissionAll
})

const PermissionAll = (index: number) => {
  const check = Permission.value[index].permissions.map(
    (item: permissionsType) => {
      return item.value
    }
  )
  const AllCheck = check.every((value) => value === true)
  return AllCheck
}

const checkAllPermission = (index: number, value: any) => {
  if (PermissionAll(index) === false) {
    Permission.value[index].permissions.map(
      (item: permissionsType, subIndex) => {
        Permission.value[index].permissions[subIndex].value = true
      }
    )
  } else {
    Permission.value[index].permissions.map(
      (item: permissionsType, subIndex) => {
        Permission.value[index].permissions[subIndex].value = false
      }
    )
  }
}

const statePage = ref<statePageType>("default")
const navBartext = ref(`Platform , Permission preset , ${statePage.value}`)
</script>

<template>
  <Toolbars />
  <Navbar text="Platform , Permission preset" v-if="statePage === 'default'" />
  <Navbar
    text="Platform , Permission preset , เพิ่มบทบาท"
    v-else-if="statePage === 'append'"
  />
  <Navbar :text="navBartext" v-else />

  <div class="ContainerLayout space-y-4" v-if="statePage === 'default'">
    <!-- button Add Role -->
    <div class="flex w-full justify-end items-center">
      <v-btn
        color="#084F93"
        variant="flat"
        size="large"
        rounded="lg"
        prepend-icon="mdi-plus"
        class="px-16"
        @click="statePage = 'append'"
      >
        เพิ่มบทบาท
      </v-btn>
    </div>

    <!-- table  -->
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
            <td class="text-table">
              {{ item.role }}
            </td>
            <td class="text-table">
              <div class="!flex !justify-center !items-center">
                <div
                  class="w-4 h-4 mr-1 rounded-full"
                  v-bind:style="{
                    backgroundColor:
                      item.status === 'active' ? '#12B76A' : '#BA1A1A'
                  }"
                ></div>
                {{ item.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน" }}
              </div>
            </td>
            <td class="text-table space-x-4">
              <v-icon class="cursor-pointer" size="30" color="#1A1C1E"
                >mdi-square-edit-outline</v-icon
              >
              <v-icon class="cursor-pointer" size="30" color="#1A1C1E"
                >mdi-delete-outline</v-icon
              >
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
  </div>

  <div class="ContainerLayout space-y-4" v-else-if="statePage === 'append'">
    <!-- button Add Role -->
    <div class="flex w-full justify-end items-center">
      <v-text-field label="ชื่อบทบาท" variant="outlined"></v-text-field>
    </div>

    <!-- content  -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(item, index) in Permission">
        <v-expansion-panels>
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title
              @click="(e:any ) => checkAllPermission(index, e.target.value)"
            >
              <v-checkbox
                class="text-checkbox"
                color="#084F93"
                hide-details
                :model-value="[checkBoxChecking(index) ? true : false]"
              >
                <template v-slot:label>
                  <div class="flex space-x-1 w-full justify-center items-center">
                    <div>{{ item.name }}</div>
                    <v-icon>mdi mdi-information-outline</v-icon>
                  </div>
                </template>
              </v-checkbox>
            </v-expansion-panel-title>
            <v-expansion-panel-text style="background-color: #fff">
              <div
                v-for="(PermissionItem, subIndex) in item.permissions"
                class="border-b py-1"
              >
                <v-checkbox
                  @click="
                    () => {
                      Permission[index].permissions[subIndex].value =
                        !PermissionItem.value
                    }
                  "
                  class="text-checkbox"
                  color="#084F93"
                  hide-details
                  :model-value="PermissionItem.value"
                >
                  <template v-slot:label>
                    <div class="flex space-x-1">
                      <div>
                        {{ PermissionItem.name }}
                      </div>
                      <v-icon>mdi mdi-information-outline</v-icon>
                    </div>
                  </template>
                </v-checkbox>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-table {
  @apply text-[14px] leading-5 text-center !pr-10;
}

.v-expansion-panel-title {
  padding: 0px 10px;
  background-color: #eeedf1;
}
.v-expansion-panel {
  background-color: #eeedf1;
}
.text-checkbox {
  color: #000;
  font-weight: bold; /* เปลี่ยนสีตัวหนังสือตามที่คุณต้องการ */
}
</style>
