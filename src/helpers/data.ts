import { IClientCmsField } from "../cms";

export function getDefaultValue(type: IClientCmsField<any>["type"]) {
    switch (type) {
        case "text":
            return "";
        case "number":
            return 0;
        default:
            return "";
    }
}