<template>
    <div>
        <Toolbar>
            <template #start>
                <Button label="New" icon="pi pi-plus" class="p-mr-2" />
            </template>

            <template #end>
                <span class="p-input-icon-left p-input-icon-right">
                    <i class="pi pi-search" />
                    <InputText type="text" v-model="value3" />
                    <!-- <i class="pi pi-spin pi-spinner" /> -->
                </span>

                <Button icon="pi pi-times" class="p-button-danger" />
            </template>
        </Toolbar>
        <DataTable :value="customers" :paginator="true" class="p-datatable-customers" :rows="10"
            dataKey="id" :rowHover="true" v-model:selection="selectedCustomers" v-model:filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['name','country.name','representative.name','status']" responsiveLayout="scroll">
            <!-- <template #header>
                 <div class="p-d-flex p-jc-between p-ai-center">
                    <h5 class="p-m-0">Customers</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                 </div>
            </template> -->
            <template #empty>
                No customers found.
            </template>
            <template #loading>
                Loading customers data. Please wait.
            </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="name" header="Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.name}}
                </template>
            </Column>
            <Column field="country.name" header="Country" sortable filterMatchMode="contains" style="min-width: 14rem">
                <template #body="{data}">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" style="vertical-align: middle" />
                    <span class="image-text">{{data.country.name}}</span>
                </template>
            </Column>
            <Column header="Agent" sortable filterField="representative" sortField="representative.name" :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width: 14rem">
                 <template #body="{data}">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" style="vertical-align: middle" />
                    <span class="image-text">{{data.representative.name}}</span>
                </template>
            </Column>
            <Column field="date" header="Date" sortable dataType="date" style="min-width: 8rem">
                <template #body="{data}">
                    {{formatDate(data.date)}}
                </template>
            </Column>
            <Column field="balance" header="Balance" sortable dataType="numeric" style="min-width: 8rem">
                <template #body="{data}">
                    {{formatCurrency(data.balance)}}
                </template>
            </Column>
            <Column field="status" header="Status" sortable :filterMenuStyle="{'width':'14rem'}" style="min-width: 10rem">
                <template #body="{data}">
                    <span :class="'customer-badge status-' + data.status">{{data.status}}</span>
                </template>
            </Column>
            <Column field="activity" header="Activity" sortable style="min-width: 10rem">
                <template #body="{data}">
                    <ProgressBar :value="data.activity" :showValue="false" />
                </template>
            </Column>
            <Column headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body>
                    <Button type="button" icon="pi pi-cog"></Button>
                </template>
            </Column>
        </DataTable>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import CustomerService from './service/CustomeService'
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from 'primevue/inputtext';
// import MultiSelect from 'primevue/MultiSelect';
import InputNumber from 'primevue/inputnumber';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Dropdown from 'primevue/dropdown'; 
import MultiSelect from 'primevue/multiselect';  
import Toolbar from 'primevue/toolbar';  

// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';

export default {
  components:{
    InputText,
    InputNumber,
    Dropdown,
    ProgressBar,
    Slider,
    Toolbar,
    Button,
    DataTable,
    Column,
    MultiSelect,
    ColumnGroup
  },
    setup() {
        onMounted(() => {
            customerService.value.getCustomersLarge().then((data) => {
                customers.value = data;
                customers.value.forEach(
                    (customer) => (customer.date = new Date(customer.date))
                );
                loading.value = false;
            });
        });
        const customers = ref();
        const selectedCustomers = ref();
        const filters = ref({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            "country.name": {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
            },
            balance: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            status: {
                operator: FilterOperator.OR,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS },
        });
        const customerService = ref(new CustomerService());
        const loading = ref(true);
        const representatives = [
            { name: "Amy Elsner", image: "amyelsner.png" },
            { name: "Anna Fali", image: "annafali.png" },
            { name: "Asiya Javayant", image: "asiyajavayant.png" },
            { name: "Bernardo Dominic", image: "bernardodominic.png" },
            { name: "Elwin Sharvill", image: "elwinsharvill.png" },
            { name: "Ioni Bowcher", image: "ionibowcher.png" },
            { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
            { name: "Onyama Limba", image: "onyamalimba.png" },
            { name: "Stephen Shaw", image: "stephenshaw.png" },
            { name: "XuXue Feng", image: "xuxuefeng.png" },
        ];
        const statuses = ref([
            "unqualified",
            "qualified",
            "new",
            "negotiation",
            "renewal",
            "proposal",
        ]);
        const formatDate = (value) => {
            return value.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        };
        const formatCurrency = (value) => {
            return value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        };
        return {
            customers,
            filters,
            loading,
            representatives,
            formatCurrency,
            selectedCustomers,
            formatDate,
            statuses,
        };
    }
};
</script>

<style lang="scss" scoped>
img {
    vertical-align: middle;
}
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
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

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>