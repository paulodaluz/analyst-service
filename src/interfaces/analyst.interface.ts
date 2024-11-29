export interface CreateAnalystInterface {
  fullname: string;
  birthDay: string;
  documentNumber: string;
  gender: string;
  adress: AddressInterface;
  contact: ContactDataInterface;
}

export interface AnalystInterface {
  id: string;
  fullname: string;
  birthDay: string;
  documentNumber: string;
  gender: string;
  adress: AddressInterface;
  contact: ContactDataInterface;
}

export interface AddressInterface {
  street: string;
  number: number;
  city: string;
  state: string;
  postalCode: string;
}

export interface ContactDataInterface {
  phone: string;
  email: string;
  contactPreference: string;
}
