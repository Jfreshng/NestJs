import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id'
    })
    id: number;

    @Column({
        nullable: false,
    })
    username: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: '',
    })
    emailAddress: string;

    @Column({
        nullable: false,
        default: false,
    })
    password: string;

    @Column({
        name: 'created_date',
        type: 'datetime',
        default: () => 'GETDATE()', // SQL Server built-in function
        nullable: false,
    })
    createdDate: Date;


}