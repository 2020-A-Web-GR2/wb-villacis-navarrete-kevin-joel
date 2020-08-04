import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query, Req, Res,
    Headers
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";


//juego - http
//http://localhost:3001/juegos-http

@Controller('juegos-http')
export class HttpJuegoController{

    @Get('hola')
    @HttpCode(201)
    hola(){
        throw new BadRequestException('No envia nada')
        //return 'Hola GET! :D'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'hola POST!'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete(){
        return 'hola POST!'

    }

    // http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        //isNaN(parametrosRuta.altura)
        //isNaN(parametrosRuta.edad)
        if (isNaN(parametrosRuta.altura) || isNaN(parametrosRuta.edad)){
            throw new BadRequestException('No son numeros')
        }else{
            console.log('Parametros', parametrosRuta);
            const edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura);
            return edad + altura;
        }

    }

    @Get('parametros-consulta')
        parametrosConsulta(
            @Query() parametrosDeConsulta
        ){
            const tieneNombreYApellido = parametrosDeConsulta.nombre && parametrosDeConsulta.apellido;
            console.log('parametrosDeCosnulta', parametrosDeConsulta);
            if (tieneNombreYApellido){
                return parametrosDeConsulta.nombre + ' ' + parametrosDeConsulta.apellido;
            }else{
                return '=)';
            }
        }

        @Post('parametros-cuerpo')
        @HttpCode(200)
        async parametrosCuerpo(
            @Body() parametrosDeCuerpo
        ){
            //Promesas- async
            const mascotaValida = new MascotaCreateDto();
            mascotaValida.casado = parametrosDeCuerpo.casado;
            mascotaValida.edad = parametrosDeCuerpo.edad;
            mascotaValida.ligada = parametrosDeCuerpo.ligada;
            mascotaValida.nombre = parametrosDeCuerpo.nombre;
            mascotaValida.peso = parametrosDeCuerpo.peso;
            try{
                const errores: ValidationError[] = await validate(mascotaValida);
                if(errores.length > 0){
                    console.error('Errores ', errores);
                    throw  new BadRequestException('Error validando');
                }else {
                    const mensajeCorrecto = {
                        mensaje: 'Se creo correctamente'
                    };
                    return mensajeCorrecto;
                }

            }catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error validando');
            }
        }

    //1.- guardar cookie insegura
    //2.- guardar cookie segura
    //3.- mostrar cookie

        @Get('guardarCookieInsegura')
        guardarCookieInsegura(
            @Query() parametrosConsulta,
            @Req() req, //request - peticion
            @Res() res //response - respuesta
        ){
            res.cookie(
                'galletaInsegura', //nombre
                'Tengo hambre', //valor
            );
            // no se puede usar el return con el uso de @Res()
            const mensaje = {
                mensaje: 'ok'
            };
            res.send(mensaje);
        }

        @Get('guardarCookieSegura')
        guardarCookieSegura(
            @Query() parametrosConsulta,
            @Req() req,
            @Res() res
        ){
            res.cookie(
                'galletaSegura', //nomnbre
                'Web :3', //valor
            {
                secure: true //deberia mandar en https
            }
        );
        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje)
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ){
        const mensaje ={
            sinFirmar : req.cookies,
            firmadas : req.signedCookies
        }
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,
        @Headers() headers //peticion - request
    ){
        console.log('Headers', headers);
        res.header('Cabecera', 'Dinamica'); //respuesta - responser
        res.cookie('firmada', 'poliburguer',{signed: true});
        const mensaje ={
            mensaje: 'ok'
        };
        res.send(mensaje);
    }
    

}

