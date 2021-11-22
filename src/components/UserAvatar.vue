<template>
  <div>
    <img :src="avatar" :alt="name" class="rounded-full block h-auto w-full max-w-full" :class="bg" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'UserAvatar',
  props: {
    username: String,
    bg: {
      type: String,
      default: 'bg-gray-100 dark:bg-gray-800'
    },
  },
  setup (props) {
    const store = useStore()

    const avatar = computed(() => props.username
      ? "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png"
      : "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png")

    const name = computed(() => props.username ? props.username : store.state.userName)

    return {
      name,
      avatar
    }
  }
}
</script>
