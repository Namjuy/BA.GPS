////Name   Date       Comments
////duypn  13/1/2024  create
export class User {

  userId: string = '';
  userName: string = '';
  passWordHash: string = '';
  fullName: string = '';
  dateOfBirth: Date = new Date();
  gender: number = 0;
  phoneNumber: number = 0;
  email: string = '';
  address: string = '';
  companyId: number = 0;
  creatorUserId: string = '';
  lastModifyUserId: string = '';
  createDate: Date = new Date();
  lastModifyDate: Date = new Date();
  isDeleted: boolean = false;
  deletedDate: Date = new Date();
  isSelected: boolean = false;
  isLog: boolean = false;

  constructor() {}
}
