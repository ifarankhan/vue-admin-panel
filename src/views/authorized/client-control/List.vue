<template>
  <div class="px-8 mt-1">
    <sticky-header>
      <h1 class="mb-8 text-2xl font-normal leading-tight">Client Control</h1>
      <div class="flex justify-between">
        <!-- left section -->
        <div>
          <psytech-button
          @buttonWasClicked="$router.push({name:'client-control-create-client'})"
          label="Create New Client Account"
          buttonWithIcon="inline-flex items-center px-4 py-2 font-bold text-gray-700 border-2 border-gray-300 border-solid rounded rounded-full bg-transparent-300 hover:text-white hover:opacity-50 hover:border-psytechBlue hover:bg-psytechBlue"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </psytech-button>
          <!-- Create New Client Account -->
        </div>

        <!-- Right Section -->
        <div class="flex">
          <div class="p-2">
            <div class="relative inline-block dropdown">
              <psytech-button
                label="Filter"
                buttonWithIcon="inline-flex items-center px-4 py-2 font-bold text-gray-700 border-2 border-gray-300 border-solid rounded rounded-full bg-transparent-300 hover:text-white hover:opacity-50 hover:border-psytechBlue hover:bg-psytechBlue"
                @buttonWasClicked="showFilters = !showFilters"
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
              </psytech-button>
              <ul
                  class="absolute text-gray-700 bg-white rounded-md shadow top-12 -left-48 dropdown-menu"
                  style="min-width: 465px; padding: 16px 15px;"
                  id="filter-dropdown"
                  v-if="showFilters"
              >
                <li class="flex">
                  <field label="Name" labelFor="account" :applyExtraInputClass="true">
                    <control v-model="accountName" type="text" id="name" placeholder=" " />
                  </field>

                  <field label="Filter Type" labelFor="filterType" :applyExtraSelectClass="true">
                    <control :options="filterDropdown" type="select" v-model="selectedNameFilter" />
                  </field>
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG @iconWasClicked="(accountName=''),applyFilter()" />
                  </div> 
                </li>

                <li class="flex">
                  <field label="Email" labelFor="email" :applyExtraInputClass="true" >
                    <control v-model="searchedEmail" type="text" id="email" placeholder=" " />
                  </field>

                  <field label="Filter Type" labelFor="filterType" :applyExtraSelectClass="true">
                    <control :options="filterDropdown" type="select" v-model="selectedEmailFilter" />
                  </field>
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG @iconWasClicked="(searchedEmail=''),applyFilter()" />
                  </div>
                </li>

                <li class="flex">
                  <field label="Users" labelFor="users" :applyExtraInputClass="true">
                    <control v-model="searchedUsers" type="text" id="users" placeholder=" " />
                  </field>

                  <field label="Filter Type" labelFor="filterType" :applyExtraSelectClass="true">
                    <control :options="filterDropdown" type="select" v-model="selectedUsersFilter" />
                  </field>
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG @iconWasClicked="(searchedUsers=''),applyFilter()" />
                  </div>
                </li>
                <li class="flex justify-between">
                  <div class="flex items-center justify-center ml-3">
                    <a @click.prevent="clearFilter()" class="text-xs font-semibold no-underline text-psytechBlue">Clear all</a>
                  </div>
                  <psytech-button label="Apply" @buttonWasClicked="applyFilter"></psytech-button>
                </li>
              </ul>
            </div>
          </div>

          <!-- search -->
          <div class="relative pt-2 mx-auto text-gray-600">
            <input
              class="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-full focus:outline-none"
              type="search..."
              name="search"
              placeholder="Search"
              v-model="searchText"
              @input="filteredMainMethod()"
            />
            <button type="submit" class="absolute top-0 right-0 mt-5 mr-4">
              <svg
                class="w-4 h-4 text-gray-600 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style="enable-background: new 0 0 56.966 56.966"
                xml:space="preserve"
                width="512px"
                height="512px"
              >
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                />
              </svg>
            </button>
          </div>
          <!-- end search -->
        </div>
      </div>
    </sticky-header>

    <br />
    <DataTable
      :customers="customers"
      :paginator="true"
      :rows="10"
      :rowHover="true"
      :loading="loading"
      :rowsPerPageOptions="[10, 25, 50]"
    />

    <!-- <DataTable :value="customers" :paginator="true" class="p-datatable-customers" :rows="10"
            dataKey="id" :rowHover="true" v-model:selection="selectedCustomers" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            responsiveLayout="scroll" :scrollable="true">
            <template #empty>
                No customers found.
            </template>
            <template #loading>
                Loading customers data. Please wait.
            </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="name" header="Account Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.name}}
                </template>
            </Column>
            <Column field="email" header="Email Address" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <span class="image-text">{{data.email}}</span>
                </template>
            </Column>
            <Column header="No. of Users" sortable sortField="users" style="min-width: 14rem">
                 <template #body="{data}">
                    <span class="image-text">{{data.users}}</span>
                </template>
            </Column>
    </DataTable> -->
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import CustomerService from "@/components/service/CustomeService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import DataTable from "@/components/Table.vue";
import Calendar from "primevue/calendar";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import InputNumber from "primevue/inputnumber";
import Slider from "primevue/slider";
import Button from "primevue/button";
import Column from "primevue/column";
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
import PsytechButton from "@/components/PsytechButton";
import StickyHeader from "@/components/StickyHeader";
import IconSVG from "@/components/IconSVG.vue";
export default {
  name: "demoTable",
  components: {
    InputText,
    DataTable,
    NavBarItem,
    NavBarMenuDivider,
    NavBarMenu,
    NavBarItemLabel,
    InputNumber,
    Control,
    IconSVG,
    Dropdown,
    Calendar,
    Slider,
    Toolbar,
    Datepicker,
    Button,
    Menubar,
    Column,
    MultiSelect,
    Menu,
    Field,
    PsytechButton,
    StickyHeader,
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
    let accountName = ref("");
    let searchedEmail = ref("");
    let searchedUsers = ref("");
    let selectStatus = ref("");
    let selectedNameFilter = ref("contains");
    let selectedEmailFilter = ref("contains");
    let selectedUsersFilter = ref("isEqualTo");
    let prevMainSearchHistry = ref("");
    let showFilters = ref(false);
    const form = reactive({
      name: "",
      email: "",
    });
    const pickedDate = ref(new Date());
    const dropdownFilters = reactive({
      users: "",
    });
    const filterDropdown = reactive([
      {
        text: "Is equal to",
        value: "isEqualTo",
      },
      {
        text: "Is not equal to",
        value: "isNotEqualTo",
      },
      {
        text: "Starts with",
        value: "startsWith",
      },
      {
        text: "Contains",
        value: "contains",
      },
      {
        text: "Does not contain",
        value: "notContain",
      },
      {
        text: "Ends With",
        value: "endsWith",
      },
    ]);
    const selectedFilter = ref("contains");
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
    const clearFilter = () => {
      searchText.value = "";
      accountName.value = "";
      searchedEmail.value = "";
      searchedUsers.value = "";
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

    const subFilter = (item, value, filter) => {
      const selectedFilter = filter;
      if (selectedFilter == "contains" && typeof value == "string") {
        return item.includes(value);
      } else if (selectedFilter == "startsWith" && typeof value == "string") {
        return item.startsWith(value);
      } else if (selectedFilter == "endsWith" && typeof value == "string") {
        return item.endsWith(value);
      } else if (
        selectedFilter == "isNotEqualTo" &&
        (typeof value == "number" || typeof value == "string")
      ) {
        return item != value;
      } else if (selectedFilter == "notContain" && typeof value == "string") {
        return !item.includes(value);
      } else if (
        selectedFilter == "isEqualTo" &&
        (typeof value == "number" || typeof value == "string")
      ) {
        return item == value;
      }
    };
    const applyFilter = () => {
      let filteredData = [];
      if (searchText.value) {
        filteredData = prevMainSearchHistry.value;
      } else {
        filteredData = prevCustomers.value;
      }
      // Make sure search value has some valid value, then do filtering
      if (accountName.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.name && accountName.value
              ? false
              : accountName.value
              ? subFilter(
                  val.name.toLowerCase(),
                  accountName.value.toLowerCase().trim(),
                  selectedNameFilter.value
                )
              : true
          ) {
            return true;
          }
        });
      }
      // Make sure search value has some valid value, then do filtering
      if (searchedEmail.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.email && searchedEmail.value
              ? false
              : !!(searchedEmail.value
                  ? subFilter(
                      val.email.toLowerCase(),
                      searchedEmail.value.toLowerCase().trim(),
                      selectedEmailFilter.value
                    )
                  : true)
          ) {
            return true;
          }
        });
      }

      // Make sure search value has some valid value, then do filtering
      if (searchedUsers.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.users && searchedUsers.value
              ? false
              : !!(searchedUsers.value
                  ? subFilter(
                      +val.users,
                      +searchedUsers.value,
                      selectedUsersFilter.value
                    )
                  : true)
          ) {
            return true;
          }
        });
      }

      // CHECK wheather record is found againts applied filters
      // if (filteredData.length > 0) {
      // console.log(filteredData[0].country)
      customers.value = filteredData;
      prevSearched.value = filteredData;
      // }
    };
    const filterMethod = (data, value) => {
      return data.filter(function (customer) {
        return (
          customer.name.toLowerCase().indexOf(value) > -1 ||
          customer.email.toLowerCase().indexOf(value) > -1 ||
          customer.users == value
        );
      });
    };
    const filteredMainMethod = () => {
      // var sortKey = this.sortKey
      let value = searchText.value && searchText.value.toLowerCase();
      // Search  field is blank but dropdown filters have value, JUST gor for dropdown filters
      if (!searchText.value) {
        prevMainSearchHistry.value = [];
        applyFilter();
        return;
      }
      // fileds to be check for filters
      if (searchedUsers.value || accountName.value || searchedEmail.value) {
        customers.value = filterMethod(prevSearched.value, value);
      } else {
        // default, When no filters is applied
        customers.value = filterMethod(prevCustomers.value, value);
        prevMainSearchHistry.value = customers.value;
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
      prevMainSearchHistry,
      filteredMainMethod,
      searchText,
      prevSearched,
      accountName,
      items,
      pickedDate,
      menu,
      toggle,
      showFilters,
      save,
      form,
      searchedEmail,
      searchedUsers,
      selectedUsersFilter,
      selectedNameFilter,
      selectedEmailFilter,
      applyFilter,
      clearFilter,
      dropdownFilters,
      selectedFilter,
      selectOptions,
      filterDropdown,
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
#filter-dropdown {
  min-width: 465px; 
  padding: 16px 15px;
  box-shadow: #3755634d 0px 8px 30px;
}
</style>
