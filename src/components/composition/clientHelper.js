import { reactive } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
export function useClientUser() {
  const store = useStore();
   const userTypes = reactive([
      "Professional",
      "Solution",
      "Training",
      "Test admin",
      "Integration",
    ]);
  const notifications = reactive(["No", "Yes"]);

  const formatDate = (value) => {
      return new Date(value).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }

    const formatExportDate = (value) => {
        return new Date(value).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).split('/').reverse().join('-')
    }

  const tableStatePersistence = (event)=>{
      const data = {
        page: event.page,
        pageCount: event.pageCount,
        first: event.first
      }
      // console.log("event.firstevent.first",event.first)
      store.commit("clientControl/setUsersTablePag",data)
    }

  const trainingArray = reactive({trainingObj: [
    {
      text: "Test User Personality & Ability (TUP & TUA) or Psytech Test Certificate (PTC)",
      value: "PTC",
      selected: false,
      description: "Access to all assessments",
    },
    {
      text: "Test User Personality TUP",
      value: "TUP",
      selected: false,
      description:
        "Allow the new GS2020 account to have access to all Personality assessments",
    },
    {
      text: "Test User Ability TUA",
      value: "TUA",
      selected: false,
      description:
        "Allow the new account to have access to all Reasoning/Ability and Solutions",
    },
    {
      text: "Assistant Test User ATU",
      value: "ATU",
      selected: false,
      description:
        "Allow the new user to only administer/Invite respondents to complete Psytech assessments",
    },
  ]});

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

    const fresDeskStatuses = reactive([
        {
            text: "Open",
            value: 2
        },
        {
            text: "Pending",
            value: 3
        },
        {
            text: "Resolved",
            value: 4
        },
        {
            text: "Closed",
            value: 5
        }
    ])

    const fresDeskPriorities = reactive([
        {
            text: "Low",
            value: 1
        },
        {
            text: "Medium",
            value: 2
        },
        {
            text: "High",
            value: 3
        },
        {
            text: "Urgent",
            value: 4
        }
    ])

  const filterMethod = (data, searchableFields, value) => {
      const matchedArray = searchableFields.map(item=> {
        return data.filter(customer=>(item.split(" ")[1] == "string"? customer[item.split(" ")[0]]?.toLowerCase().indexOf(value) > -1: String(customer[item.split(" ")[0]]).indexOf(value) > -1))
      }).flat()
      return _.uniqWith(matchedArray, _.isEqual)
    }
  
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

  return {
    userTypes,
    trainingArray,
    notifications,
    tableStatePersistence,
    formatDate,
    subFilter,
    numberDropdown,
    filterDropdown,
    filterMethod,
    formatExportDate,
    fresDeskStatuses,
    fresDeskPriorities
  };
}
