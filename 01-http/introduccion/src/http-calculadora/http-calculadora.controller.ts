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
    Query, Res
} from "@nestjs/common";

@Controller('calculadora-http')
export class HttpCalculadoraController{
    @Get('suma')
    @HttpCode(201)
    parametrosSuma(
        @Query() parametrosConsultaSuma
    ){
        const num1 = Number(parametrosConsultaSuma.n1);
        const num2 = Number(parametrosConsultaSuma.n2);
        if(isNaN(parametrosConsultaSuma.n1) && isNaN(parametrosConsultaSuma.n2) == true){
            throw new BadRequestException('No es numero')
        }else{
            return num1 + num2;
        }
    }

    @Put('resta')
    @HttpCode(201)
    parametrosresta(
        @Body() parametrosCuerpoResta,
        @Query() parametrosConsultaResta
    ){
        const num1 = Number(parametrosCuerpoResta.n1);
        const num2 = Number(parametrosConsultaResta.n2);
        if(isNaN(parametrosCuerpoResta.n1) || isNaN(parametrosConsultaResta.n2)){
            throw new BadRequestException('No es numero')
        }else{
            return num1 - num2;
        }
    }

    @Delete('multiplicacion')
    @HttpCode(200)
    parametrosMulti(
        @Headers() parametroCabeceraMulti,
        @Query() parametrosConsultaMulti
    ){
        const num1 = Number(parametroCabeceraMulti.n1);
        const num2 = Number(parametrosConsultaMulti.n2);
        if(isNaN(parametroCabeceraMulti.n1) || isNaN(parametrosConsultaMulti.n2)){
            throw new BadRequestException('No es numero')
        }else{
            return num1 * num2;
        }
    }

    @Post('division/:n1')
    @HttpCode(201)
    parametrosDiv(
        @Body() parametrosCuerpoDiv,
        @Param() parametrosRutaDiv
    ){
        const num1 = Number(parametrosRutaDiv.n1);
        const num2 = Number(parametrosCuerpoDiv.n2);
        if(isNaN(parametrosRutaDiv.n1) || isNaN(parametrosCuerpoDiv.n2)){
            throw new BadRequestException('No es numero')
        }else if(parametrosCuerpoDiv.n2 == 0){
            throw new BadRequestException('El divisor no puede ser cero')
        }else{
            return num1 / num2;
        }
    }

    @Get('guardarN')
    guardarN(
        @Query() parametrosConsulta,
        @Res() res
    ){
        res.cookie("nombre" , parametrosConsulta.nombre);
        res.cookie("usuario", parametrosConsulta.nombre,{signed: true});
        res.send({
            mensaje: 'Usuario Guardado'
        })
    }



}