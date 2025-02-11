import { TAcademicSemester } from "./academicManagement.type"

export type TRegisteredSemester = {
    _id: string
    academicSemester: TAcademicSemester;
    status: string
    startDate: string
    endDate: string
    minCredit: number
    maxCredit: number
    createdAt: string
    updatedAt: string
}
export type TCourses = {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    preRequisiteCourses: TPreRequisiteCourse[]
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}

export type TPreRequisiteCourse = {
    course: TCourse
    isDeleted: boolean
}

export type TCourse = {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}