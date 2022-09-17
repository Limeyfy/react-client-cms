import { IClientCmsField } from "../client-cms/types";

function toDateInputValue(date: Date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};

export function getDefaultValue(type: IClientCmsField<any>["type"]) {
    switch (type) {
        case "text":
            return "";
        case "number":
            return 0;
        case "file":
            return null;
        case "date":
            return toDateInputValue(new Date());
        case "time":
            return "00:00";
        case "datetime-local":
            return toDateInputValue(new Date());
        case "select": return null;
        default:
            return "";
    }
}