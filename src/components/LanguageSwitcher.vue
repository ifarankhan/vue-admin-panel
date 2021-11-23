<template>
  <div class="dropdown inline-block relative">
    <div class="text-gray-700 font-semibold py-1 inline-flex items-center">
      <span class="text-xs font-thin"> {{ $t("LanguageText") }}: </span>
      <span class="ml-1 text-xs font-bold" @click.prevent="toggleLngMenu">{{
        $t(selectedLanguage)
      }}</span>
      <span class="block ml-0.5 mt-0.5">
        <LanguageIcon  @click.prevent="toggleLngMenu" />
      </span>
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
import LanguageIcon from '@/components/LanguageIcon.vue';
export default {
  name:"LanguageSwitcher",
  components:{
    LanguageIcon
  },
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
