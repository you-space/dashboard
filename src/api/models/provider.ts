export default class Provider {
    public id: string;
    public title: string;
    public active: boolean;

    constructor(data: any) {
        Object.assign(this, data);
    }
}
