export interface CreateCita {
    idSolicitud: string
    create_at: string | Date
    solicitado: string
    time: string
    status: string
    observaciones: string
    direccion: string
    idPacient: string
    idUser: string
    idClient: string
}

export interface GetMisCita {
    idSolicitud: string
    create_at: string | Date
    solicitado: string
    time: string
    status: string
    observaciones: string
    direccion: string
    idPacient: string
    idUser: string
    idClient: string
    cliente_avatar: string
    nombre: string
    avatar_pacient: string
    cliente_usermane: string
}