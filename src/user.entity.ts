import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    Name: string;

    @Column({ default: true })
    isActive: boolean;
}