export interface ITask{
    id:number,
    name:string,
    status:string,
    created_at:Date,
}

export interface ITaskPaginted{
    count:number,
    next:string,
    previous:string,
    results: ITask[],
}

export interface IAuthResponse{
    token: string,
    user_id: number,
    username: string,
    is_superuser: string
}

export interface ISupplement{
    id: number,
    title: string,
    description: string
}

export interface ISupplementPaginted{
    count:number,
    next: string,
    previous:string,
    results: ISupplement[],
}

export interface IDiet{
    id: number,
    title: string,
    description: string
}

export interface IDietPaginated{
    count:number,
    next: string,
    previous:string,
    results:IDiet[],
}

export interface IRegResponse{
    token: string,
    user_id: number,
    username: string
}

export interface IExerciseCategory{
    id: number,
    name: string
}

export interface IProfile{
    id: number,
    first_name: string,
    second_name: string,
    task_count: number,
    overall_body_test: number,
    allergies: string,
    blood_pressure: string,
}

export interface IUserProfileList{
    id: number,
    username: string,
    email: string,
    is_superuser: string
}

export interface IExercise{
    id: number,
    title: string,
    photo_link: string,
    equipment_needed: string,
    how_to_do_tips:string
}
