<script setup>
// import { inject, computed } from 'vue';
import { useUserStore, useThemeStore } from "@store";
import { useRouter } from "vue-router";

// const websocket = inject("$websocket");
// console.log(websocket);

// const isConnected = computed(() => websocket.state.isConnected);

const user = useUserStore();
const theme = useThemeStore();
const router = useRouter();
const css = {
  header: `
    sticky top-0 w-full z-30
    h-[6vh] flex items-center
    justify-center bg-zinc-900
    text-white bg-opacity-90
    relative
  `,
  container: `
    h-full container mx-auto
    flex items-center
    justify-between
  `,
  logo: `
    w-10 cursor-pointer
  `,
  nav: `
    flex items-center
    gap-8 text-sm w-full
  `,
  link: `
    hover:text-neutral-200
    hover:text-opacity-50
    transition duration-300
    ease cursor-pointer
  `,
};
</script>

<template>
  <header v-if='user.isAuthenticated' :class="css.header">
    <div :class="css.container">
      <nav :class="css.nav">
        <router-link
          to="/"
          :class="css.link"
        >
          <img
            src="/pics/logo.png"
            :class="css.logo"
          />
        </router-link>
        <router-link
          to="/orders"
          :class="css.link"
        >
          Управление заказами
        </router-link>
        <router-link
          :to='`/webmaster/${user.data.role_id}`'
          :class="css.link"
        >
          Вебмастер
        </router-link>
        <router-link
          to="/script/1284255/202690"
          :class="css.link"
        >
          Скрипт
        </router-link>
        <router-link
          to="/edit_script"
          :class="css.link"
        >
          Редактор скрипта
        </router-link>
        <router-link
          to="/admin"
          :class="css.link"
        >
          Админ
        </router-link>
        <Icon
          icon="fa-solid fa-language"
          :class="css.link"
        />
        <Icon
          :icon="theme.theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
          :class="css.link"
          @click="theme.toggleTheme"
        />
        <Icon
          v-if="!user.isAuthenticated"
          icon="fa-solid fa-circle-user"
          :class="css.  k"
          @click='router.push("/auth")'
        />
      </nav>
    </div>
    <div class="absolute top-2 right-2 bg-red-100 text-black p-1">
      Статус websocket:
    </div>
  </header>
</template>

<style>
</style>
