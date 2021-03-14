/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { add } from 'date-fns';

export const regex = /(\d+)/g;

interface DatesEdad {
    from: Date,
    to: Date
}

export const EdadMeses = (nacimiento: string | Date, edad: string): DatesEdad => {
    if(edad === 'Cada año'){
        const RestoYear = new Date().getFullYear() - new Date(nacimiento).getFullYear();

        const validateYear = (RestoYear + 1) * 12

        return {
            from: add(new Date(nacimiento), { months: validateYear }),
            to: add(new Date(nacimiento), { months: validateYear }),
        }
    }

    const OnlyNum: RegExpMatchArray | null = edad.match(regex)
    let tipo = '';

    if(edad.indexOf('meses') !== -1){
        tipo = 'meses'
    }

    if(edad.indexOf('semanas') !== -1){
        tipo = 'semanas'
    }

    if(edad.indexOf('dias') !== -1){
        tipo = 'dias'
    }

    if(OnlyNum){
        switch(OnlyNum.length){
            case 1:
                return {
                    from: AddFechas(nacimiento, Number(OnlyNum[0]), tipo),
                    to: AddFechas(nacimiento, Number(OnlyNum[0]), tipo)
                }
            case 2:
                return {
                    from: AddFechas(nacimiento, Number(OnlyNum[0]), tipo),
                    to: AddFechas(nacimiento, Number(OnlyNum[1]), tipo),
                }
        }
    }

    return {
        from: new Date(),
        to: new Date(),
    }
}

export const AddFechas = (nacimiento: string | Date, num: number, tipo: string) => {
    if(tipo === 'semanas'){
        return add(new Date(nacimiento), { weeks: num })
    }

    if(tipo === 'meses'){
        return add(new Date(nacimiento), { months: num })
    }

    if(tipo === 'dias'){
        return add(new Date(nacimiento), { days: num })
    }

    return add(new Date(nacimiento), { months: 0 })
}