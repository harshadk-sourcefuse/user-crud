import { Role } from "../Constants";
import { User } from "../interface/User";
import 'reflect-metadata';

const formatDate = (target: Object, propertyKey: string | symbol) => {
  let value: string;
  const getter = () => {
    return value;
  };
  const setter = (newVal: string) => {
    console.log(newVal, this)
    if (!/ˆ[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/.test(newVal)) {
      var date = new Date(newVal);
      value = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("-");
    }
  }
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter
  });
};

export class UserModel<T, U> implements User<T, U>{
  id!: U;
  firstName!: T;
  middleName!: T;
  lastName!: T;
  email!: T;
  phoneNumber!: T;
  address!: T;
  role!: Role;
  currentState?: UserModel<T, U>;
  @formatDate
  createdOn!: String;
  modifiedOn?: String;

}