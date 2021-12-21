<template>
  <div class="px-8">
    <sticky-header>
      <h1 class="mb-8 text-2xl font-normal leading-tight">Client Control</h1>
      <div class="grid main-grid md:grid-cols-2">
        <!-- left section -->
        <div class="mb-2">
          <psytech-button
            @buttonWasClicked="
              $router.push({ name: 'client-control-create-client' })
            "
            label="Create New Client Account"
            type="outline"
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
        <div class="flex justify-end xs:flex-col">
          <div>
            <div class="relative inline-block dropdown">
              <psytech-button
                label="Filter"
                type="outline"
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
                class="absolute w-24 text-gray-700 bg-white rounded-md shadow top-14 -left-16 dropdown-menu"
                style="padding: 16px 15px"
                id="filter-dropdown"
                v-if="showFilters"
                v-click-away="closeFilter"
              >
                <li class="flex">
                  <field
                    label="Name"
                    labelFor="account"
                    :applyExtraInputClass="true"
                  >
                    <control
                      v-model="accountName"
                      type="text"
                      id="name"
                      placeholder=" "
                      @enterPressed="applyFilter()"
                    />
                  </field>
                  <select-option
                    :filterDropdown="filterDropdown"
                    v-model="selectedNameFilter"
                  ></select-option>
                  <!-- <field label="Filter Type" labelFor="filterType" :applyExtraSelectClass="true">
                    <control :options="filterDropdown" type="select" v-model="selectedNameFilter" />
                  </field> -->
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(accountName = ''), applyFilter()"
                    />
                  </div>
                </li>

                <li class="flex">
                  <field
                    label="Address"
                    labelFor="address"
                    :applyExtraInputClass="true"
                  >
                    <control
                      v-model="searchedaddress"
                      type="text"
                      id="address"
                      placeholder=" "
                      @enterPressed="applyFilter()"
                    />
                  </field>

                  <select-option
                    :filterDropdown="filterDropdown"
                    v-model="selectedaddressFilter"
                  ></select-option>

                  <!-- <field label="Filter Type" labelFor="filterType" :applyExtraSelectClass="true">
                    <control :options="filterDropdown" type="select" v-model="selectedaddressFilter" />
                  </field> -->
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(searchedaddress = ''), applyFilter()"
                    />
                  </div>
                </li>

                <li class="flex">
                  <field
                    label="Users"
                    labelFor="users"
                    :applyExtraInputClass="true"
                  >
                    <control
                      v-model="searchedUsers"
                      type="text"
                      id="users"
                      placeholder=" "
                      @enterPressed="applyFilter()"
                    />
                  </field>

                  <select-option
                    :filterDropdown="numberDropdown"
                    v-model="selectedUsersFilter"
                  ></select-option>

                  <!-- <field label="Filter Type" labelFor="filterType" :applyExtraSelectClass="true">
                    <control :options="filterDropdown" type="select" v-model="selectedUsersFilter" />
                  </field> -->
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(searchedUsers = ''), applyFilter()"
                    />
                  </div>
                </li>
                <li class="flex justify-between">
                  <div class="flex items-center justify-center ml-3">
                    <a
                      @click.prevent="clearFilter()"
                      class="text-xs font-semibold no-underline text-psytechBlue"
                      >Clear all</a
                    >
                  </div>
                  <psytech-button
                    label="Apply"
                    @buttonWasClicked="applyFilter"
                  ></psytech-button>
                </li>
              </ul>
            </div>
          </div>

          <!-- search -->
          <div class="relative pt-2 text-gray-600">
            <input
              class="h-10 px-5 pr-16 font-bold text-gray-700 bg-white border-gray-300 rounded-full border-1 focus:outline-none focus:ring-psytechBlueBtHover"
              type="search"
              name="search"
              placeholder="Search..."
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
    <div class="fixedheader">
      <DataTable
          :customers="customers"
          :paginator="true"
          :rows="50"
          :rowHover="true"
          :loading="loading"
          :rowsPerPageOptions="[10, 25, 50]"
          @rowClicked="redirectToDetail($event)"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      />
    </div>


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
            <Column field="address" header="address Address" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <span class="image-text">{{data.address}}</span>
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
import InputText from "primevue/inputtext";
import DataTable from "@/components/Table.vue";
import Calendar from "primevue/calendar";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import Datepicker from "vue3-datepicker";
import PsytechButton from "@/components/PsytechButton";
import StickyHeader from "@/components/StickyHeader";
import IconSVG from "@/components/IconSVG.vue";
import SelectOption from "@/components/SelectOption.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "demoTable",
  components: {
    InputText,
    DataTable,
    SelectOption,
    Control,
    IconSVG,
    Calendar,
    Datepicker,
    Field,
    PsytechButton,
    StickyHeader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const customers = ref();
    let prevCustomers = ref();
    let prevSearched = ref();
    let searchText = ref("");
    let accountName = ref("");
    let searchedaddress = ref("");
    let searchedUsers = ref("");
    let selectStatus = ref("");
    let selectedNameFilter = ref("contains");
    let selectedaddressFilter = ref("contains");
    let selectedUsersFilter = ref("isEqualTo");
    let prevMainSearchHistry = ref("");
    let showFilters = ref(false);
    const form = reactive({
      name: "",
      address: "",
    });
    onMounted(() => {
      store
        .dispatch("clientControl/getClientAccount")
        .then((res) => {
          let responseArray = res?.data?.data;
          customers.value = responseArray;
          customers.value.forEach(
            (customer) => (
              (customer.date = new Date(customer.creationDate)),
              (customer.name = customer.accountName),
              (customer.address = customer.accountAddress),
              (customer.users = customer.numberOfUsers)
            )
          );
          prevCustomers.value = customers.value;
          loading.value = false;
        })
        .catch((error) => {
          console.log("error is...", error);
        });
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

    const numberDropdown = reactive([
      {
        text: "Is equal to",
        value: "isEqualTo",
      },
      {
        text: "Is not equal to",
        value: "isNotEqualTo",
      },
      {
        text: "Is less than",
        value: "lessThen",
      },
      {
        text: "Is greater than",
        value: "greaterThen",
      },
    ]);
    const selectedFilter = ref("contains");

    //   const toast = useToast();

    const selectedCustomers = ref();
    const loading = ref(true);

    const clearFilter = () => {
      searchText.value = "";
      accountName.value = "";
      searchedaddress.value = "";
      searchedUsers.value = "";
      customers.value = prevCustomers.value;
      prevSearched.value = [];
    };

    const subFilter = (item, value, filter) => {
      const selectedFilter = filter;
      if (typeof value == "number" || typeof value == "string") {
        if (selectedFilter == "isNotEqualTo") {
          return item != value;
        } else if (selectedFilter == "isEqualTo") {
          return item == value;
        } else if (selectedFilter == "lessThen") {
          return item < value;
        } else if (selectedFilter == "greaterThen") {
          return item > value;
        }
      }
      if (typeof value == "string") {
        if (selectedFilter == "contains") {
          return item.includes(value);
        } else if (selectedFilter == "startsWith") {
          return item.startsWith(value);
        } else if (selectedFilter == "endsWith") {
          return item.endsWith(value);
        } else if (selectedFilter == "notContain") {
          return !item.includes(value);
        }
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
      if (searchedaddress.value) {
        filteredData = filteredData.filter((val) => {
          if (
            !val.address && searchedaddress.value
              ? false
              : !!(searchedaddress.value
                  ? subFilter(
                      val.address.toLowerCase(),
                      searchedaddress.value.toLowerCase().trim(),
                      selectedaddressFilter.value
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
            !val.users && val.users != 0 && searchedUsers.value
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
      customers.value = filteredData;
      prevSearched.value = filteredData;
    };
    const filterMethod = (data, value) => {
      return data.filter(function (customer) {
        return (
          customer.name.toLowerCase().indexOf(value) > -1 ||
          customer.address.toLowerCase().indexOf(value) > -1 ||
          customer.users == value
        );
      });
    };
    const filteredMainMethod = () => {
      // var sortKey = this.sortKey
      let value = searchText.value && searchText.value.toLowerCase();
      // Search  field is blank but dropdown filters have value, JUST go for dropdown filters
      if (!searchText.value) {
        prevMainSearchHistry.value = [];
        applyFilter();
        return;
      }
      // fileds to be check for filters
      if (searchedUsers.value || accountName.value || searchedaddress.value) {
        customers.value = filterMethod(prevSearched.value, value);
      } else {
        // default, When no filters is applied
        customers.value = filterMethod(prevCustomers.value, value);
        prevMainSearchHistry.value = customers.value;
      }
    };

    const closeFilter = () => {
      if (showFilters.value) {
        showFilters.value = false;
      }
    };

    const redirectToDetail = (e) => {
      store.commit("clientControl/setClientDetail", e.data);
      router.push({ name: "client-control-list-detail" });
    };

    return {
      customers: customers,
      loading,
      selectedCustomers,
      closeFilter,
      selectStatus,
      prevMainSearchHistry,
      filteredMainMethod,
      searchText,
      prevSearched,
      accountName,
      pickedDate,
      numberDropdown,
      showFilters,
      form,
      searchedaddress,
      searchedUsers,
      redirectToDetail,
      selectedUsersFilter,
      selectedNameFilter,
      selectedaddressFilter,
      applyFilter,
      clearFilter,
      dropdownFilters,
      selectedFilter,
      filterDropdown,
    };
  },
};
</script>

<style lang="scss" scoped>
.stick-header{
  margin-top: -7px;
}
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
input[type="search" i]:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-search-cancel-button {
  cursor: pointer;
}
</style>
