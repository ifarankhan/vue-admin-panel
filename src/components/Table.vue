 <template>
     <DataTable :value="customers" :paginator="paginator" class="p-datatable-customers" :rows="rows"
            @page="paginationChanged($event)"
            dataKey="id" :rowHover="rowHover" :loading="loading"
            :paginatorTemplate="paginatorTemplate"
            :rowsPerPageOptions="rowsPerPageOptions"
            :first="first"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            responsiveLayout="scroll" :scrollable="true"
            @row-click="paginatorUser,$emit('rowClicked', $event)">
            <template #empty>
                No {{ defaultText }} found.
            </template>
            <template #loading>
                Loading {{ defaultText }} data. Please wait.
            </template>
            <span v-if="tableType=='accountUsers'">
              <Column field="firstName" header="First Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div>
                         <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> </span>
                         <span>{{data.firstName}} </span>
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
              <Column field="transferDate" header="Date" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.transferDate?.split("T")[0] }}</span>
                </template>
              </Column>
              <Column field="transferDate" header="Time" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.transferDate?.split("T")[1]?.split("Z")[0]}} </span>
                </template>
              </Column>
              <Column field="amount" header="Credit Requested" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column header="Email" sortField="email" :sortable="sortTable" style="min-width: 20rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.email }}</span>
                  </template>
              </Column>
                <Column field="accountName" header="Account Name" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <div>{{data.accountName}}</div>
                  </template>
              </Column>
               <Column header="firstName" sortField="First Name" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.firstName }}</span>
                  </template>
              </Column>
              <Column header="familyName" sortField="Family Name" :sortable="sortTable" style="min-width: 5rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.familyName }}</span>
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

             <span v-if="tableType=='creditTableSecond'">
              <Column field="email" header="Email" :sortable="sortTable" style="min-width: 15rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.email }}</span>
                </template>
              </Column>
              <Column field="purchaseID" header="purchase ID" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.purchaseID}} </span>
                </template>
              </Column>
              <Column field="currentCredits" header="Current Credits" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <span>{{ data.currentCredits }}</span>
                  </template>
              </Column>
              <Column field="requestAmount" header="Requested Amount" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.requestAmount }}</span>
                  </template>
              </Column>
               <Column field="updateDate" header="Update Date" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.updateDate.split(" ")[0] }}</span>
                  </template>
              </Column>
              <Column field="dateOfUpdate" header="Date Of Update" :sortable="sortTable" style="min-width: 13rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.dateOfUpdate.split("T")[0] }}</span>
                  </template>
              </Column>
              <Column field="firstName" header="First Name" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.firstName }}</span>
                  </template>
              </Column>
                <Column field="Family Name" header="familyName" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.familyName }}</span>
                  </template>
              </Column>
              <Column style="min-width: 5rem; cursor: pointer" bodyStyle="text-align:right">
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

             <span v-if="tableType=='creditTableThird'">
              <Column field="email kkk" header="Email" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <span>{{ data?.email }}</span>
                </template>
              </Column>
              <Column field="purchaseID" header="purchase ID" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                   <span>{{data?.purchaseID}} </span>
                </template>
              </Column>
              <Column field="accountName" header="Account Name" :sortable="sortTable" style="min-width: 15rem; cursor: pointer">
                  <template #body="{data}">
                      <span>{{ data.accountName }}</span>
                  </template>
              </Column>
              <Column header="psytechComment" sortField="Psytech Comment" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.psytechComment }}</span>
                  </template>
              </Column>
               <Column header="amount" sortField="Amount" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column header="amount" sortField="Amount" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.amount }}</span>
                  </template>
              </Column>
              <Column header="creditsBefore" sortField="Credits Before" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.creditsBefore }}</span>
                  </template>
              </Column>
              <Column header="firstName" sortField="First Name" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.firstName }}</span>
                  </template>
              </Column>
                <Column header="Family Name" sortField="familyName" :sortable="sortTable" style="min-width: 12rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.familyName }}</span>
                  </template>
              </Column>
               <Column header="Operator" sortField="operator" :sortable="sortTable" style="min-width: 10rem; cursor: pointer">
                   <template #body="{data}">
                      <span>{{ data.operator }}</span>
                  </template>
              </Column>
              <Column style="min-width: 5rem; cursor: pointer" bodyStyle="text-align:right">
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

            <span v-if="tableType =='users'">
              <Column field="name" header="Account Name" :sortable="sortTable" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div class="truncate custome-width">
                         <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> </span>
                         <span>{{data.name}} </span>
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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useStore } from "vuex";
import { useClientUser } from "@/components/composition/clientHelper.js";

export default {
    components:{
        DataTable,
        Column
    },
    emits:['rowClicked'],
    props:{
        first:{
          type: Number,
          default: 0
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
    setup() {
       const store = useStore();
       const { userTypes, formatDate } = useClientUser();

       const showConsole = (e)=>{
            // console.log("clicked",e.data)
        }

      const paginationChanged = (event)=>{
        const data = {
          page: event.page,
          pageCount: event.pageCount,
          first: event.first
        }

        store.commit("clientControl/setUsersTablePag",data)

      }

        return {
            showConsole,
            paginationChanged,
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
</style>
