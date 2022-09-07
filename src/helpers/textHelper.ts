
export function unPascalCase(str: string) {
    // replace all capital letters with a space and lowercase the first letter. The first word will start with a capital letter
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
}