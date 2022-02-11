 <template>
     <DataTable :value="customers" :paginator="paginator" class="p-datatable-customers" :rows="rows"
            @page="tableStatePersistence($event)"
            dataKey="id" :rowHover="rowHover" :loading="loading"
            :paginatorTemplate="paginatorTemplate"
            :rowsPerPageOptions="rowsPerPageOptions"
            :first="first"
            ref="dt"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            responsiveLayout="scroll" :scrollable="true"
            @row-click="paginatorUser,$emit('rowClicked', $event)">
            <template #empty>
                No {{ defaultText }} found.
            </template>
            <template #loading>
                Loading {{ defaultText }} data. Please wait.
            </template>

            <!-- <template #header>
                <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>
            </template> -->

            <span v-if="tableType=='accountUsers'">
              <Column field="firstName" header="First Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div>
                         <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="../assets/svgs/buddy.svg" alt="" /> </span>
                         <span> {{data.firstName}} </span>
                 </div>
                </template>
              </Column>
              <Column field="familyname" header="Family Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data.familyName}} </span>
                </template>
              </Column>
              <Column field="email" header="User Name" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <div class="truncate">{{data.email}}</div>
                  </template>
              </Column>
              <Column field="userType" header="User Type" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text"> {{userTypes[data.userType]}}</span>
                  </template>
              </Column>
               <Column header="Credits" sortField="credits" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text">{{ data.credits }}</span>
                  </template>
              </Column>
              <Column header="Status" sortField="status" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text">{{ data.status?"Active":"In-Active" }}</span>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body>
                  <div class="my-center-text">
                    <svg xmlns="http://www.w3.org/2000/svg" @click.prevent="showConsole()" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
              </template>
            </Column>
            </span>
            <span v-if="tableType=='creditTableFirst'">
              <Column field="date" header="Date" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.date }}</span>
                </template>
              </Column>
              <Column field="time" header="Time" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.time }} </span>
                </template>
              </Column>
              <Column field="amount" header="Credit Requested" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                  <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text" @click="toggle($event, data)" aria-haspopup="true" aria-controls="overlay_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <!-- <div>
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('correctCreditUpdate')">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div> -->
              </template>
            </Column>
            </span>

             <span v-if="tableType=='creditTableSecond'">
              <Column field="date" header="Date of Update" :sortable="sortTable" style="min-width: 15rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.date }}</span>
                </template>
              </Column>
              <Column field="time" header="Time" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.time }} </span>
                </template>
              </Column>
              <Column field="requestAmount" header="Credit Requested" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.requestAmount }}</span>
                  </template>
              </Column>
              <Column field="accountName" header="Client" :sortable="sortTable" style="min-width: 5rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data.accountName }}</span>
                </template>
              </Column>
              <Column field="email" header="Admin Email Address" :sortable="sortTable" style="min-width: 15rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.masterUserEmail }}</span>
                </template>
              </Column>
              <Column field="adminFullName" header="Admin Name" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="ml-6">{{ data.adminFullName }}</span>
                  </template>
              </Column>
              <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text" @click.stop="toggle($event, data)" aria-haspopup="true" aria-controls="overlay_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <div>
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('correctCreditUpdate')">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div>
              </template>
            </Column>
            </span>

             <span v-if="tableType=='creditTableThird'">
              <Column field="date" header="Date" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.date }}</span>
                </template>
              </Column>
              <Column field="time" header="Time" :sortable="sortTable" style="min-width: 3rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.time }} </span>
                </template>
              </Column>
              <Column field="amount" header="Credit Requested" sortField="amount" :sortable="sortTable" style="min-width:13rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column field="firstName" header="End User Name" sortField="firstName" :sortable="sortTable" style="min-width: 13rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.firstName?data.firstName:'--' }}</span>
                  </template>
              </Column>
               <Column field="email" header="End User Email Address" sortField="email" :sortable="sortTable" style="min-width: 18rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.email?data?.email:'--' }}</span>
                </template>
              </Column>
              <Column field="accountName" sortField="Client" header="Client" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.accountName?data?.accountName:'--' }}</span>
                </template>
              </Column>
            <Column style="min-width: 3rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body="{data}">
                  <div class="my-center-text" @click.stop="toggle($event, data)" aria-haspopup="true" aria-controls="overlay_menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                  <div>
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
                       <template #item="{item}">
                            <p class="p-2 cursor-pointer" @click.prevent="$emit('correctCreditUpdate')">{{ item.label }}</p>
                    </template>
                    </Menu>
                  </div>
              </template>
            </Column>
            </span>

            <span v-if="tableType =='users'">
              <Column field="name" header="Account Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div class="flex space-x-4 truncate custome-width">
                         <span>
                             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36.136" viewBox="0 0 36 36.136">
                              <defs>
                                <linearGradient id="linear-gradient" x1="0.5" x2="0.514" y2="0.628" gradientUnits="objectBoundingBox">
                                  <stop offset="0" stop-color="#103c58"/>
                                  <stop offset="1" stop-color="#455080"/>
                                </linearGradient>
                              </defs>
                              <g id="Group_36418" data-name="Group 36418" transform="translate(-1418.376 -241.376)">
                                <g id="Group_872" data-name="Group 872" transform="translate(1418 241)" opacity="0.114">
                                  <rect id="Rectangle_3484" data-name="Rectangle 3484" width="36" height="36" rx="5" transform="translate(0.376 0.376)" fill="url(#linear-gradient)"/>
                                  <path id="Path_12665" data-name="Path 12665" d="M230.322,838.457l2.2-2.2a2.7,2.7,0,0,1,4.1,0c2.149,2.195,9.61,9.029,9.61,9.029s0,6.022,0,6.028a2.37,2.37,0,0,1-.857,1.891Z" transform="translate(-209.857 -817.853)" fill="#7a8aaf"/>
                                  <path id="Path_12664" data-name="Path 12664" d="M200.984,838.69l9.634-9.107s2.331-2.5,4.527,0c.949,1.08,16.107,16.029,21.153,20.976a2.9,2.9,0,0,1-1.619.755H203.261a2.722,2.722,0,0,1-2.235-2.362Z" transform="translate(-200.608 -814.802)" fill="#cdd5e0"/>
                                  <ellipse id="Ellipse_595" data-name="Ellipse 595" cx="2.991" cy="2.778" rx="2.991" ry="2.778" transform="translate(23.932 5.556)" fill="#fff"/>
                                </g>
                              </g>
                            </svg>
                         </span>
                         <span class="pt-2">{{data.name}} </span>
                 </div>
                </template>
            </Column>
              <Column field="address" header="Address" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                  <template #body="{data}">
                      <div  class="truncate custome-width">{{data.address}}</div>
                  </template>
              </Column>
              <Column header="No. of Users" sortField="users" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text"> {{data.users}}</span>
                  </template>
              </Column>
               <Column header="Creation Date" sortField="date" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span class="image-text">{{ formatDate(data.date) }}</span>
                  </template>
              </Column>
              <Column style="min-width: 10rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body>
                  <div class="my-center-text">
                    <svg xmlns="http://www.w3.org/2000/svg" @click.prevent="showConsole()" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
              </template>
            </Column>
            </span>

    </DataTable>
