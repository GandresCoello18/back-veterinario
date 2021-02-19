export interface Pacient {
    idPacient: string
    tipo: string
    idCategory: string
    nombre: string | null
    altura: number
    peso: number
    emailPerson: string | null
    avatar: string | null
    created_at: string | Date
    sexo: string
    nacimiento: Date | string
}