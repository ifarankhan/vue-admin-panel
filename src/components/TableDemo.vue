<template>
<div>
   <!-- <field label="Email" labelFor="email">
        <control v-model="form.name" type="email" id="email" placeholder="Email" />
   </field>

    <div class="p-2 mb-6 last:mb-0">
      <div class="relative">
        <select
          class="w-full h-12 max-w-full px-3 py-2 text-xs bg-white border-2 border-gray-700 rounded focus:ring-transparent border-psytechBlueDark dark:placeholder-gray-400 dark:bg-gray-800"
        >
          <option>No of users</option>
          <option>Marketing</option>
          <option>Sales</option>
        </select>
      </div>
    </div> -->

   <form class="w-full">
    <!-- <div class="relative mb-5 floating-input">
        <input type="email" id="email" class="w-full h-16 p-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-500 focus:shadow-sm" placeholder="name@example.com" autocomplete="off" />
        <label for="email" class="absolute top-0 left-0 h-full px-3 py-5 transition-all duration-100 ease-in-out origin-left transform pointer-events-none ">Email address</label>
    </div> -->
    <div class="relative mb-5 floating-input">
        <input type="password" id="password" class="w-full h-16 p-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-500 focus:shadow-sm" placeholder="password" autocomplete="off" />
        <label for="password" class="absolute top-0 left-0 h-full px-3 py-5 transition-all duration-100 ease-in-out origin-left transform pointer-events-none ">Password</label>
    </div>
    <button class="w-full p-3 text-white bg-indigo-600 rounded-md">Submit</button>
</form>

    <Toolbar>
      <template #start>
        <Button label="New" icon="pi pi-plus" class="p-mr-2" />

        <button @click="firstMethod()">Apply Filter</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button @click="secondMethod()">Reset FIlter</button>
      </template>

      <template #end>
        <div class="p-10">
          <div class="relative inline-block dropdown">
            <button
              class="inline-flex items-center px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded rounded-full hover:bg-gray-400"
              @click.prevent="showFilters = !showFilters"
            >
             <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Filter</span>
            </button>
            jajkkjjk  {{ selectedFilter }}
            <ul
              class="absolute p-4 pt-1 text-gray-700 bg-white rounded-sm shadow top-11 dropdown-menu"
              style="width: 300px"
              v-if="showFilters"
            >
              <li class="flex">
                 <field label="Email" labelFor="email">
                    <control v-model="searchCountry" type="email" id="email" placeholder="Email" />
              </field>
                 <select
                      class="w-full h-12 max-w-full px-3 py-2 text-xs bg-white border-2 border-gray-700 rounded focus:ring-transparent border-psytechBlueDark dark:placeholder-gray-400 dark:bg-gray-800"
                      v-model="selectedFilter"
                    >
                      <option v-for="item in filterDropdown" :key="item.value" :value="item.value">{{ item.text }}</option>
                    </select>
              </li>
              <li>
                <div>
                  <datepicker
                    v-model="pickedDate"
                    :clearable="true"
                    :style="{
                      width: '93.5%',
                      'margin-left': '10px',
                      'border-width': '2px',
                      'border-color': '#17a9e1',
                      height: '44px',
                    }"
                  />
                </div>
              </li>
              <li>
                <div class="p-2 mb-6 last:mb-0">
                  <div class="relative">
                    <select
                      class="w-full h-12 max-w-full px-3 py-2 text-xs bg-white border-2 border-gray-700 rounded focus:ring-transparent border-psytechBlueDark dark:placeholder-gray-400 dark:bg-gray-800"
                    >
                      <option value="proposal">Proposal</option>
                      <option value="renewal">Renewal</option>
                      <option value="qualified">Qualified</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="flex">
                <button
                  class="inline-flex items-center justify-center w-11/12 p-2 mb-4 ml-3 mr-3 text-base font-semibold text-white transition duration-150 duration-200 border border-blue-600 border-none rounded-full cursor-pointer focus:outline-none whitespace-nowrap focus:ring ring-blue-700 hover:bg-blue-600 bg-psytechBlue last:mr-0 hover:bg-psytechWhite hover:text-psytechBlue"
                  type="submit"
                >
                  <span class="inline-flex px-2"> Clear all </span>
                </button>

                <button
                  class="inline-flex items-center justify-center w-11/12 p-2 mb-4 ml-3 mr-3 text-base font-semibold text-white transition duration-150 duration-200 border border-blue-600 border-none rounded-full cursor-pointer focus:outline-none whitespace-nowrap focus:ring ring-blue-700 hover:bg-blue-600 bg-psytechBlue last:mr-0 hover:bg-psytechWhite hover:text-psytechBlue"
                  type="submit"
                >
                  <span class="px-2"> apply </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <InputText
          v-model="searchText"
          placeholder="Keyword Search"
          @input="filteredData()"
        />
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
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column>
            <Column field="country.name" header="Country" sortable filterMatchMode="contains" style="min-width: 14rem">
                <template #body="{data}">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" style="vertical-align: middle" />
                    <span class="image-text">{{data.country.name}}</span>
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by country"/>
                </template>
            </Column>
            <Column header="Agent" sortable filterField="representative" sortField="representative.name" :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width: 14rem">
                 <template #body="{data}">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" style="vertical-align: middle" />
                    <span class="image-text">{{data.representative.name}}</span>
                </template>
                <template #filter="{filterModel}">
                    <div class="p-mb-3 p-text-bold">Agent Picker</div>
                    <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option">
                                <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" style="vertical-align: middle" />
                                <span class="image-text">{{slotProps.option.name}}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column>
            <Column field="date" header="Date" sortable dataType="date" style="min-width: 8rem">
                <template #body="{data}">
                    {{formatDate(data.date)}}
                </template>
                <template #filter="{filterModel}">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column field="balance" header="Balance" sortable dataType="numeric" style="min-width: 8rem">
                <template #body="{data}">
                    {{formatCurrency(data.balance)}}
                </template>
                <template #filter="{filterModel}">
                    <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="status" header="Status" sortable :filterMenuStyle="{'width':'14rem'}" style="min-width: 10rem">
                <template #body="{data}">
                    <span :class="'customer-badge status-' + data.status">{{data.status}}</span>
                </template>
                <template #filter="{filterModel}">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                        <template #value="slotProps">
                            <span :class="'customer-badge status-' + slotProps.value">{{slotProps.value}}</span>
                        </template>
                        <template #option="slotProps">
                            <span :class="'customer-badge status-' + slotProps.option">{{slotProps.option}}</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="activity" header="Activity" sortable :showFilterMatchModes="false" style="min-width: 10rem">
                <template #body="{data}">
                    <ProgressBar :value="data.activity" :showValue="false" />
                </template>
                <template #filter="{filterModel}">
                    <Slider v-model="filterModel.value" range class="p-m-3"></Slider>
                    <div class="p-d-flex p-ai-center p-jc-between p-px-2">
                        <span>{{filterModel.value ? filterModel.value[0] : 0}}</span>
                        <span>{{filterModel.value ? filterModel.value[1] : 100}}</span>
                    </div>
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
import { ref, onMounted, computed, reactive } from "vue";
import CustomerService from "./service/CustomeService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
// import MultiSelect from 'primevue/MultiS
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import InputNumber from "primevue/inputnumber";
import ProgressBar from "primevue/progressbar";
import Slider from "primevue/slider";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Toolbar from "primevue/toolbar";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Datepicker from "vue3-datepicker";

