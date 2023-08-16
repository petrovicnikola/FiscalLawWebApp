import {BillItem} from './bill_item';

export class Bill{
    username: String;
    money: Number;
    toPay: Number;
    inTaxes:Number;
    billItems: Array<BillItem>
    identifierNumber: String;
    buyerName: String;
    buyerSurname: String;
    slipNumber: String;
    purchaser: String;
    date: Date;
    type: String;
    firmName: String;
    objectName: String;
    
}