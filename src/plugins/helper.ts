import { AppContext } from "@/types";

export const rules = {
    required: (value: any) => !!value || "Field required",
};

export default function boot({ app }: AppContext) {
    app.config.globalProperties.$rules = rules;
}
