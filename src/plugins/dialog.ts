import { AppContext } from "@/types";
import { ref } from "vue";

interface DialogOptions {
    id: string;
    title: string;
    model: boolean;
    content?: string;
    cancelable: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

function createDialog() {
    const components = ref<DialogOptions[]>([]);

    function removeDialog(id: string) {
        const index = components.value.findIndex((item) => item.id === id);
        if (index > -1) {
            components.value.splice(index, 1);
        }
    }

    function ask(title: string, content?: string) {
        return new Promise<boolean>((resolve) => {
            const id = Math.random().toString();

            components.value.push({
                id,
                title,
                model: true,
                content,
                cancelable: true,
                onCancel: () => {
                    removeDialog(id);
                    resolve(false);
                },
                onConfirm: () => {
                    removeDialog(id);
                    resolve(true);
                },
            });
        });
    }

    return {
        components,
        ask,
    };
}

export const dialog = createDialog();

export default function boot({ app }: AppContext) {
    app.config.globalProperties.$dialog = dialog;
}
