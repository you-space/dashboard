<script lang="ts">
export default { layout: "empty" };
</script>

<script lang="ts" setup>
import { useStore } from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { http } from "@/api";
import { notify } from "@/plugins/notify";

const store = useStore();
const router = useRouter();

const uuid = ref("");
const password = ref("");

async function login() {
    const { data } = await http.post("/auth/login", {
        uuid: uuid.value,
        password: password.value,
    });

    notify.add({
        color: "green-500",
        message: data.message,
    });

    await store.dispatch("auth/login", {
        uuid: uuid.value,
        password: password.value,
    });

    await router.push("/");
}
</script>

<template>
    <y-form class="flex items-center justify-center h-screen" @submit="login">
        <y-card class="login-card">
            <div class="text-4xl text-center mb-10 font-bold">You space</div>
            <y-input
                v-model="uuid"
                label="E-mail or username"
                placeholder="me@example.com"
                autocomplete
                class="mb-4"
            />
            <y-input
                v-model="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                autocomplete
                class="mb-8"
            />
            <y-btn
                color="primary"
                text-color="white"
                type="submit"
                class="w-full"
            >
                Submit
            </y-btn>
        </y-card>
    </y-form>
</template>

<style lang="scss">
.login-card {
    @apply p-6;
    max-width: 350px;
    height: auto;
    min-height: 300px;
}
</style>
