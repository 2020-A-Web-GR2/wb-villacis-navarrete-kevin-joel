import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query, Req, Res
} from "@nestjs/common";

@Controller('calculadora-http')
export class HttpCalculadoraController{
    @Get('suma')
    @HttpCode(200)
    parametrosSuma(
        @Query() parametrosConsultaSuma,
        @Req() req,
        @Res() res
    ){
        const n1 = Number(parametrosConsultaSuma.n1);
        const n2 = Number(parametrosConsultaSuma.n2);
        if(isNaN(parametrosConsultaSuma.n1) && isNaN(parametrosConsultaSuma.n2)){
            throw new BadRequestException('No son numeros')
        }else{
            if(req.cookies.nombre){
                const resul = n1 + n2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resul);
                if(puntaje <= 0){
                    res.cookie(
                        'puntaje',
                        100,
                        {
                            signed:true
                        }
                    );
                    const mensaje ={
                        'El resultado de': n1 + ' + ' + n2 + ' es ' + resul,
                        puntaje:  'oh no!'+ req.cookies.nombre +' ,te agotaste el puntaje, este se restablecera con 100'
                    };
                    res.send(mensaje)
                }else{
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {
                            signed:true
                        }
                    );
                    const mensaje = {
                        'El resultado de': n1 + ' + ' + n2 + ' es ' + resul,
                        'Su puntaje actual es': puntaje
                    };
                    res.send(mensaje);
                }
            }else{
                throw new BadRequestException('No existe el usuario')
            }
        }




    }

    @Put('resta')
    @HttpCode(201)
    parametrosresta(
        @Body() parametrosCuerpoResta,
        @Query() parametrosConsultaResta,
        @Req() req,
        @Res() res
    ){
        const n1 = Number(parametrosCuerpoResta.n1);
        const n2 = Number(parametrosConsultaResta.n2);
        if(isNaN(parametrosCuerpoResta.n1) && isNaN(parametrosConsultaResta.n2)){
            throw new BadRequestException('No son numero')
        }else{
            if(req.cookies.nombre){
                const resul = n1 - n2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resul);
                if(puntaje <= 0){
                    res.cookie(
                        'puntaje',
                        100,
                        {
                            signed:true
                        }
                    );
                    const mensaje ={
                        'El resultado de': n1 + ' - ' + n2 + ' es ' + resul,
                        puntaje:  'oh no!'+ req.cookies.nombre +' ,te agotaste el puntaje, este se restablecera con 100'
                    };
                    res.send(mensaje);
                }else{
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {
                            signed:true
                        }
                    );
                    const mensaje = {
                        'El resultado de': n1 + ' - ' + n2 + ' es ' + resul,
                        'Su puntaje actual es': puntaje
                    };
                    res.send(mensaje);
                }
            }else{
                throw new BadRequestException('No existe el usuario')
            }

        }
    }

    @Delete('multiplicacion')
    @HttpCode(200)
    parametrosMulti(
        @Headers() parametroCabeceraMulti,
        @Query() parametrosConsultaMulti,
        @Req() req,
        @Res() res
    ){
        const n1 = Number(parametroCabeceraMulti.n1);
        const n2 = Number(parametrosConsultaMulti.n2);
        if(isNaN(parametroCabeceraMulti.n1) && isNaN(parametrosConsultaMulti.n2)){
            throw new BadRequestException('No son numero')
        }else{
            if(req.cookies.nombre){
                const resul = n1 * n2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resul);
                if(puntaje <= 0){
                    res.cookie(
                        'puntaje',
                        100,
                        {
                            signed:true
                        }
                    );
                    const mensaje ={
                        'El resultado de': n1 + ' * ' + n2 + ' es ' + resul,
                        puntaje:  'oh no!'+ req.cookies.nombre +' ,te agotaste el puntaje, este se restablecera con 100'
                    };
                    res.send(mensaje);
                }else{
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {
                            signed:true
                        }
                    );
                    const mensaje = {
                        'El resultado de': n1 + ' * ' + n2 + ' es ' + resul,
                        'Su puntaje actual es': puntaje
                    };
                    res.send(mensaje);
                }
            }else{
                throw new BadRequestException('No existe el usuario')
            }

        }
    }



    @Post('division/:n1')
    @HttpCode(201)
    parametrosDiv(
        @Body() parametrosCuerpoDiv,
        @Param() parametrosRutaDiv,
        @Req() req,
        @Res() res
    ){
        const n1 = Number(parametrosRutaDiv.n1);
        const n2 = Number(parametrosCuerpoDiv.n2);
        if(isNaN(parametrosRutaDiv.n1) && isNaN(parametrosCuerpoDiv.n2)){
            throw new BadRequestException('No es numero')
        }else if(parametrosCuerpoDiv.n2 == 0){
            throw new BadRequestException('El divisor no puede ser cero')
        }else{
            if(req.cookies.nombre){
                const resul = n1 / n2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resul);
                if(puntaje <= 0){
                    res.cookie(
                        'puntaje',
                        100,
                        {
                            signed:true
                        }
                    );
                    const mensaje ={
                        'El resultado de': n1 + ' / ' + n2 + ' es ' + resul,
                        puntaje:  'oh no!'+ req.cookies.nombre +' ,te agotaste el puntaje, este se restablecera con 100'
                    };
                    res.send(mensaje);
                }else{
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {
                            signed:true
                        }
                    );
                    const mensaje = {
                        'El resultado de': n1 + ' / ' + n2 + ' es ' + resul,
                        'Su puntaje actual es': puntaje
                    };
                    res.send(mensaje);
                }
            }else{
                throw new BadRequestException('No existe el usuario')
            }
        }
    }

    @Get('guardarUsuario')
    @HttpCode(200)
    guardarUsuario(
        @Query() nombreUsuario,
        @Res() res,
        @Req() req
    ){
        res.cookie(
            'nombre',
            nombreUsuario.nombre
        );
        res.cookie(
            'puntaje',
            100,
            {
                signed: true
            }
        );
        res.send({
            mensaje: 'Usuario Guardado'
        })
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



}