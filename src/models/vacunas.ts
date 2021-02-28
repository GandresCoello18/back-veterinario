export interface Vacunas {
    id_vacuna: string
    nombres: string
    count: number
    tipo: string
    edad: string
}

export interface VacunasPacient {
    id_vacunas_pacient: string
    idUser: string
    idPacient: string
    idProducts: string
    created_at: string | Date
    id_vacuna: string
}

export interface MisVacunasPacient {
    id_vacunas_pacient: string
    idUser: string
    idPacient: string
    idProducts: string
    created_at: string | Date
    id_vacuna: string
    nombre_paciente: string
    avatar: string
}