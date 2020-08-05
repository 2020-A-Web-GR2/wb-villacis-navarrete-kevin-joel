import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class UsuarioCreateDto{
    @IsNotEmpty()
    @IsAlpha()
    nombre: string;
}