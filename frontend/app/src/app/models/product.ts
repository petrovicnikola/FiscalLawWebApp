import { Category } from "./category";

export class Product {
    code: String;
    name: String;
    unitOfMeasure: String;
    tax: Number;
    type: String; // Hrana/pice/sirovina, samo kod ugostitelja
    // Neobavezni podaci
    countryOfOrigin: String;
    foreignName: String;
    barCode: String;
    producer: String;
    customTariff: Number;
    ecoTax: Boolean;
    akciza: Boolean;
    minWantedAmount: Number;
    maxWantedAmount: Number;
    description: String;
    declaration: String;
    username: String;
    objects: Array<Object>;
    category: Category;
    hasImg: Boolean;
}