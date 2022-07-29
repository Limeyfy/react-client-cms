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
        case "checkbox": return false;
        case "number": return 0;
        case "image": return null;
        case "images": return [];
        case "array": return [];
        case "object": return {};
        default: return "";
    }
}

const buildForm = (fields: ICmsField[]) => {
    let form: ICmsField[] = [];
    fields.forEach(field => {
        const existing = form.find(x => x.name === field.name);
        if (existing) {
            throw Error("('client-cms' <CmsComponent />) Duplicate field name: " + field.name);
        }
        if (field.type === "array" && field.of === "object" && (!field.fields || field.fields.length === 0)) {
            throw Error("('client-cms' <CmsComponent />) Array of objects requires at least one field");
        }
        let val = field.value;
        if (val === undefined) {
            val = getDefaultValue(field.type);
        }
        form.push({
            ...field,
            value: val
        });
    });
    return form;
}

export { formatForm, formatPascalAndSpace, getDefaultValue, buildForm };
