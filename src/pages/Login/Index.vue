<script lang="ts">
export default { layout: "empty" };
</script>

<script lang="ts" setup>
import { useStore } from "@/store";
import {} from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const layout = "empty";

defineExpose({
    layout,
});

async function login() {
    await store.dispatch("auth/login");
    await router.push("/");
}
</script>

<template>
    <div>
        <y-btn @click="login">Login</y-btn>
    </div>
</template>
