export type CreateUserType = {
    username: string
    email: string
    password: string
}

export type UpdateUserType = {
    username: string
    email: string
    password: string
}

export type CreateUserProfileType = {
    firstName: string;
    lastName: string
    age: number
    dob: string
}

export type CreateUserPostType = {
    title: string
    description: string
    userId: number
}