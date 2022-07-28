import { ICmsField } from "./CmsTypes";

const formatForm = (form: ICmsField[]) => {
    let obj: any = {};
    form.forEach(field => {
        obj[field.name] = field.value;
    });
    return obj;
}

const formatPascalAndSpace = (str: string) => {
    str = str.replace(/([A-Z])/g, ' $1').trim()
    str = (str.charAt(0).toUpperCase() + str.slice(1));
    return str;
};

export { formatForm, formatPascalAndSpace };