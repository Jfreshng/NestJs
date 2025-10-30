import { IsNotEmpty } from "class-validator";

export class CreateAddress {

    @IsNotEmpty()
    line1: string;

    line2?: string;
    zip?: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;
    
    @IsNotEmpty()
    country: string;
}