<template>
  <slot
    :data="languages"
    :toggleLngMenu="toggleLngMenu"
    :languageMenu="languageMenu"
    :setLocale="setLocale"
    :Language="Language"
  ></slot>
</template>
<script>
import { useI18n } from "vue-i18n";
import { reactive, ref, computed } from "vue";
export default {
  name: "LanguageSwitcher",
  props: {
    showText: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const languageMenu = ref(false);
    let Language = ref("");
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

    Language = computed(() => {
      return languages.find((item) => item.value == i18n.locale.value).text;
    });

    const i18n = useI18n();
    const setLocale = (locale) => {
      console.log("clll")
      i18n.locale.value = locale;

      languageMenu.value = false;
      localStorage.setItem("language", locale);
    };

    return {
      languages,
      languageMenu,
      Language,
      setLocale,
      toggleLngMenu,
    };
  },
};
</script>
<style scoped>

</style>
