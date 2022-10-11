interface ICreateReportUserDTO {
    idActivity: string
    userId: string
    type: string
    title: string
    description: string
    value: number
    discipline?: string
}

export { ICreateReportUserDTO }