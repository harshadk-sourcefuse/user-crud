import { UserModel } from "../class/UserModel";
import { Role } from "../Constants";
import { Model } from "./Model";

export interface User<T,U> extends Model<U>{

    firstName:T;
    middleName:T;
    lastName:T;
    email:T;
    phoneNumber:T;
    address:T;
    role:Role;
    currentState?:UserModel<T,U>;
}