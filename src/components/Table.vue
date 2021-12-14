<template>
     <DataTable :value="customers" :paginator="paginator" class="p-datatable-customers" :rows="rows"
            dataKey="id" :rowHover="rowHover" :loading="loading"
            :paginatorTemplate="paginatorTemplate"
            :rowsPerPageOptions="rowsPerPageOptions"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            responsiveLayout="scroll" :scrollable="true"
            @row-click="$emit('rowClicked', $event)">
            <template #empty>
                No {{ defaultText }} found.
            </template>
            <template #loading>
                Loading {{ defaultText }} data. Please wait.
            </template>
            <Column field="name" header="Account Name" :sortable="true" style="min-width: 10rem;cursor: pointer">
                <template #body="{data}">
                    <div class="truncate custome-width">
                         <span v-if="image"> <img class="inline-block w-6 h-6 mr-1 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> </span>
                         <span>{{data.name}} </span>
                 </div>
                </template>
            </Column>
            <Column field="address" header="Address" :sortable="true" style="min-width: 10rem; cursor: pointer">
                <template #body="{data}">
                    <div  class="truncate custome-width">{{data.address}}</div>
                </template>
            </Column>
            <Column header="No. of Users" sortField="users" :sortable="true" style="min-width: 10rem; cursor: pointer">
                 <template #body="{data}">
                    <span class="image-text"> {{data.users}}</span>
                </template>
            </Column>
             <Column header="Creation Date" sortField="date" :sortable="true" style="min-width: 10rem; cursor: pointer">
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
    </DataTable>
</template>
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { onMounted } from 'vue';
export default {
    components:{
        DataTable,
        Column
    },
    emits:['rowClicked'],
    props:{
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
        }
    },
    setup() {
        const showConsole = (e)=>{
            // console.log("clicked",e.data)
        }

        const formatDate = (value) => {
            return value.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
        }

        return {
            showConsole,
            formatDate
        }
    },
}
</script>
<style lang="scss">
.p-datatable-wrapper{
  margin-top: 20px;
}
.p-datatable-thead tr{
    position: fixed;
    width: calc(100% - 305px)  !important;
}
.p-datatable-tbody{
  margin-top: 57px;
}

@media screen and (max-width: 1024px) {
  .p-datatable-thead tr{
     width: calc(100% - 305px)  !important;
    }
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
