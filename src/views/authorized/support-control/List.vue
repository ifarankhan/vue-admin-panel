<template>
  <Loader v-if="loader" :toBeBigger="true" />
  <div class="px-8" v-if="!alreadyMember">
    <div class="flex flex-col items-center justify-center" style="height: 60vh">
      <div>
        <h1 class="mt-6 mb-8 ml-3 text-2xl font-normal leading-tight">
        </h1>
      </div>
      <div>
        <psytech-button
          label="Click here to start creating & tracking your tickets"
          type="outline"
          @buttonWasClicked="createNewCompany"
        >
        </psytech-button>
      </div>
    </div>
  </div>
  <div class="px-8" v-else>
    <sticky-header>
      <h1 class="mt-6 mb-8 ml-3 text-2xl font-normal leading-tight">
        Support System
      </h1>
      <div class="grid main-grid md:grid-cols-2">
        <!-- left section -->
        <div class="mb-2">
          <psytech-button
            @buttonWasClicked="showCreateTicketDialog = true"
            label="Create Ticket"
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
                      label="Status"
                      labelFor="account"
                      :applyExtraInputClass="true"
                  >
                    <control
                        v-model="searcheStatus"
                        type="text"
                        id="name"
                        placeholder=" "
                        @enterPressed="applyFilter()"
                    />
                  </field>
                  <select-option
                      :filterDropdown="filterDropdown"
                      v-model="selectedStatusFilter"
                  ></select-option>
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                        @iconWasClicked="(searcheStatus = ''), applyFilter()"
                    />
                  </div>
                </li>

                <li class="flex">
                  <field
                      label="Priority"
                      labelFor="account"
                      :applyExtraInputClass="true"
                  >
                    <control
                        v-model="searchedPrority"
                        type="text"
                        id="name"
                        placeholder=" "
                        @enterPressed="applyFilter()"
                    />
                  </field>
                  <select-option
                      :filterDropdown="filterDropdown"
                      v-model="selectedProrityFilter"
                  ></select-option>
                  <div class="flex items-center justify-center mt-1">
                    <IconSVG
                        @iconWasClicked="(searchedPrority = ''), applyFilter()"
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
              :customers="allTickets"
              :rowHover="true"
              :paginator="true"
              ref="exportRef"
              :rowsPerPageOptions="[10, 20, 30]"
              :rows="10"
              :loading="loading"
               @rowClicked="redirectToDetail($event)"
              :image='true'
              tableType="tickets"
          />
        </div>
  <CreateTicket
  v-if="showCreateTicketDialog"
  @closeDialog="(showCreateTicketDialog = false)"
  @ticketData="createTicketWithAttachemnts($event)">

  </CreateTicket>
  </div>
</template>
<script>
import { ref, onMounted, reactive,computed } from "vue";
import Loader from "@/components/Loader.vue";
import DataTable from "@/components/Table";
import StickyHeader from "@/components/StickyHeader";
import PsytechButton from "@/components/PsytechButton";
import CreateTicket from "@/components/CreateTicket";
import { TabGroup, TabList } from "@headlessui/vue";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import SelectOption from "@/components/SelectOption.vue";
import Icon from "@/components/Icon";
import IconSVG from "@/components/IconSVG.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useClientUser } from "@/components/composition/clientHelper.js";

