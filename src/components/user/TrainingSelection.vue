<template>
     <div class="w-2/3">
        <!--  -->
        <div class="pl-4">
          <p class="mb-2 text-sm font-semibold">
            Select Training / Qualification Type:
          </p>
          <div v-for="(item, index) in trainingArray" :key="index" class="mb-4 ml-1.5">
            <check-radio-picker
              name="sample-checkbox"
              v-model="item.selected"
              setValue="another"
              :options="{ another: item.text }"
            />
            <span class="ml-6 text-sm">{{ item.description }}</span>
          </div>
          <div class="mt-5">
            <error-span :error="v$.traininglevel"></error-span>
          </div>
        </div>
        <!--  -->

        <div class="mt-12 ml-3">
          <p class="pl-2 text-sm font-semibold">Add a Training Providers:</p>
          <div class="flex w-10/12 pl-1">
            <div class="w-full pl-1">
              <select-option
                :filterDropdown="trainingProvidersArray"
                labelText="Name / Email address"
                :customeWidth="true"
                v-model="trainingDetail.trainingprovider"
              ></select-option>
            </div>

            <div class="w-full pl-1">
              <select-option
                :filterDropdown="yearsArray"
                :allyMarginRight="false"
                labelText="Year of Training"
                v-model="trainingDetail.trainingyear"
                :customeWidth="true"
              ></select-option>
            </div>
          </div>
          <div class="flex w-9/12 mt-1">
            <span class="inline-block w-full">
              <error-span :error="v$.trainingprovider"></error-span>
            </span>
            <span class="inline-block w-full ml-20">
              <error-span :error="v$.trainingyear"></error-span>
            </span>
          </div>

          <!--  -->
          <!-- <div class="mt-6">
            <div class="flex inline-block w-2/4 mt-4 ml-2">
              <img class="inline-block object-cover w-12 h-12 rounded-full" src="https://images.pexels.com/photos/2955305/pexels-photo-2955305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image"/>
              <div class="inline-block ml-2">
                <p class="text-sm font-bold">John Doe</p>
                <p class="text-sm opacity-50"> Personality Assessment Trainer </p>
              </div>
              
              <span class="ml-4 cursor-pointer">
                <IconSVG
                :applyClass="true"
                @iconWasClicked="(accountName = '')"
              />
            </span>
            <span class="text-xs opacity-50 cursor-pointer"> Remove </span>
            </div>
          </div> -->

          <!--  -->
          <div class="w-10/12 mt-8">
            <field label="Training Details" labelFor="trainingDetails">
              <control
                type="textarea"
                v-model="trainingDetail.trainingdetails"
                placeholder="Details of the Training"
              />
            </field>
            <div>
              <error-span :error="v$.trainingdetails"></error-span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import ErrorSpan from "@/components/ErrorSpan";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import { useStore } from "vuex";
import Control from "@/components/Control";
import IconSVG from "@/components/IconSVG.vue";
import _ from "lodash";
import { useClientUser } from "@/components/composition/clientHelper.js";
import SelectOption from "@/components/SelectOption.vue";
import {
  maxLength,
  helpers,
  required
} from "@vuelidate/validators";
export default {
 name: "client-control-user-detail",
 components: {
    CheckRadioPicker,
    SelectOption,
    Field,
    Control,
    IconSVG,
    ErrorSpan,
  },
   setup (props, { emit }) {
     const store = useStore();
     const { trainingArray } = useClientUser();
     const trainingProvidersArray = ref([]);
     const trainingDetail = reactive({
      traininglevel: [],
      trainingprovider: "",
      trainingyear: "",
      trainingdetails: "",
    });
    
    watch(
      () => _.cloneDeep(trainingArray),
      (currentValue, _) => {
        trainingDetail.traininglevel = currentValue
          .map((item) => item.selected && item.value)
          .filter((item) => item);
      }
    );
   const yearsArray = ref([]);
   const rangeOfYears = (start, end) =>
      Array(end - start + 1)
        .fill(start)
        .map((year, index) => {
          return {
            text: year + index,
            value: String(year + index),
          };
    });
    const endYear = new Date(
      new Date().setFullYear(new Date().getFullYear() + 20)
    ).getFullYear();
    yearsArray.value = rangeOfYears(new Date().getFullYear(), endYear);

    onMounted(() => {
      loadAllTrainingProviders();
    });

    const loadAllTrainingProviders = () => {
      store
        .dispatch("clientControl/getTrainingProviders")
        .then((res) => {
          const RESPONSE_DATA = res.data;
          if (RESPONSE_DATA.status == 200) {
            trainingProvidersArray.value = RESPONSE_DATA.data.map((item) => {
              return {
                text: item,
                value: item,
              };
            });
          }
        })
        .catch((error) => {
          console.log("error is...", error);
        });
    };
   
     const rules = computed(() => {
      return {
       traininglevel: {
          required: helpers.withMessage("One type must be selected", required),
        },
        trainingprovider: {
          required: helpers.withMessage(
            "Name / Email address is required",
            required
          ),
        }, 
        trainingyear: {
          required: helpers.withMessage(
            "Year of training is required",
            required
          ),
        },
        trainingdetails: {
          required: helpers.withMessage("Detail is required", required),
          maxLength: helpers.withMessage(
            "Detail should not be greater than 255 characters.",
            maxLength(255)
          ),
        },
      }
    });

    const v$ = useVuelidate(rules, trainingDetail);

    const trainingDetailMethod = ()=>{
      v$.value.$validate();
      if (
        (v$.value.traininglevel.$invalid ||
          v$.value.trainingprovider.$invalid ||
          v$.value.trainingyear.$invalid ||
          v$.value.trainingdetails.$invalid)
      ) {
        emit("valid", { notDone: ()=> {} })
        return true;
      }
      emit("valid", { done: ()=> {
        emit("trainingSelectionDetail",trainingDetail)
      } })
    }

    return {
        trainingDetail,
        yearsArray,
        trainingDetailMethod,
        trainingArray,
        trainingProvidersArray,
        v$
     }  
    },
}
</script>

<style scoped>

</style>
