import { FieldType, ICmsField } from "./CmsTypes";

const formatForm = (form: ICmsField[]) => {
    let obj: any = {};
    form.forEach(field => {
        let val = field.value;
        if (!val) {
            val = getDefaultValue(field.type);
        }
        obj[field.name] = field.value ?? "";
    });
    return obj;
}

const formatPascalAndSpace = (str: string) => {
    str = str.replace(/([A-Z])/g, ' $1').trim()
    str = (str.charAt(0).toUpperCase() + str.slice(1));
    return str;
};

const getDefaultValue = (type: FieldType) => {
    switch (type) {
        case "text":
            return false;
        default:
            return "";
    }
}

export { formatForm, formatPascalAndSpace, getDefaultValue };