</template>
<script>
import { ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useStore } from "vuex";
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { useClientUser } from "@/components/composition/clientHelper.js";

import NavBarItem from "@/components/NavBarItem";
import NavBarItemLabel from "@/components/NavBarItemLabel";
import NavBarMenu from "@/components/NavBarMenu";
import NavBarMenuDivider from "@/components/NavBarMenuDivider";
import UserAvatar from "@/components/UserAvatar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Icon from "@/components/Icon";

export default {
    components:{
        DataTable,
        Menu,
        Column,
        Button,
    UserAvatar,
    NavBarMenu,
    NavBarItem,
    NavBarItemLabel,
    NavBarMenuDivider,
    LanguageSwitcher,
    Icon,
    },
    emits:['rowClicked'],

    props:{
        first:{
          type: Number,
          default: 0
        },
        clientName:{
          type: String,
          default: ''
        },
        customers:{
            type: Array,
            default: []
        },
        image:{
            type: Boolean,
            default: false
        },
        paginatorTemplate: {
            type: String,
        },
        paginator:{
            type: Boolean,
            default: false
        },
        rows:{
            type: Number,
            default: null
        },
        sortTable:{
          type: Boolean,
          default: true
        },
        rowHover:{
            type: Boolean,
            default: true
        },
        loading:{
            type: Boolean,
            default: false
        },
        rowsPerPageOptions:{
            type: Array,
            default: null
        },
        defaultText:{
            type: String,
            default: 'record'
        },
        tableType:{
          type: String,
          default: 'users'
        }

    },
    setup(props, {emit}) {
       const store = useStore();
       const { userTypes, formatDate, tableStatePersistence } = useClientUser();

       const menu = ref();

      // const paginationChanged = (event)=>{
      //   const data = {
      //     page: event.page,
      //     pageCount: event.pageCount,
      //     first: event.first
      //   }

      //   store.commit("clientControl/setUsersTablePag",data)
      // }

      const items = ref([
				{
					label: 'Request to Correct Credit Update'
				}
			])

       const toggle = (event, data) => {
            emit("rowData", data)
            menu.value.toggle(event);
        };
        const save = () => {
            // toast.add({severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000});
        };

        const showConsole = ()=>{

        }

        const dt = ref();
        const exportCSV = () => {
            dt.value.exportCSV();
        };


        return {
            showConsole,
            toggle,
            save,
            menu,
            dt,
            items,
            exportCSV,
            tableStatePersistence,
            formatDate,
            userTypes
        }
    },
}
</script>
<style lang="scss">
.p-datatable-wrapper{
  margin-top: 20px;
}
.fixedheader .p-datatable-thead tr{
    position: fixed;
    width: calc(100% - 305px)  !important;
}
.fixedheader .p-datatable-tbody{
  margin-top: 57px;
}

.fixedheader .p-paginator{
  position: sticky !important;
  inset-block-end: 0 !important;
}

.sticky-header-footer .p-paginator{
  position: sticky !important;
  inset-block-end: 0 !important;
}

.custome-width{
    width: 160px;
}

::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;
  .p-progressbar-value {
    background-color: #607d8b;
  }
}
::v-deep(.p-datepicker) {
  min-width: 25rem;
  td {
    font-weight: 400;
  }
}
::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }
  .p-paginator {
    padding: 1rem;
  }
  .p-datatable-thead > tr > th {
    text-align: left;
  }
  .p-datatable-tbody > tr > td {
    cursor: auto;
  }
}

.my-center-text {
    width: 100%;
}
.my-center-text > svg{
    float: right;
}

.truncate > div {
    white-space:pre-wrap;
    word-wrap:break-word;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
.menu-position {
  position: absolute;
  top: -64px;
  left: 122px;
  max-height: 100;
  overflow: auto;
}
</style>
