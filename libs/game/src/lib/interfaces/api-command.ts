export interface ApiCommand {
    name: string;
    description: string;
    category: string;
    subCategory: string;
    params: ApiCommandParam[];
}

export interface ApiCommandParam {
    name: string;
    offset: number;
    description: string;
    optional: boolean;
}
