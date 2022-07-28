
export interface ICms {
    fields: ICmsField[];
}

export interface ICmsField {
    name: string;
    type: "string" | "boolean";
    validation?: (val: any) => boolean;
    value: any;
    className?: string;
}