export default {
  name: "support-control-list",
  components: {
    DataTable,
    StickyHeader,
    PsytechButton,
    TabGroup,
    TabList,
    Field,
    IconSVG,
    Control,
    Loader,
    CreateTicket,
    Icon,
    SelectOption
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const allTickets = ref([]);
    const ticketId = ref("");
    let prevNonSearched = ref();
    let prevSearched = ref();
    let searchText = ref("");
    let prevMainSearchHistry = ref("");
    let searcheStatus = ref("");
    let searchedPrority = ref("");
    let selectedStatusFilter = ref("contains");
    let selectedProrityFilter = ref("contains");
    let showFilters = ref(false);
    const { fresDeskStatuses, fresDeskPriorities } = useClientUser();
    onMounted(()=>{
      getAllTicketsByCompId()
    })

    //
    const redirectToDetail = async e => {
      store.commit("freshDesk/setTicketData", e.data);
      router.push({ name: "ticket-conversation" });
    };

    let showCreateTicketDialog = ref(false);
    let alreadyMember = ref(false);
    const userData = computed(()=>{
      return JSON.parse(localStorage.getItem("userData"))
    })
    if (userData.value.freshdeskCompanyID != 0){
      alreadyMember.value = true;
    }
    const loading = ref(false);
    const getAllTicketsByCompId = () => {
      if (!alreadyMember.value){
        return;
      }
      loading.value = true;
      store.dispatch("freshDesk/getAllTicketsByCompany").then(res => {
        allTickets.value = res.data.map(item=>{
          return {
            subject: item.subject,
            createDate: item.created_at.split("T")[0],
            CreatedTime: item.created_at.split("T")[1].split("Z")[0],
            status: item.status,
            priority: item.priority,
            ticketId: item.id
          }
        })
          prevNonSearched.value = allTickets.value;
        })
        .catch((error) => {
          console.log("errror", error)
        })
        .finally(()=>{
          loading.value = false;
        })
    };

    const createTicketWithAttachemnts = data => {
        const FORM_DATA = new FormData();
        FORM_DATA.append('description', data.details);
        FORM_DATA.append('subject', data.subject);
        FORM_DATA.append('email', 'test73@gmail.com');
        FORM_DATA.append('custom_fields[cf_client]', String(data.client));
        FORM_DATA.append('custom_fields[cf_clientuser]', String(data.user));
        FORM_DATA.append('status', 2); // open
        FORM_DATA.append('priority', 1); // low
        for(let i=0; i< data.attachments.length; i++){
            FORM_DATA.append("attachments[]", data.attachments[i])
          }
        store.dispatch("freshDesk/addTikcetWithAttachments", FORM_DATA).then(res => {

          getAllTicketsByCompId()
        })
        .catch((error) => {
          console.log("errror", error)
        })
        .finally(()=>{
          showCreateTicketDialog.value = false;
        })
    }
    const createNewCompany = () => {
      store.dispatch("freshDesk/createCompany").then(result => {

            const data = {
              companyId:result.data.id,
            }
            store.dispatch("clientControl/addFreshDeskKeyToUser",data).then(async (res) => {

              console.log("response is....", res.data);
              const DATA = JSON.parse(localStorage.getItem("userData"))
              const NEW_DATA = {
                ...DATA,
                freshdeskCompanyID: result.data.id
              }
              await localStorage.setItem("userData", JSON.stringify(NEW_DATA))
              store.dispatch("auth/localStorageDataAction");
              alreadyMember.value = true;
            }).catch((error) => {
              console.log("error is ", error)
            });

        })
        .catch((error) => {
          console.log("errror", error)
        })
        .finally(()=>{

        })
    };



    const clearFilter = () => {
      searchText.value = "";
      searchedPrority.value = "";
      searcheStatus.value = "";
      allTickets.value = prevNonSearched.value;
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
        filteredData = prevNonSearched.value;
      }
      // Make sure search value has some valid value, then do filtering
      console.log(searchedPrority.value);
      if (searchedPrority.value) {
        filteredData = filteredData.filter((val) => {
          if (
              !val.priority && searchedPrority.value
                  ? false
                  : searchedPrority.value
                  ? subFilter(
                      fresDeskPriorities.find(item=> item.value == +val.priority).text.toLowerCase(),
                      searchedPrority.value.toLowerCase().trim(),
                      selectedProrityFilter.value
                  )
                  : true
          ) {
            return true;
          }
        });
      }
      // Make sure search value has some valid value, then do filtering
      if (searcheStatus.value) {
        filteredData = filteredData.filter((val) => {
          if (
              !val.status && searcheStatus.value
                  ? false
                  : !!(searcheStatus.value
                  ? subFilter(
                      fresDeskStatuses.find(item=> item.value == +val.status).text.toLowerCase(),
                      searcheStatus.value.toLowerCase().trim(),
                      selectedStatusFilter.value
                  )
                  : true)
          ) {
            return true;
          }
        });
      }
      // CHECK wheather record is found againts applied filters
      allTickets.value = filteredData;
      prevSearched.value = filteredData;
    };
    const filterMethod = (data, value) => {
      return data.filter(function (ticket) {
        return (
            ticket.subject.toLowerCase().indexOf(value) > -1 ||
            ticket.createDate.indexOf(value) > -1 ||
            ticket.CreatedTime.indexOf(value) > -1
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
      if (searchedPrority.value || searcheStatus.value) {
        allTickets.value = filterMethod(prevSearched.value, value);
      } else {
        // default, When no filters is applied
        allTickets.value = filterMethod(prevNonSearched.value, value);
        prevMainSearchHistry.value = allTickets.value;
      }
    };

    const closeFilter = () => {
      if (showFilters.value) {
        showFilters.value = false;
      }
    };

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

    // Seach and filter end

    return {
      alreadyMember,
      allTickets,
      loading,
      ticketId,
      createNewCompany,
      redirectToDetail,
      createTicketWithAttachemnts,
      showCreateTicketDialog,
      getAllTicketsByCompId,
      filteredMainMethod,
      searchText,
      showFilters,
      closeFilter,
      clearFilter,
      searcheStatus,
      searchedPrority,
      applyFilter,
      filterDropdown,
      selectedProrityFilter,
      selectedStatusFilter
    };
  },
};
</script>
<style>
#filter-dropdown {
  min-width: 465px;
  padding: 16px 15px;
  box-shadow: #3755634d 0px 8px 30px;
}
input[type="search" i]:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-search-cancel-button {
  cursor: pointer;
}
</style>
