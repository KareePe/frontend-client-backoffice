<template>
  <Toolbars />
  <Navbar
    text="จัดการลูกค้า,บัญชีธุรกิจ,Starbuck"
    v-if="detailData.length <= 0"
  />
  <Navbar :text="navbar" v-else />
  <!-- <Navbar :text="navbar" v-if="viewProduct === true" /> -->
  <div class="p-4 md:ml-64">
    <div
      :class="
        viewProduct === true ? 'hidden' : viewWareHouse === true ? 'hidden' : ''
      "
    >
      <div class="flex flex-wrap gap-[15px] items-center">
        <div class="flex relative">
          <img src="/images/starbuck-logo.png" class="w-[100px]" alt="" />
          <v-btn
            class="ma-2 !w-[32px] !h-[32px] !absolute !-bottom-[5px] !-right-[10px]"
            color="#084F93"
            icon="mdi-check"
          ></v-btn>
        </div>
        <div>
          <p class="text-[20px] font-bold">Starbuck</p>
          <div class="border border-[#EEEDF1] !h-[55px] !rounded-[8px] p-[8px]">
            <v-tabs v-model="tab" align-tabs="center">
              <v-tab value="option-1" @click="fn_changeNav('ข้อมูลธุรกิจ')"
                >ข้อมูลธุรกิจ</v-tab
              >
              <v-tab value="option-2" @click="fn_changeNav('ผู้ใช้งานธุรกิจ')"
                >ผู้ใช้งานธุรกิจ</v-tab
              >
              <v-tab value="option-3" @click="fn_changeNav('แพ็คเกจสมาชิก')"
                >แพ็คเกจสมาชิก</v-tab
              >
              <v-tab value="option-4" @click="fn_changeNav('กระเป๋าเงิน')"
                >กระเป๋าเงิน</v-tab
              >
              <v-tab value="option-5" @click="fn_changeNav('ธุรกิจย่อย')"
                >ธุรกิจย่อย</v-tab
              >
              <v-tab value="option-6" @click="fn_changeNav('การตั้งค่าเรียกรถ')"
                >การตั้งค่าเรียกรถ</v-tab
              >
              <v-tab
                value="option-7"
                @click="fn_changeNav('บริการจัดส่งสินค้า')"
                >บริการจัดส่งสินค้า</v-tab
              >
            </v-tabs>
          </div>
        </div>
      </div>
      <v-window v-model="tab" class="mt-[15px]">
        <v-window-item value="option-1">
          <b class="text-[#000] text-[18px] mt-[12px]">ข้อมูลทั่วไป</b>
          <div
            class="border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px] mt-[12px]"
          >
            <div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  ชื่อธุรกิจ
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">Starbuck</p>
              </div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  เบอร์โทร
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  088-573-8576
                </p>
              </div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  อีเมล
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  13/271 ต.ยาวานา อ.เมือง จ.กรุงเทพ 10160
                </p>
              </div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  ที่อยู่
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  173 ถนนดินสอ แขวงเสาชิงช้า เขตพระนคร กรุงเทพมหานคร
                </p>
              </div>
            </div>
          </div>
          <b class="text-[#000] text-[18px] mt-[12px]">ข้อมูลผู้ติดต่อ</b>
          <div
            class="border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px] mt-[12px]"
          >
            <div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  ชื่อผู้ติดต่อ
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  ชื่อจริง และชื่อเล่นที่ยูสเซอร์ให้ไว้
                </p>
              </div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  เบอร์โทร
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  088-573-8576
                </p>
              </div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  อีเมล
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  test@gmail.com
                </p>
              </div>
            </div>
          </div>
          <b class="text-[#000] text-[18px] mt-[12px]"
            >รายละเอียดบัญชีรับชำระเงิน</b
          >
          <div
            class="border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px] mt-[12px]"
          >
            <div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  ชื่อธนาคาร
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  ธนาคารกสิกรไทย
                </p>
              </div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  ชื่อบัญชี
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  นายทดสอบ นามสกุลทดสอบอีก
                </p>
              </div>
              <div class="flex flex-row">
                <p class="text-[14px] text-black/87 font-normal w-[80px]">
                  เลขที่บัญชี
                </p>
                <span class="mx-[30px]">:</span>
                <p class="text-[14px] text-black/60 font-normal">
                  088-573-8576
                </p>
              </div>
            </div>
          </div>
        </v-window-item>
        <v-window-item value="option-2">
          <b class="text-[#000] text-[18px] mt-[12px]">รายชื่อผู้ใช้งาน</b>
          <v-data-table
            v-if="itemsPrd.length > 0"
            :headers="headerBusiness"
            :items="itemsBusiness"
            no-data-text="ไม่มีข้อมูล"
            hide-default-footer
            class="mb-[15px] border mt-[12px]"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-center text-[14px]">{{ item.user }}</td>
                <td class="text-center text-[14px]">{{ item.email }}</td>
                <td class="text-center text-[14px]">{{ item.date_create }}</td>
                <td class="text-center text-[14px]">{{ item.date_current }}</td>
              </tr>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
          <div v-else class="h-[260px] flex justify-center items-center">
            <p>ยังไม่มีรายการ</p>
          </div>
        </v-window-item>
        <v-window-item value="option-3">
          <b class="text-[#000] text-[18px] mt-[12px]">แพ็คเกจปัจจุบัน</b>
          <div
            class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px] mt-[8px]"
          >
            <div
              class="hover:bg-slate-100 transition-all duration-300 basis-full border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
            >
              <div class="flex gap-[15px]">
                <div
                  class="flex gap-[15px] p-[15px] items-center !rounded-[8px] min-w-[159px] h-[52px] bg-gradient-to-r from-[#084F93] to-[#00AA84]"
                >
                  <img
                    src="/images/SALESX_TECHNOLOGIES_LOGO_FINAL_ICONIC_VERSION-05.png"
                    class="w-[26px]"
                    alt=""
                  />
                  <b class="text-white text-[20px] font-bold">Standard</b>
                </div>
              </div>
              <div class="flex gap-[15px] h-[52px] items-center">
                <p class="text-[14px] text-[#000]/[0.6]">
                  ชื่อแพ็คเกจ:<span class="text-[#0BA5EC] ml-[15px] mr-[12px]"
                    >Standard</span
                  >
                  สถานะ:<span class="text-[#12B76A] ml-[15px]"
                    >กำลังใช้งาน</span
                  >
                </p>
              </div>
              <div class="flex gap-[15px] items-center">
                <p class="text-[14px] text-[#000]/[0.6]">
                  การชำระเงินในรอบบิลถัดไป :<span class="text-[#000] ml-[8px]"
                    >14/09/2023</span
                  >
                </p>
              </div>
            </div>
          </div>

          <b class="text-[#000] text-[18px]">ประวัติการชำระเงิน</b>

          <v-card
            variant="flat"
            class="border border-[#EEEDF1] !rounded-[8px] my-[15px] p-[15px]"
          >
            <v-data-table
              v-if="itemsPackage.length > 0"
              v-model:page="pagePackage"
              :headers="headerPackage"
              :items="itemsPackage"
              :items-per-page="itemsPerPagePackage"
              no-data-text="ไม่มีข้อมูล"
              hide-default-footer
              class="mb-[15px]"
            >
              <template v-slot:item="{ item }">
                <tr class="py-[10px]">
                  <td class="text-center text-[14px]">{{ item.date }}</td>
                  <td class="text-center text-[#0BA5EC] text-[14px]">
                    {{ item.no }}
                  </td>
                  <td class="text-center text-[14px]">{{ item.payment_no }}</td>
                  <td class="text-center text-[14px]">{{ item.period }}</td>
                  <td class="text-center text-[14px]">
                    {{ item.payment_method }}
                  </td>
                  <td class="text-center text-[14px]">{{ item.pack }}</td>
                  <td class="text-center text-[14px]">{{ item.amount }}</td>
                  <td class="text-center">
                    <div class="flex gap-[15px]">
                      <div
                        :class="`w-[16px] h-[16px] ${
                          item.status === 'เปิดใช้งาน'
                            ? 'bg-[#12B76A]'
                            : 'bg-[#BA1A1A]'
                        } !rounded-full`"
                      ></div>
                      <div class="text-[14px]">
                        {{ item.status }}
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </v-data-table>

            <div v-else class="h-[260px] flex justify-center items-center">
              <p>ยังไม่มีรายการ</p>
            </div>
          </v-card>
          <div class="text-center pt-2">
            <v-pagination
              v-model="pagePackage"
              :length="pageCountPackage"
            ></v-pagination>
          </div>
        </v-window-item>
        <v-window-item value="option-4">
          <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
            <div
              class="hover:bg-slate-100 transition-all duration-300 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
            >
              <div class="flex gap-[10px] items-center mb-[12px]">
                <v-icon icon="mdi-cash" color="#084F93"></v-icon>
                <p class="text-[22px] font-bold">ยอดคงเหลือ 100,000.00 ฿</p>
              </div>
              <div
                class="flex lg:flex-wrap flex-nowrap gap-[4px] justify-start"
              >
                <div class="text-left">
                  <p class="text-[#000000]/[0.6] text-[14px]">
                    ยอดที่ถูกจอง 13,000.00 / ยอดที่ใช้งานได้ 87,000.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <b class="text-[#000] text-[18px] mt-[12px]">ประวัติการทำรายการ</b>
          <v-data-table
            v-if="itemsPrd.length > 0"
            :headers="headerWallet"
            :items="itemsWallet"
            no-data-text="ไม่มีข้อมูล"
            hide-default-footer
            class="mb-[15px] border mt-[12px]"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-center text-[#0BA5EC] text-[14px]">
                  {{ item.date_time }}
                </td>
                <td class="text-center text-[14px]">{{ item.order }}</td>
                <td class="text-center text-[14px]">{{ item.detail }}</td>
                <td class="text-center text-[14px]">{{ item.money }}</td>
                <td class="text-center text-[14px]">{{ item.status }}</td>
              </tr>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
          <div v-else class="h-[260px] flex justify-center items-center">
            <p>ยังไม่มีรายการ</p>
          </div>
        </v-window-item>
        <v-window-item value="option-5">
          <b class="text-[#000] text-[18px] mt-[12px]">รายการธุรกิจย่อย</b>
          <v-data-table
            v-if="itemsPrd.length > 0"
            :headers="headerSubBiz"
            :items="itemsSubBiz"
            no-data-text="ไม่มีข้อมูล"
            hide-default-footer
            class="mb-[15px] border mt-[12px]"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-center text-[14px]">
                  <img
                    :src="`/images/${item.pic}`"
                    class="w-[40px] h-[40px]"
                    alt=""
                  />
                </td>
                <td class="text-center text-[14px]">{{ item.name }}</td>
                <td class="text-center text-[14px]">{{ item.qty_member }}</td>
                <td class="text-center text-[14px]">{{ item.qty_prod }}</td>
                <td class="text-center text-[14px]">
                  <div class="flex gap-[15px] justify-center">
                    <div
                      :class="`w-[16px] h-[16px] ${
                        item.status === 'เปิดใช้งาน'
                          ? 'bg-[#12B76A]'
                          : 'bg-[#BA1A1A]'
                      } !rounded-full`"
                    ></div>
                    {{ item.status }}
                  </div>
                </td>
              </tr>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
          <div v-else class="h-[260px] flex justify-center items-center">
            <p>ยังไม่มีรายการ</p>
          </div>
        </v-window-item>
        <v-window-item value="option-6">
          <b class="text-[#000] text-[18px] mt-[12px]">รายการเรียกรถประจำ</b>
          <v-data-table
            v-if="itemsPrd.length > 0"
            :headers="headerCarRegular"
            :items="itemsCarRegular"
            no-data-text="ไม่มีข้อมูล"
            hide-default-footer
            class="mb-[15px] border mt-[12px]"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td
                  class="text-center text-[14px] flex gap-[15px] justify-center items-center"
                >
                  <img
                    :src="`/images/pizza-logo.png`"
                    class="w-[40px] h-[40px]"
                    alt=""
                  />
                  <div>{{ item.express }}</div>
                </td>
                <td class="text-center text-[14px]">{{ item.date }}</td>
                <td class="text-center text-[14px]">{{ item.time }}</td>
                <td class="text-center text-[14px]">{{ item.address }}</td>
                <td class="text-center text-[14px]">{{ item.reason }}</td>
                <td class="text-center text-[14px]">
                  <div class="flex gap-[15px] justify-center">
                    <div
                      :class="`w-[16px] h-[16px] ${
                        item.status === 'เปิดใช้งาน'
                          ? 'bg-[#12B76A]'
                          : 'bg-[#BA1A1A]'
                      } !rounded-full`"
                    ></div>
                    {{ item.status }}
                  </div>
                </td>
              </tr>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
          <div v-else class="h-[260px] flex justify-center items-center">
            <p>ยังไม่มีรายการ</p>
          </div>
          <b class="text-[#000] text-[18px] mt-[12px]">รายการเรียกรถ</b>
          <v-data-table
            v-if="itemsPrd.length > 0"
            :headers="headerCar"
            :items="itemsCar"
            no-data-text="ไม่มีข้อมูล"
            hide-default-footer
            class="mb-[15px] border mt-[12px]"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="text-[14px]">{{ item.type }}</td>
                <td class="text-[14px]">{{ item.name }}</td>
                <td class="text-center text-[14px]">{{ item.maker }}</td>
                <td
                  class="text-center text-[14px] flex gap-[4px] justify-center items-center"
                >
                  <img
                    :src="`/images/pizza-logo.png`"
                    class="w-[36px] h-[36px]"
                    alt=""
                  />
                  <div>{{ item.express }}</div>
                </td>
                <td class="text-center text-[14px]">{{ item.code }}</td>
                <td class="text-center text-[14px]">{{ item.time }}</td>
                <td class="text-center text-[14px]">{{ item.qty }}</td>
                <td class="text-center text-[14px]">{{ item.reason }}</td>
                <td class="text-center text-[14px]">
                  <div class="flex gap-[4px] justify-center">
                    <div
                      :class="`w-[16px] h-[16px] ${
                        item.status === 'เปิดใช้งาน'
                          ? 'bg-[#12B76A]'
                          : 'bg-[#BA1A1A]'
                      } !rounded-full`"
                    ></div>
                    {{ item.status }}
                  </div>
                </td>
              </tr>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
          <div v-else class="h-[260px] flex justify-center items-center">
            <p>ยังไม่มีรายการ</p>
          </div>
        </v-window-item>
        <v-window-item value="option-7">
          <div class="flex gap-[4px] flex-col">
            <b class="text-[#000] text-[18px] mt-[12px]"
              >รูปแบบการจัดส่งที่เลือก</b
            >

            <b class="text-[#000] text-[18px] mt-[12px]">ชุดข้อมูลราคาขาย</b>

            <v-data-table
              v-if="itemsSell.length > 0"
              :headers="headerSell"
              :items="itemsSell"
              no-data-text="ไม่มีข้อมูล"
              hide-default-footer
              class="mb-[15px] border mt-[12px]"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td
                    class="text-center text-[14px] flex gap-[4px] justify-center items-center"
                  >
                    <img
                      :src="`/images/pizza-logo.png`"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                    <div>{{ item.express }}</div>
                  </td>
                  <td class="text-center text-[14px]">
                    <div class="flex flex-row justify-center align-center">
                      <div>{{ item.code }}</div>
                      <v-btn
                        color="#1A1C1E"
                        size="large"
                        icon="mdi-square-edit-outline"
                        variant="text"
                        @click="() => {}"
                      ></v-btn>
                    </div>
                  </td>

                  <td class="text-center text-[14px]">
                    <div class="flex gap-[4px] justify-center">
                      <div
                        :class="`w-[16px] h-[16px] ${
                          item.status === 'เปิดใช้งาน'
                            ? 'bg-[#12B76A]'
                            : 'bg-[#BA1A1A]'
                        } !rounded-full`"
                      ></div>
                      {{ item.status }}
                    </div>
                  </td>
                </tr>
              </template>
              <template v-slot:bottom></template>
            </v-data-table>
            <div v-else class="h-[260px] flex justify-center items-center">
              <p>ยังไม่มีรายการ</p>
            </div>
            <b class="text-[#000] text-[18px] mt-[12px]"
              >ตั้งค่าเลือกขนส่งอัตโนมัติ</b
            >
            <v-card
              variant="flat"
              class="!p-[10px] lg:basis-4/12 basis-full mb-[15px] border border-[#EEEDF1] !rounded-[8px] mt-[8px]"
            >
              <div class="flex flex-row">
                <div class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px]">
                  <div
                    class="hover:bg-slate-100 transition-all duration-300 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
                  >
                    <b class="text-[16px]">ข้อมูลขนส่ง</b>

                    <div class="flex flex-row mt-[8px]">
                      <p
                        class="text-[14px] text-black/87 font-normal w-[100px]"
                      >
                        รูปแบบการจัดส่ง
                      </p>
                      <span class="mx-[30px]">:</span>
                      <p class="text-[14px] text-black/60 font-normal">
                        ส่งกับ SalesX
                      </p>
                    </div>
                    <div class="flex flex-row mt-[4px]">
                      <p
                        class="text-[14px] text-black/87 font-normal w-[100px]"
                      >
                        ตั้งค่าเลือกขนส่ง
                      </p>
                      <span class="mx-[30px]">:</span>
                      <p class="text-[14px] text-black/60 font-normal">
                        กำหนดเอง ตามเกณฑ์น้ำหนัก
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="lg:flex block lg:flex-wrap flex-nowrap gap-[15px] ml-[24px]"
                >
                  <div
                    class="hover:bg-slate-100 transition-all duration-300 border border-[#EEEDF1] !rounded-[8px] p-[15px] mb-[15px]"
                  >
                    <b class="text-[16px]">วงเงินเครดิต</b>

                    <div class="flex flex-row mt-[8px]">
                      <p
                        class="text-[14px] text-black/87 font-normal w-[100px] mt-[16px]"
                      >
                        วงเงินเครดิตรวม
                      </p>
                      <span class="mx-[30px] mt-[16px]">:</span>
                      <v-select
                        label="ระบุเงิน"
                        class="!min-h-[56px] w-[200px]"
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
                        :rules="[(v) => !!v || 'กรุณากรอกเลือกเงิน']"
                      ></v-select>
                    </div>
                  </div>
                </div>
              </div>

              <v-data-table
                v-if="itemsExpress.length > 0"
                :headers="headerExpress"
                :items="itemsExpress"
                no-data-text="ไม่มีข้อมูล"
                hide-default-footer
                class="mb-[15px] border mt-[12px]"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td class="text-center text-[14px]">
                      {{ item.weight }}
                    </td>

                    <td class="text-center text-[14px]">{{ item.express }}</td>
                  </tr>
                </template>
                <template v-slot:bottom></template>
              </v-data-table>
              <div v-else class="h-[260px] flex justify-center items-center">
                <p>ยังไม่มีรายการ</p>
              </div>
            </v-card>

            <b class="text-[#000] text-[18px] mt-[12px]"
              >ประวัติการชำระค่าขนส่ง</b
            >
            <v-data-table
              v-if="itemsHistory.length > 0"
              :headers="headerHistory"
              :items="itemsHistory"
              no-data-text="ไม่มีข้อมูล"
              hide-default-footer
              class="mb-[15px] border mt-[12px]"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td class="text-center text-[14px]">
                    {{ item.date_time }}
                  </td>
                  <td class="text-center text-[14px]">
                    {{ item.no }}
                  </td>
                  <td>
                    <div class="flex gap-[8px] justify-center">
                      <div
                        :class="`w-[16px] h-[16px] ${
                          item.status === 'เปิดใช้งาน'
                            ? 'bg-[#12B76A]'
                            : 'bg-[#BA1A1A]'
                        } !rounded-full`"
                      ></div>
                      <div class="text-[14px]">
                        {{ item.status }}
                      </div>
                    </div>
                  </td>

                  <td class="text-center text-[14px]">{{ item.amount }}</td>
                </tr>
              </template>
              <template v-slot:bottom></template>
            </v-data-table>
            <div v-else class="h-[260px] flex justify-center items-center">
              <p>ยังไม่มีรายการ</p>
            </div>
          </div>
        </v-window-item>
      </v-window>
    </div>
  </div>

  <div v-if="viewProduct === true">
    <div class="flex justify-end w-full">
      <v-btn
        color="#084F93"
        prepend-icon="mdi-arrow-left"
        flat
        class="!rounded-[8px] !min-w-[230px] !min-h-[48px] mb-[15px]"
        @click="fn_clearProduct('product')"
        >กลับ</v-btn
      >
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] !rounded-[8px] my-[15px] p-[15px]"
    >
      <v-data-table
        v-if="itemsPrd.length > 0"
        :headers="headersProduct"
        :items="itemsPrd"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        class="mb-[15px]"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <img
                :src="`/images/${item.logo}`"
                class="w-[40px] h-[40px]"
                alt=""
              />
            </td>
            <td class="text-center">{{ item.prdName }}</td>
            <td class="text-center">{{ item.prdType }}</td>
            <td class="text-center">{{ item.prdSub }}</td>
            <td class="text-center">{{ item.stock }}</td>
            <td class="text-center">
              <div class="flex gap-[15px] justify-center">
                <div
                  :class="`w-[20px] h-[20px] ${
                    item.status === 'เปิดใช้งาน'
                      ? 'bg-[#12B76A]'
                      : 'bg-[#BA1A1A]'
                  } !rounded-full`"
                ></div>
                {{ item.status }}
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div v-else class="h-[260px] flex justify-center items-center">
        <p>ยังไม่มีรายการ</p>
      </div>
    </v-card>
  </div>
  <div v-if="viewWareHouse === true">
    <div class="flex justify-end w-full">
      <v-btn
        color="#084F93"
        prepend-icon="mdi-arrow-left"
        flat
        class="!rounded-[8px] !min-w-[230px] !min-h-[48px] mb-[15px]"
        @click="fn_clearProduct('warehouse')"
        >กลับ</v-btn
      >
    </div>
    <v-card
      variant="flat"
      class="border border-[#EEEDF1] !rounded-[8px] my-[15px] p-[15px]"
    >
      <v-data-table
        v-if="itemsWareHouse.length > 0"
        v-model:page="pageWareHouse"
        :headers="headersWareHouse"
        :items="itemsWareHouse"
        :items-per-page="itemsPerPageWareHouse"
        no-data-text="ไม่มีข้อมูล"
        hide-default-footer
        class="mb-[15px]"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="text-center">{{ item.branchName }}</td>
            <td class="text-center">{{ item.provice }}</td>
            <td class="text-center">{{ item.distric }}</td>
            <td class="text-center">{{ item.phone }}</td>
            <td class="text-center">
              <div class="flex gap-[15px] justify-center">
                <p
                  :class="`${
                    item.status === 'ใช้งาน'
                      ? 'text-[#12B76A]'
                      : 'text-[#BA1A1A]'
                  }`"
                >
                  {{ item.status }}
                </p>
              </div>
            </td>
          </tr>
        </template>
        <template v-slot:bottom></template>
      </v-data-table>
      <div v-else class="h-[260px] flex justify-center items-center">
        <p>ยังไม่มีรายการ</p>
      </div>
    </v-card>
    <div class="text-center pt-2">
      <v-pagination
        v-model="pageWareHouse"
        :length="pageCountWareHose"
      ></v-pagination>
    </div>
  </div>

  <v-dialog v-model="dialog" width="458px" class="rounded-[8px]">
    <v-card class="!p-[5px] !rounded-[8px]">
      <v-card-text class="relative !p-[10px] text-center">
        <b
          class="text-[16px] font-bold text-[#000]/[0.6] text-center mb-[10px]"
        >
          แก้ไขชุดข้อมูลราคาขาย
        </b>

        <div
          class="border border-[#EEEDF1] !rounded-[8px] flex flex-row justify-start align-center p-[12px] mt-[32px]"
        >
          <img
            :src="`/images/pizza-logo.png`"
            class="w-[36px] h-[36px]"
            alt=""
          />
          <span class="ml-[12px]"> SCG Express</span>
          <!-- <div>SCG Express</div> -->
        </div>
        <div class="flex flex-row justify-center align-center mt-[12px]">
          <v-select
            label="รหัสข้อมูลราคาขาย"
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
          ></v-select>
        </div>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn
          flat
          :loading="loading"
          class="!bg-[#084F93] text-white !rounded-[8px] !w-full !h-[48px] pb-[8px] px-[16px] text-center"
          @click="dialog = false"
          >ตกลง</v-btn
        > -->
        <div class="lg:flex block gap-[15px] lg:justify-center justify-between">
          <NuxtLink
            to="/account-biz"
            style="border: 1px solid #084f93 !important"
            class="border !border-[#084F93] text-[#084F93] flex items-center justify-center !rounded-[8px] h-[56px] lg:w-[208px] mb-[15px]"
          >
            ยกเลิก
          </NuxtLink>
          <v-btn
            @click="fn_submit('confirm')"
            flat
            class="!bg-[#084F93] text-white flex items-center justify-center !rounded-[8px] !h-[56px] lg:w-[208px] w-full mb-[15px]"
          >
            บันทึก
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
definePageMeta({
  middleware: "auth-middleware",
});
import { ref, onMounted, watch } from "vue";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let pdfLink = ref("");

const date = ref();

let page = ref(1);
let pageWareHouse = ref(1);
let pagePackage = ref(1);
let itemsPerPage = 10;
let itemPerPageSelect = ref(10);
let itemsPerPageWareHouse = 10;
let itemsPerPagePackage = 10;
let search = ref("");
let loading = ref(false);
let dialog = ref(true);
let pdfUrl = ref("");
let pdfUrlBase64 = ref("");

let navbar = ref("จัดการลูกค้า,บัญชีธุรกิจ");

let rest = ref("");
let detailData = ref([]);

let tab = ref(null);

let viewProduct = ref(false);
let viewWareHouse = ref(false);

let productName = ref("");

const headers = [
  {
    title: "รูป",
    align: "center",
    key: "logo",
  },
  {
    title: "รหัสธุรกิจ",
    align: "center",
    key: "bizId",
  },
  {
    title: "ชื่อธุรกิจ",
    align: "center",
    key: "bizname",
  },
  {
    title: "เบอร์โทรติดต่อ",
    align: "center",
    key: "phone",
  },
  {
    title: "ที่อยู่",
    align: "center",
    key: "address",
  },
  {
    title: "ประเภทเครดิต",
    align: "center",
    key: "credit",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: " ",
    align: "center",
    key: "href",
  },
];

const headersProduct = [
  {
    title: "รูป",
    align: "start",
    key: "logo",
  },
  {
    title: "ชื่อสินค้า",
    align: "center",
    key: "prdName",
  },
  {
    title: "ประเภทสินค้า",
    align: "center",
    key: "prdType",
  },
  {
    title: "สินค้าย่อย",
    align: "center",
    key: "prdSub",
  },
  {
    title: "จำนวนสต๊อค",
    align: "center",
    key: "stock",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headersWareHouse = [
  {
    title: "ชื่อคลัง",
    align: "start",
    key: "branchName",
  },
  {
    title: "จังหวัด",
    align: "center",
    key: "provice",
  },
  {
    title: "เขต/อำเภอ",
    align: "center",
    key: "distric",
  },
  {
    title: "เบอร์โทรติดต่อ",
    align: "center",
    key: "phone",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerLogistic = [
  {
    title: "Bill ID",
    align: "start",
    key: "billId",
  },
  {
    title: "ผู้ให้บริการ",
    align: "center",
    key: "vendor",
  },
  {
    title: "ยอดทั้งหมด",
    align: "center",
    key: "amount",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "option",
  },
];

const headerCod = [
  {
    title: "CODS ID",
    align: "start",
    key: "codId",
  },
  {
    title: "ยอดทั้งหมด",
    align: "center",
    key: "amount",
  },
  {
    title: "รอบการโอน",
    align: "center",
    key: "payloop",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "",
    align: "center",
    key: "option",
  },
];

const headerPackage = [
  {
    title: "วันที่",
    align: "center",
    key: "date",
  },
  {
    title: "เลขที่ใบเสร็จ",
    align: "center",
    key: "no",
  },
  {
    title: "บัญชีการชำระเงิน",
    align: "center",
    key: "payment_no",
  },
  {
    title: "รอบการใช้งาน",
    align: "center",
    key: "period",
  },
  {
    title: "วิธีการชำระเงิน",
    align: "center",
    key: "payment_method",
  },
  {
    title: "แพ็คเกจ",
    align: "center",
    key: "pack",
  },
  {
    title: "ยอดรวม",
    align: "center",
    key: "amount",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerUsers = [
  {
    title: "ชื่อผู้ใช้งาน",
    align: "center",
    key: "user",
  },
  {
    title: "บทบาท",
    align: "center",
    key: "role",
  },
  {
    title: "อีเมล",
    align: "center",
    key: "mail",
  },
  {
    title: "เบอร์โทร",
    align: "center",
    key: "phone",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerBusiness = [
  {
    title: "ชื่อผู้ใช้งาน",
    align: "center",
    key: "user",
  },
  {
    title: "อีเมล",
    align: "center",
    key: "email",
  },
  {
    title: "วันที่สมัคร",
    align: "center",
    key: "date_create",
  },
  {
    title: "วันที่ใช้งานล่าสุด",
    align: "center",
    key: "date_current",
  },
];

const headerWallet = [
  {
    title: "วันที่และเวลา",
    align: "center",
    key: "date_time",
  },
  {
    title: "รายการ",
    align: "center",
    key: "order",
  },
  {
    title: "รายละเอียด",
    align: "center",
    key: "detail",
  },
  {
    title: "ยอด",
    align: "center",
    key: "money",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerSubBiz = [
  {
    title: "รูป",
    align: "center",
    key: "pic",
  },
  {
    title: "ชื่อธุรกิจย่อย",
    align: "center",
    key: "name",
  },
  {
    title: "จำนวนสมาชิก",
    align: "center",
    key: "qty_member",
  },
  {
    title: "จำนวนสินค้า",
    align: "center",
    key: "qty_prod",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerCarRegular = [
  {
    title: "ขนส่ง",
    align: "center",
    key: "express",
  },
  {
    title: "วันที่เข้ารับ",
    align: "center",
    key: "date",
  },
  {
    title: "เวลาที่เข้ารับ",
    align: "center",
    key: "time",
  },
  {
    title: "ที่อยู่เข้ารับสินค้า",
    align: "center",
    key: "address",
  },
  {
    title: "หมายเหตุ",
    align: "center",
    key: "reason",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerSell = [
  {
    title: "ขนส่ง",
    align: "center",
    key: "express",
  },
  {
    title: "รหัสข้อมูลการขาย",
    align: "center",
    key: "code",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerCar = [
  {
    title: "รูปแบบการเรียก",
    align: "center",
    key: "type",
  },
  {
    title: "ธุรกิจย่อย",
    align: "center",
    key: "name",
  },
  {
    title: "ผู้ทำ",
    align: "center",
    key: "maker",
  },
  {
    title: "ขนส่ง",
    align: "center",
    key: "express",
  },
  {
    title: "รหัส",
    align: "center",
    key: "code",
  },
  {
    title: "เวลา",
    align: "center",
    key: "time",
  },
  {
    title: "จำนวน",
    align: "center",
    key: "qty",
  },
  {
    title: "หมายเหตุ",
    align: "center",
    key: "reason",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
];

const headerExpress = [
  {
    title: "น้ำหนัก",
    align: "center",
    key: "weight",
  },
  {
    title: "ขนส่ง",
    align: "center",
    key: "express",
  },
];

const headerHistory = [
  {
    title: "วันที่และเวลา",
    align: "center",
    key: "date_time",
  },
  {
    title: "หมายเลขบิลค่าขนส่ง",
    align: "center",
    key: "no",
  },
  {
    title: "สถานะ",
    align: "center",
    key: "status",
  },
  {
    title: "ยอดทั้งหมด",
    align: "center",
    key: "amount",
  },
];

let itemsHistory = [
  {
    date_time: "14/09/2023 15:38",
    no: "LINV231026SX0001A",
    status: "รอดำเนินการ",
    amount: "98,279.00 บาท",
  },
];

let itemsExpress = [
  {
    weight: "0-1 กิโลกรัม",
    express: "Flash express",
  },
  {
    weight: "1-2 กิโลกรัม",
    express: "Flash express",
  },
];

let itemsCod = [
  {
    codId: "CODS2310126SX000101",
    amount: "98,279.00 บาท",
    payloop: "13/12/2000",
    status: "รอดำเนินการ",
  },
  {
    codId: "CODS2310126SX000101",
    amount: "98,279.00 บาท",
    payloop: "13/12/2000",
    status: "สำเร็จ",
  },
];

let itemsBusiness = [
  {
    user: "หม่ำ จ๊กมก",
    email: "Thisismy@gmail.com",
    date_create: "12/01/2566",
    date_current: "12/01/2566",
  },
  {
    user: "หม่ำ จ๊กมก",
    email: "Thisismy@gmail.com",
    date_create: "12/01/2566",
    date_current: "12/01/2566",
  },
];

let itemsSubBiz = [
  {
    pic: "pizza-logo.png",
    name: "ธุรกิจย่อยเริ่มต้น",
    qty_member: "4",
    qty_prod: "1200",
    status: "รอดำเนินการ",
  },
];

let itemsCarRegular = [
  {
    express: "SCG Express",
    date: "จ, อ, พ, พฤ, ศ, อา",
    time: "09.00",
    address: "92/4 ชั้น 2 อาคารสาธรธานี2 ..",
    reason: "-",
    status: "รอดำเนินการ",
  },
];

let itemsCar = [
  {
    type: "เรียกรายครั้ง",
    name: "BU0001",
    maker: "บีจ้า นะจ๊ะ",
    express: "SCG Express",
    code: "23102023CC",
    time: "13/12/2000 21:00",
    qty: "2",
    reason: "-",
    status: "รอดำเนินการ",
  },
];

let itemsSell = [
  {
    express: "SCG Express",
    code: "23102023CC",
    status: "ไม่ได้เชื่อมต่อ",
  },
];

let itemsWallet = [
  // {
  //   user: "หม่ำ จ๊กมก",
  //   email: "Thisismy@gmail.com",
  //   date_create: "12/01/2566",
  // },
  // {
  //   user: "หม่ำ จ๊กมก",
  //   email: "Thisismy@gmail.com",
  //   date_create: "12/01/2566",
  // },
  {
    date_time: "14/09/2023 15:38",
    order: "เติมเครดิต",
    detail: "QR Code พร้อมเพย์",
    money: "+ 1,500 บาท",
    status: "รอดำเนินการ",
  },
  {
    date_time: "14/09/2023 15:38",
    order: "เติมเครดิต",
    detail: "QR Code พร้อมเพย์",
    money: "+ 1,500 บาท",
    status: "รอดำเนินการ",
  },
];

let items = [
  {
    logo: "pizza-logo.png",
    bizId: "SX-0001",
    bizName: "Starbuck",
    phone: "078-837-8838",
    address: "173 ถนนดินสอ แขวงเสาชิงช้า เขตพระนคร กรุงเทพ",
    credit: "Postpaid",
    status: "เปิดใช้งาน",
    href: "",
  },
];

let itemsPrd = [
  {
    logo: "pizza-logo.png",
    prdName: "SX-0001",
    prdType: "Starbuck",
    prdSub: "078-837-8838",
    stock: 500,
    status: "เปิดใช้งาน",
  },
  {
    logo: "pizza-logo.png",
    prdName: "SX-0001",
    prdType: "Starbuck",
    prdSub: "078-837-8838",
    stock: 0,
    status: "ปิดใช้งาน",
  },
];

let itemsWareHouse = [
  {
    branchName: "Bangkok001",
    provice: "กรุงเทพ",
    distric: "บางซื่อ",
    phone: "088-842-4758",
    status: "ใช้งาน",
  },
  {
    branchName: "Bangkok001",
    provice: "กรุงเทพ",
    distric: "บางซื่อ",
    phone: "088-842-4758",
    status: "ระงับ",
  },
];

let itemsLogistic = [
  {
    billId: "CODS2310126SX000101",
    vendor: "Flash Express",
    amount: "98,279.00 บาท",
    status: "จ่ายแล้ว",
  },
  {
    billId: "CODS2310126SX000101",
    vendor: "J&T",
    amount: "98,279.00 บาท",
    status: "จ่ายแล้ว",
  },
];

let itemsPackage = [
  {
    // preview: "",
    no: "SX4832-2845-AC-2844",
    payment_no: "6886-0191-7267-3414",
    bank: "6886-0191-7267-3414",
    payment_method: "VISA *6611",
    date: "14/09/2023",
    period: "14/09/2023 - 14/09/2023",
    pack: "Standard",
    amount: "1,500.00 บาท",
    status: "เปิดใช้งาน",
    // date: "14/09/2023",
    // invoice: "SX4832-2845-AC-2844",
    // desc: "Package standard",
    // payment: "Visa *5734",
    // amout: 1500,
  },
];

let itemsUser = [
  {
    user: "หม่ำ จ๊กมก",
    role: "บทบาท",
    mail: "อีเมล",
    phone: "เบอร์โทร",
    status: "เปิดใช้งาน",
  },
  {
    user: "หม่ำ จ๊กมก",
    role: "บทบาท",
    mail: "อีเมล",
    phone: "เบอร์โทร",
    status: "ปิดใช้งาน",
  },
];

const filterOnlyCapsText = (value, query, item) => {
  return (
    value != null &&
    query != null &&
    typeof value === "string" &&
    value.toString().indexOf(query) !== -1
  );
};

const pageCount = computed(() => {
  return Math.ceil(items.length / itemsPerPage);
});

const pageCountWareHose = computed(() => {
  return Math.ceil(itemsWareHouse.length / itemsPerPageWareHouse);
});

const pageCountPackage = computed(() => {
  return Math.ceil(itemsPackage.length / itemsPerPagePackage);
});

const fn_navDetail = (item) => {
  productName.value = item.bizName;
  detailData.value = item;
  navbar.value = "จัดการลูกค้า,บัญชีธุรกิจ," + productName.value + "";
};

const fn_changeNav = (text) => {
  console.log(navbar.value);
  productName.value = text;
  detailData.value = text;
  navbar.value = "จัดการลูกค้า,บัญชีธุรกิจ,Starbuck," + detailData.value + "";
};

const fn_findDetail = (text) => {
  text === "product"
    ? (viewProduct.value = true)
    : (viewWareHouse.value = true);
};

const fn_clearProduct = (item) => {
  item === "product"
    ? (viewProduct.value = false)
    : (viewWareHouse.value = false);
};

watch(navbar, () => {
  console.log(navbar);
});

const downloadPdf = async () => {};

const fn_genPDF = async () => {
  loading.value = true;
};

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});
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
