
export interface ICms {
    fields: ICmsField[];
}

export interface ICmsField {
    name: string;
    type: "string" | "boolean";
}