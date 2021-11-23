<template>
  <div class="dropdown inline-block relative">
    <div class="text-gray-700 font-semibold py-1 inline-flex items-center">
      <span class="text-xs font-thin"> {{ $t("LanguageText") }}: </span>
      <span class="ml-1 text-xs font-bold" @click.prevent="toggleLngMenu">{{
        $t(selectedLanguage)
      }}</span>
      <img
        src="../assets/svgs/language-icon.svg"
         @click.prevent="toggleLngMenu"
        alt="Language SVG"
        class="h-2.5 w-2.5 mt-0.5"
      />
      <!-- <svg
                @click.prevent="toggleLngMenu"
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg> -->
    </div>
    <ul v-if="languageMenu" class="absolute menu-position" id="style-2">
      <li
        class=""
        v-for="item in languages"
        :key="item.value"
        @click.prevent="setLocale(item.value)"
      >
        <a class="py-2 px-4 block whitespace-no-wrap hover:bg-gray-200">{{
          item.text
        }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { useI18n } from "vue-i18n";
import { reactive, ref, computed } from "vue";
export default {
  setup() {
    const languageMenu = ref(false);
    let selectedLanguage = ref("");
    const toggleLngMenu = () => {
      languageMenu.value = !languageMenu.value;
    };

    const languages = reactive([
      {
        text: "English",
        value: "en",
      },
      {
        text: "Arabic",
        value: "ar",
      },
    ]);

    selectedLanguage = computed(() => {
      // console.log(languages.find(item=> item.value == localStorage.getItem('language')))
      return languages.find((item) => item.value == i18n.locale.value).text;
    });

    const i18n = useI18n();
    const setLocale = (locale) => {
      i18n.locale.value = locale;

      languageMenu.value = false;
      console.log("localelocale", locale);
      localStorage.setItem("language", locale);
    };

    return {
      languages,
      languageMenu,
      selectedLanguage,
      setLocale,
      toggleLngMenu,
    };
  },
};
</script>
<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
.menu-position {
  top: -64px;
  left: 122px;
  max-height: 100px;
  overflow: auto;
}
#style-2 {
  width: 100%;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 3px 6px #00000029;
}

#style-2::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  /* border-radius: 10px; */
  background-color: #f8f8f8;
}

#style-2::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(255, 255, 255);
}

#style-2::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(255, 255, 255);
}
</style>
