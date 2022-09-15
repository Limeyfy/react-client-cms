import moment from "moment";
import { IClientCmsField } from "../cms";

export function getDefaultValue(type: IClientCmsField<any>["type"]) {
    switch (type.type) {
        case "string":
        case "text":
            return "";
        case "boolean":
            return false;
        case "number":
            return "";
        case "date":
            return moment();
        case "select":
            return type.options[0];
        case "upload": return [];
        default:
            return "";
    }
}