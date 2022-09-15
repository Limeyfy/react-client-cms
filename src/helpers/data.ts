import moment from "moment";

export function getDefaultValue(type: string) {
    switch (type) {
        case "string":
        case "text":
            return "";
        case "boolean":
            return false;
        case "number":
            return "";
        case "date":
            return moment();
        case "upload": return [];
        default:
            return "";
    }
}