export enum Role {
    SUPER_ADMIN = 'Super Admin',
    SUBSCRIBER = 'Subscriber',
    ADMIN = 'Admin'
}

export class Constants{

    public static readonly Default_Users = [{
        id:1,
        address:"ABC Street 1, India",
        createdOn: new Date(),
        email:"user.1@gmail.com",
        firstName:"User",
        lastName:"One",
        middleName:"",
        phoneNumber:"9874893892",
        role: Role.SUBSCRIBER
    },{
        id:2,
        address:"ABC Street 2, India",
        createdOn: new Date(),
        email:"user.2@gmail.com",
        firstName:"User",
        lastName:"Two",
        middleName:"",
        phoneNumber:"7979873675",
        role: Role.SUBSCRIBER
    },{
        id:3,
        address:"ABC Street 3, India",
        createdOn: new Date(),
        email:"user.3@gmail.com",
        firstName:"User",
        lastName:"Three",
        middleName:"",
        phoneNumber:"8927984933",
        role: Role.SUPER_ADMIN
    },{
        id:4,
        address:"ABC Street 4, India",
        createdOn: new Date(),
        email:"user.4@gmail.com",
        firstName:"User",
        lastName:"Four",
        middleName:"",
        phoneNumber:"8942378453",
        role: Role.ADMIN
    }]
}