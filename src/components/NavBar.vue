<template>
  <nav
    v-show="isNavBarVisible"
    class="fixed top-0 left-0 right-0 z-40 flex w-screen h-20 bg-white border-b border-gray-100 transition-position xl:pl-60 lg:w-auto lg:items-stretch dark:bg-gray-900 dark:border-gray-900"
    :class="{ 'ml-60': isAsideMobileExpanded }"
  >
    <div class="flex items-stretch flex-1">
      <nav-bar-item type="flex lg:hidden" @click.prevent="menuToggleMobile">
        <icon :path="menuToggleMobileIcon" size="24" />
      </nav-bar-item>
      <nav-bar-item type="hidden lg:flex xl:hidden" @click.prevent="menuOpenLg">
        <icon :path="mdiMenu" size="24" />
      </nav-bar-item>
      <div class="ml-6 font-semibold place-self-center">
        {{ $t("GeneSys Online Partner Control") }}
      </div>
    </div>

    <div class="flex items-stretch flex-none h-14 lg:hidden">
      <nav-bar-item class="flex items-center" @click.prevent="menuNavBarToggle">
        <icon :path="menuNavBarToggleIcon" size="24" />
      </nav-bar-item>
    </div>
    <div
      class="absolute left-0 w-screen bg-white shadow top-14 lg:w-auto lg:items-stretch lg:flex lg:flex-grow lg:static lg:border-b-0 lg:overflow-visible lg:shadow-none dark:bg-gray-900"
      :class="{ hidden: !isMenuNavBarActive, block: isMenuNavBarActive }"
    >
      <div
        class="overflow-y-auto max-h-screen-menu lg:overflow-visible lg:flex lg:items-stretch lg:justify-end lg:ml-auto"
      >


<!--        <nav-bar-menu has-divider :show-icon="false">-->
<!--          <nav-bar-item-label-->
<!--            :icon="mdiBell"-->
<!--            label="Notifications"-->
<!--            is-desktop-icon-only-->
<!--          />-->
<!--          <template #dropdown>-->
<!--            <div class="p-5 w-72">-->
<!--              <span class="text-black cursor-default text-xm">Notifications:</span>-->
<!--              <nav-bar-menu-divider />-->
<!--              <nav-bar-item to="/profile">-->
<!--                <nav-bar-item-label :icon="mdiHandExtendedOutline" label="New ticket has been created" />-->
<!--              </nav-bar-item>-->
<!--              <nav-bar-item>-->
<!--                <nav-bar-item-label :icon="mdiEmail" label="New comment on your ticket, Ticket id#256" />-->
<!--              </nav-bar-item>-->
<!--              <nav-bar-item>-->
<!--                <nav-bar-item-label :icon="mdiCommentTextOutline" label="New comment has been added" />-->
<!--              </nav-bar-item>-->
<!--              <nav-bar-menu-divider />-->
<!--              <span class="text-xm">-->
<!--                Show all notifications-->
<!--              </span>-->
<!--            </div>-->
<!--          </template>-->

<!--        </nav-bar-menu>-->

        <!-- language switcher -->
        <nav-bar-menu has-divider :hasCustomIcon="true">
          <span class="text-xm">Language:</span>
          <div>
            <span class="pl-1 text-sm font-bold">{{ $i18n.locale.toUpperCase() }}</span>
          </div>
          <template #dropdown>
            <language-switcher v-slot="{ data, setLocale }">
              <nav-bar-item
                v-for="item in data"
                :key="item.text"
                @click.prevent="setLocale(item.value)"
                class="font-semibold"

              >
                <nav-bar-item-label :label="item.text" icon='' />
              </nav-bar-item>
            </language-switcher>
          </template>
        </nav-bar-menu>

        <nav-bar-menu has-divider>
          <user-avatar class="inline-flex w-6 h-6 mr-3" />
          <div>
            <span>{{ userName }}</span>
          </div>
          <template #dropdown>
<!--            <nav-bar-item to="/profile">-->
<!--              <nav-bar-item-label :icon="mdiAccount" label="My Profile" />-->
<!--            </nav-bar-item>-->
<!--            <nav-bar-item>-->
<!--              <nav-bar-item-label :icon="mdiCogOutline" label="Settings" />-->
<!--            </nav-bar-item>-->
<!--            <nav-bar-item>-->
<!--              <nav-bar-item-label :icon="mdiEmail" label="Messages" />-->
<!--            </nav-bar-item>-->
<!--            <nav-bar-menu-divider />-->
            <nav-bar-item @click="logoutHanlder">
              <nav-bar-item-label :icon="mdiLogout" label="Log Out" />
            </nav-bar-item>
          </template>
        </nav-bar-menu>


        <!-- <nav-bar-item is-desktop-icon-only @click="logoutHanlder">
          <nav-bar-item-label
            :icon="mdiLogout"
            label="Log out"
            is-desktop-icon-only
          />
        </nav-bar-item> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiGithub,
  mdiThemeLightDark,
  mdiBell,
  mdiCommentTextOutline,
  mdiHandExtendedOutline,
} from "@mdi/js";
import NavBarItem from "@/components/NavBarItem";
import NavBarItemLabel from "@/components/NavBarItemLabel";
import NavBarMenu from "@/components/NavBarMenu";
import NavBarMenuDivider from "@/components/NavBarMenuDivider";
import UserAvatar from "@/components/UserAvatar";
import Icon from "@/components/Icon";

export default {
  name: "NavBar",
  components: {
    UserAvatar,
    NavBarMenu,
    NavBarItem,
    NavBarItemLabel,
    NavBarMenuDivider,
    LanguageSwitcher,
    Icon,
  },
  setup() {
    const store = useStore();
    let userName = ref("");

    const toggleLightDark = () => {
      store.dispatch("darkMode");
    };

    userName = computed(() => {
      const USER_DATA = JSON.parse(localStorage.getItem("userData"));
      return USER_DATA?.distributorUserName ?? "";
    });

    const isNavBarVisible = computed(() => !store.state.isFullScreen);

    const isAsideMobileExpanded = computed(
      () => store.state.isAsideMobileExpanded
    );

    // const userName = computed(() => store.state.userName)

    const menuToggleMobileIcon = computed(() =>
      isAsideMobileExpanded.value ? mdiBackburger : mdiForwardburger
    );

    const menuToggleMobile = () => store.dispatch("asideMobileToggle");

    const isMenuNavBarActive = ref(false);

    const menuNavBarToggleIcon = computed(() =>
      isMenuNavBarActive.value ? mdiClose : mdiDotsVertical
    );

    const menuNavBarToggle = () => {
      isMenuNavBarActive.value = !isMenuNavBarActive.value;
    };

    const menuOpenLg = () => {
      store.dispatch("asideLgToggle", true);
    };

    const logoutHanlder = async () => {
      store.dispatch("auth/logoutAction", "login");
    };

    return {
      toggleLightDark,
      isNavBarVisible,
      isAsideMobileExpanded,
      userName,
      menuToggleMobileIcon,
      menuToggleMobile,
      isMenuNavBarActive,
      menuNavBarToggleIcon,
      menuNavBarToggle,
      menuOpenLg,
      mdiMenu,
      mdiClockOutline,
      mdiCloud,
      mdiCrop,
      mdiAccount,
      mdiCogOutline,
      mdiEmail,
      mdiLogout,
      mdiGithub,
      mdiThemeLightDark,
      mdiBell,
      mdiCommentTextOutline,
      mdiHandExtendedOutline,
      logoutHanlder,
    };
  },
};
</script>
