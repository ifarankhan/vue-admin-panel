import { reactive } from "vue";
import { useStore } from "vuex";
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

  return {
    userTypes,
    trainingArray,
    notifications,
    tableStatePersistence,
    formatDate,
    formatExportDate
  };
}
