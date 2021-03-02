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

    if(OnlyNum){
        switch(OnlyNum.length){
            case 1:
                return {
                    from: add(new Date(nacimiento), { months: Number(OnlyNum[0]) }),
                    to: add(new Date(nacimiento), { months: Number(OnlyNum[0]) }),
                }
            case 2:
                return {
                    from: add(new Date(nacimiento), { months: Number(OnlyNum[0]) }),
                    to: add(new Date(nacimiento), { months: Number(OnlyNum[1]) }),
                }
        }
    }

    return {
        from: new Date(),
        to: new Date(),
    }
}