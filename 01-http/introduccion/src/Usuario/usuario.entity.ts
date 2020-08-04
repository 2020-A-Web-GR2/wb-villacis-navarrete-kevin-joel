import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Index([
    //nombre de las propiedades en la clase
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento'
])

//Indice compuesto no permite que mas de un usuario tenga el mismo nombre apellido y cedula
@Index(
    ['nombre', 'apellido', 'cedula'],
    {unique: true}

)

@Entity('db_usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true, //sin negativos
        comment: 'Identificador'
    })
    id: number

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true,
        length: 60
    })
    nombre?: string;

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: 60
    })
    apellido?: string;


    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula: string;

    @Column({
        nullable: true,
        type: 'decimal',
        precision: 10, //10000000000.
        scale: 4 // .0001

    })
    sueldo?: number;

    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?: string;
}