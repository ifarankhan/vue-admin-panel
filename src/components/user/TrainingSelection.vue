<template>
     <div class="w-2/3">
        <!--  -->
        <!-- {{ trainingArray }} -->
        <div class="pl-4">
          <p class="mb-2 text-sm font-semibold">
            Select Training / Qualification Type:
          </p>
          <div v-for="(item, index) in trainingArray.trainingObj" :key="index" class="mb-4 ml-1.5">
            <check-radio-picker
              name="sample-checkbox"
              v-model="trainingArray.trainingObj[trainingArray.trainingObj.indexOf(item)].selected"
              setValue="another"
              :options="{ another: item.text }"
            />
            <span class="ml-6 text-sm">{{ item.description }}</span>
          </div>
          <div class="ml-2">
             <check-radio-picker
              name="sample-checkbox"
              v-model="otherCheckbox"
              setValue="another"
              :options="{ another: 'Other' }"
            />
          </div>
        <div class="w-6/12 mt-4 other-detail" v-if="otherCheckbox">
          <field label="Other Detail" labelFor="otherDetail">
          <control
            type="input"
            v-model="trainingDetail.trainingLevelOther"
            placeholder="other"
          />
          <error-span :error="v$.trainingLevelOther"></error-span>
        </field>
        </div>
          <div class="mt-5" v-if="v$.traininglevel && !otherCheckbox">
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
                labelText="Select Name"
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
 props:{
   onEditUser: {
     type: Boolean,
     default: false
   }
 },
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
     let { trainingArray } = useClientUser();

     const indUserDetail = (store.getters['clientControl/getIndClientUser'])?.userDetails;

     const otherCheckbox = ref( indUserDetail?.trainingLevelOther? true:false);

     if(indUserDetail && indUserDetail.trainingLevel){
      const result = indUserDetail?.trainingLevel.split(",")
      if(result.length)
        trainingArray.trainingObj = trainingArray.trainingObj.map(item=> {
          if(result.includes(item.value)){
            return {
              ...item,
              selected: true
            }
          }
          return item
        })
     }


     const trainingProvidersArray = ref([]);
     const trainingDetail = reactive({
      traininglevel: [],
      trainingprovider: indUserDetail?.trainingProvider??"",
      trainingyear: indUserDetail?.trainingYear??"",
      trainingdetails: indUserDetail?.trainingNotes??"",
      trainingLevelOther: indUserDetail?.trainingLevelOther??""
    });

    watch(
      () => otherCheckbox.value,
      (currentValue, _) => {
        if(!currentValue){
          trainingDetail.trainingLevelOther = ""
        }
      },
      {immediate:true}
    );

   watch(
      () => _.cloneDeep(trainingArray),
      (currentValue, _) => {
        trainingDetail.traininglevel = currentValue.trainingObj
          .map((item) => item.selected && item.value)
          .filter((item) => item);
      },
      {immediate:true}
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
          required: helpers.withMessage("One type must be selected", ()=>{
             if(!otherCheckbox.value && !trainingDetail.trainingLevelOther && trainingDetail.traininglevel.length ==0){
              return false
            } else {
              return true
            }
          }),
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
        trainingLevelOther:{
           required: helpers.withMessage("This field is required", ()=>{
            if(otherCheckbox.value && !trainingDetail.trainingLevelOther){
              return false
            } else {
              return true
            }
          }),
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
        ( (v$.value.traininglevel.$invalid ||
          v$.value.trainingprovider.$invalid ||
          v$.value.trainingyear.$invalid ||
          v$.value.trainingdetails.$invalid) ||
          (otherCheckbox.value && v$.value.trainingLevelOther.$invalid))
      ) {
        emit("valid", { notDone: ()=> {} })
        return true;
      }
      emit("valid", { done: ()=> {
        if(props.onEditUser){
          const data = {
           accountid: indUserDetail.accountID,
           userid: indUserDetail.userID,
           traininglevel: trainingDetail.traininglevel.filter(()=> true),
           trainingprovider: trainingDetail.trainingprovider,
           trainingyear: trainingDetail.trainingyear,
           trainingdetails: trainingDetail.trainingdetails,
           traininglevelother: trainingDetail.trainingLevelOther
         }
         emit("trainingSelectionDetail",data)
        } else{
          emit("trainingSelectionDetail",trainingDetail)
        }

      } })
    }

    return {
        trainingDetail,
        yearsArray,
        trainingDetailMethod,
        trainingArray,
        indUserDetail,
        otherCheckbox,
        trainingProvidersArray,
        v$
     }
    },
}
</script>

<style>
  .other-detail input{
    padding-left: 10px !important;
  }
</style>
