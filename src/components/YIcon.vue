<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { AppContext } from "@vue/runtime-core";

library.add(fas);

defineProps({
    name: {
        type: String,
        required: true,
    },
    clickable: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <font-awesome-icon
        :icon="name"
        :class="clickable ? 'cursor-pointer' : ''"
    />
</template>
