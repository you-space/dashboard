<template>
    <div class="y-progress-bar"></div>
</template>
<style lang="scss">
@keyframes y-progress-bar-width {
    0% {
        margin-left: 0;
        width: 0;
    }
    50% {
        margin-left: 50%;
        width: 50%;
    }
    100% {
        margin-left: 100%;
        width: 0%;
    }
}

.y-progress-bar {
    @apply bg-primary;

    --height: 2px;
    width: 30%;

    height: var(--height);
    animation: y-progress-bar-width 2s ease-in-out infinite;
}
</style>
