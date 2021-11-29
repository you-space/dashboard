export default class Video {
    public id: number;
    public src: string;
    public title: string;
    public description: string;

    public source: string;
    public sourceId: string;

    public visibility: string;

    public publishedAt: string;

    public views: any[] = [];
    public images: any[] = [];

    constructor(data: any) {
        Object.assign(this, data);
    }
}