import NavBarItem from "@/components/NavBarItem";
import NavBarItemLabel from "@/components/NavBarItemLabel";
import NavBarMenu from "@/components/NavBarMenu";
import NavBarMenuDivider from "@/components/NavBarMenuDivider";

// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';

export default {
  name: "demoTable",
  components: {
    InputText,
    NavBarItem,
    NavBarMenuDivider,
    NavBarMenu,
    NavBarItemLabel,
    InputNumber,
    Control,
    Dropdown,
    ProgressBar,
    Calendar,
    Slider,
    Toolbar,
    Datepicker,
    Button,
    DataTable,
    Menubar,
    Column,
    MultiSelect,
    Menu,
    ColumnGroup,
    Field,
  },
  setup() {
    onMounted(() => {
      customerService.value.getCustomersLarge().then((data) => {
        customers.value = data;
        customers.value.forEach(
          (customer) => (customer.date = new Date(customer.date))
        );
        prevCustomers.value = customers.value;
        loading.value = false;
      });
    });
    const customers = ref();
    let prevCustomers = ref();
    let prevSearched = ref();
    let searchText = ref("");
    let searchCountry = ref("");
    let selectStatus = ref("");
    let showFilters = ref(false);
    const form = reactive({
      name:"",
      email:""
    })
    const pickedDate = ref(new Date());
    const dropdownFilters = reactive({
      users: "",
    });
    const filterDropdown = reactive([
      {
        text: "Is equal to",
        value: "isEqualTo"
      },
      {
        text: "Is not equal to",
        value: "isNotEqualTo"
      },
      {
        text: "Starts with",
        value: "startsWith"
      },
      {
        text: "Contains",
        value: "contains"
      },
      {
        text: "Does not contain",
        value: "notContain"
      },
      {
        text: "Ends With",
        value: "endsWith"
      },
    ])

    const selectedFilter = ref("contains")

    // dropdown
    const selectOptions = [
      { id: 1, label: "Business development" },
      { id: 2, label: "Marketing" },
      { id: 3, label: "Sales" },
    ];

    //   const toast = useToast();
    const menu = ref();
    const items = ref([
      {
        label: "Options",
        items: [
          {
            label: "Update",
            icon: "pi pi-refresh",
            command: () => {
              toast.add({
                severity: "success",
                summary: "Updated",
                detail: "Data Updated",
                life: 3000,
              });
            },
          },
          {
            label: "Delete",
            icon: "pi pi-times",
            command: () => {
              toast.add({
                severity: "warn",
                summary: "Delete",
                detail: "Data Deleted",
                life: 3000,
              });
            },
          },
        ],
      },
      {
        label: "Navigate",
        items: [
          {
            label: "Vue Website",
            icon: "pi pi-external-link",
            url: "https://vuejs.org/",
          },
          {
            label: "Router",
            icon: "pi pi-upload",
            command: () => {
              window.location.hash = "/fileupload";
            },
          },
        ],
      },
    ]);
    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const save = () => {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Data Saved",
        life: 3000,
      });
    };

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
    const secondMethod = () => {
      searchText.value = "";
      searchCountry.value = "";
      selectStatus.value = "";
      customers.value = prevCustomers.value;
      prevSearched.value = [];
    };

    const generateArrayMinMax = (min, max, n) => {
      let list = [min],
        interval = (max - min) / (n - 1);

      for (let i = 1; i < n - 1; i++) {
        list.push(min + interval * i);
      }
      list.push(max);
      console.log(list); // prevent floating point arithmetic errors
      //    return list;
    };

    const subFilter = (item, value)=>{
        if(selectedFilter == 'contains'){
          return item.toLowerCase().includes(value)
        } else if(selectedFilter == 'startsWith'){
          return item.startsWith(value)
        } else if(selectedFilter == 'endsWith'){
           return item.endsWith(value)
        } else if(selectedFilter == 'isNotEqualTo'){
          return item != value
        } else if(selectedFilter == 'notContain'){
          console.log("kkkk")
          return !!(item.match(value) )
        } else if(selectedFilter == 'isEqualTo'){
          return item == value
        }
    }

    const firstMethod = () => {
      // console.log("clicked")
      let filteredData = prevCustomers.value;

      // Mkae sure search value has some valid value, then do filtering
      if (searchCountry.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.country.name && searchCountry.value
              ? false
              : !!(searchCountry.value
                  ?subFilter(val.country.name
                      .toLowerCase(),
                      searchCountry.value.toLowerCase().trim())
                  : true)
          ) {
            return true;
          }
        });
      }

      // Make sure search value has some valid value, then do filtering
      if (selectStatus.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.status && selectStatus.value
              ? false
              : !!(selectStatus.value
                  ? val.status
                      .toLowerCase()
                      .includes(selectStatus.value.toLowerCase().trim())
                  : true)
          ) {
            return true;
          }
        });
      }

      // CHECK wheather record is found againts applied filters
      if (filteredData.length > 0) {
        customers.value = filteredData;
        prevSearched.value = filteredData;
      }
    };

    const filterMethod = (data, value) => {
      return data.filter(function (customer) {
        return (
          customer.name.toLowerCase().indexOf(value) > -1 ||
          customer.country.name.toLowerCase().indexOf(value) > -1 ||
          customer.representative.name.toLowerCase().indexOf(value) > -1
        );
      });
    };

    const filteredData = () => {
      // var sortKey = this.sortKey
      let value = searchText.value && searchText.value.toLowerCase();
      // Search  field is blank but dropdown filters have value, JUST gor for dropdown filters
      if (!searchText.value) {
        firstMethod();
        return;
      }

      // fileds to be check for filters
      if (selectStatus.value || searchCountry.value) {
        customers.value = filterMethod(prevSearched.value, value);
      } else {
        // default, When no filters is applied
        customers.value = filterMethod(prevCustomers.value, value);
      }
    };

    return {
      customers: customers,
      filters,
      loading,
      representatives,
      formatCurrency,
      selectedCustomers,
      formatDate,
      statuses,
      selectStatus,
      filteredData,
      searchText,
      prevSearched,
      searchCountry,
      items,
      pickedDate,
      menu,
      toggle,
      showFilters,
      save,
      form,
      firstMethod,
      secondMethod,
      dropdownFilters,
      selectedFilter,
      selectOptions,
      filterDropdown
    };
  },
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

.dropdown .dropdown-menu {
  z-index: 1000;
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

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}
.floating-input>input::placeholder {
    color: transparent;
}

.floating-input>input:focus,
.floating-input>input:not(:placeholder-shown) { 
@apply pt-8
}

.floating-input>input:focus~label, 
.floating-input>input:not(:placeholder-shown)~label {
  @apply opacity-75 scale-75 -translate-y-3 translate-x-1; 
}
</style>