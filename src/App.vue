<template>
    <router-view />
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --color-primary: theme("colors.blue.500");
}

body {
    @apply text-gray-700 dark:text-white transition-colors ease-in;
}
</style>
