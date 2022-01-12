import { reactive } from "vue";
export function useClientUser() {
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

  return {
    userTypes,
    notifications,
    formatDate
  };
}