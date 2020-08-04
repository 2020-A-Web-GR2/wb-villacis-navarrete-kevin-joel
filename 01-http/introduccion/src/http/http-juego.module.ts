// @nombre() -> Decorador
import {Module} from "@nestjs/common";
import {HttpJuegoController} from './http-juego.controller';


@Module({
    imports:[],
    controllers: [
        //controladores app module
        HttpJuegoController
    ],
    providers: [],
})
export class HttpJuegoModule{
}