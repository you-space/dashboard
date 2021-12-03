<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { computed } from "vue";

library.add(fas);

defineProps({
    name: {
        type: String,
        required: true,
    },
});

const classes = computed(() => {
    const result = ["y-icon"];

    return result;
});
</script>

<template>
    <i :class="classes">
        <font-awesome-icon :icon="name" />
    </i>
</template>
