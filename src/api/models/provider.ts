interface Field {
    name: string;
    type: "text";
    label: string;
    value: string;
    encrypt: boolean;
}
export default class Provider {
    public id: string;
    public title: string;
    public description: string;
    public active: boolean;

    public fields: Field[] = [];

    public import?: "none" | "daily" | "weekly" | "monthly";

    constructor(data: any) {
        Object.assign(this, data);
    }
}
