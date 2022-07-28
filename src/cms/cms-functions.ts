import { ICmsField } from "./CmsTypes";

const formatForm = (form: ICmsField[]) => {
    let obj: any = {};
    form.forEach(field => {
        obj[field.name] = field.value;
    });
    return obj;
}

export { formatForm };