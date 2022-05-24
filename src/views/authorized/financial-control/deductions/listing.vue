<template>
  <div class="p-8">
   <sticky-header>
      <h1 class="mb-8 text-2xl font-normal leading-tight">Client Control</h1>
      <div class="grid main-grid md:grid-cols-2">
        <!-- left section -->
        <div class="mb-2">
          <psytech-button
            @buttonWasClicked="
              $router.push({ name: 'create-deduction' })
            "
            label="Create Deduction"
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
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(accountName = ''), (selectedNameFilter = 'contains'), applyFilter()"
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
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(searchedaddress = ''), (selectedaddressFilter = 'contains'), applyFilter()"
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
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                      @iconWasClicked="(searchedUsers = ''), (selectedUsersFilter = 'isEqualTo'), applyFilter()"
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
          :customers="deductions"
          tableType='deductions'
          :paginator="true"
          :rows="50"
          :rowHover="true"
          :loading="loading"
          :rowsPerPageOptions="[10, 25, 50]"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      />
    </div>

  </div>
</template>
<script>
import StickyHeader from "@/components/StickyHeader";
import PsytechButton from "@/components/PsytechButton";
import DataTable from "@/components/Table.vue";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import IconSVG from "@/components/IconSVG.vue";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
export default {
  name:"add",
  components: {
    StickyHeader,
    PsytechButton,
    DataTable,
    Control,
    IconSVG,
    Field
  } ,
   setup() {
    const store = useStore();

    onMounted(() => {
      loading.value = true;
     loadAllClients()
    });

  const deductions = ref([]);
  const loading = ref(false);
  const loadAllClients = ()=>{
    store
    .dispatch("financialControl/getDeductionList")
    .then((res) => {
      deductions.value = res.data.data;
    })
    .catch((error) => {
    }).finally(()=>{
      loading.value = false;
    });
    }

    return {
      loadAllClients,
      deductions,
      loading
    };
  },
}
</script>
