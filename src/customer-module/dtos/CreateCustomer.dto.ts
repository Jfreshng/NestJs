import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumberString, IsOptional, ValidateNested } from "class-validator";
import { CreateAddress } from "./CreateAddress.dto";

export class CreateCustomerDto {
    @IsNumberString()
    customerId: number;
    @IsNotEmpty()
    customerName: string;
    @IsEmail()
    customerEmail: string;

    // @ValidateNested()
    // @Type(() => CreateAddress)
    // @IsNotEmptyObject()
    customerAddress: string; //CreateCustomerDto;

    customerPhone: string;
    customerFax: string;
    customerFirstName: string;
    customerLastName: string;
    customerSalutation: string;
    CustomerTypeID: string;
    CustomerClassId: string;

    // @IsDate()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    CustomerSince: string;
}


// validate using annotations/decorators