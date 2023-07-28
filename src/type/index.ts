import { ERROR } from "../errors";

type GenderType = "w" | "m" | "" ;
type AgeType = 10 | 20 | 30 | 40 | 50 ;
type SexPrefType = 0 | 1 | 2; // 0: 이성애자, 1: 양성애자, 2: 동성애자 

export interface ResponseForm<T> {
    status: true;
    message?: string;
    data: T;
  }
export type Try<T> = ResponseForm<T>;

type FailureResponseType = {
    status: false;
    httpCode?: number;
    message?: string;
};

type SuccessResponseType = {
    status: true;
    httpCode?:number;
    message?:string;
    data?:any;
}

export interface ErrorForm<T> {
    status:false;
    message ?:string;
}

type ResponseType = FailureResponseType | SuccessResponseType;
export type Catch<T> = ErrorForm<T>;
export type TryCatch<T, E extends ERROR> = ResponseForm<T> | ErrorForm<E>;

export type {
    GenderType,
    AgeType,
    SexPrefType,
    ResponseType
}