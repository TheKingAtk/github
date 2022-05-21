/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    uname :string;

    @Column()
    password: string;

    @Column()
    auth_code: string;
}