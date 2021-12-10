<template>
     <DataTable :value="customers" :paginator="paginator" class="p-datatable-customers" :rows="rows"
            dataKey="id" :rowHover="rowHover" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
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
            <Column field="name" header="Account Name" :sortable="true" style="min-width: 10rem">
                <template #body="{data}">
                    <span class=""> {{data.name}} </span>
                </template>
            </Column>
            <Column field="email" header="Address" :sortable="true" style="min-width: 10rem">
                <template #body="{data}">
                    <span class="image-text">{{data.email}}</span>
                </template>
            </Column>
            <Column header="No. of Users" sortField="users" :sortable="true" style="min-width: 10rem">
                 <template #body="{data}">
                    <span class="image-text"> {{data.users}}</span>
                </template>
            </Column>
             <Column header="Creation Date" sortField="date" style="min-width: 10rem">
                 <template #body="{data}">
                    <span class="image-text">{{ formatDate(data.date) }}</span>
                </template>
            </Column>
            <Column style="min-width: 10rem; cursor: pointer" bodyStyle="text-align:right">
              <template #body>
                  <div class="my-center-text">
                    <svg xmlns="http://www.w3.org/2000/svg" @click="showConsole()" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        paginator:{
            type: Boolean,
            default: true
        },
        rows:{
            type: Number,
            default: 10
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
            default: [10,25,50]
        },
        defaultText:{
            type: String,
            default: 'record'
        }
    },
    setup() {
        const showConsole = (e)=>{
            console.log("clicked",e.data)
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
<style lang="scss" scoped>
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
</style>
