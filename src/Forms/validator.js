export const requiredField = (value) =>{
    if (value) return undefined;
    else return 'Это обязательное поле';
}
