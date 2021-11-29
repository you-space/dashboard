import { AppContext } from "@/types";
import colors from "tailwindcss/colors";
import lodash from "lodash";
interface NotifyOptions {
    message: string;
    color?: string;
    duration?: number;
}

interface Notification extends NotifyOptions {
    element: HTMLElement;
    done: boolean;
}

function createNotify() {
    const container = document.createElement("div");

    container.classList.add("notify-container");

    const notifications: Map<string, Notification> = new Map();

    document.body.appendChild(container);

    function show(notification: Notification) {
        notification.element.classList.remove("hide");
        notification.element.classList.add("animate");

        const duration = notification.duration || 3000;

        setTimeout(() => {
            notification.done = true;

            notification.element.classList.add("hide");
            notification.element.classList.remove("animate");
        }, duration);

        setTimeout(() => {
            if (notification.done) {
                notification.element.remove();
                notifications.delete(notification.message);
            }
        }, duration + 500);
    }

    function add(options: NotifyOptions) {
        let notification = notifications.get(options.message);

        if (notification) {
            show(notification);
            return;
        }

        const element = document.createElement("div");

        const color = lodash.get(
            colors,
            options.color?.replace("-", ".") || ""
        );

        const duration = options.duration || 3000;

        element.classList.add("notify");

        element.innerHTML = options.message;

        if (color) {
            element.style.setProperty("--notify-color", color);
        }

        element.style.setProperty("--notify-duration", `${duration}ms`);

        container.appendChild(element);

        notification = {
            ...options,
            element,
            duration,
            done: false,
        };

        notifications.set(options.message, notification);

        show(notification);
    }

    function success(message: string, duration?: number) {
        add({
            message,
            color: "green-500",
            duration,
        });
    }

    function warn(message: string, duration?: number) {
        add({
            message,
            color: "yellow-500",
            duration,
        });
    }

    return {
        notifications,
        add,
        success,
        warn,
    };
}

export const notify = createNotify();

export default function boot({ app }: AppContext) {
    app.config.globalProperties.$notify = notify;
}
