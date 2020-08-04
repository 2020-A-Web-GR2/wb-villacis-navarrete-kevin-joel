import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

@Controller('usuario')

export class UsuarioController{

    public arreglosUsuarios = [
        {
            id:1,
            nombre:"Joel"
        },
        {
            id:2,
            nombre:"Ama"
        },
        {
            id:3,
            nombre:"May"
        }
    ]
    public idActual = 3;

// mostrar todos los usuarios
    @Get()
    mostrarTodos(){
        return this.arreglosUsuarios
    }

// crear nuevo usuario
    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual +1,
            nombre: parametrosCuerpo.nombre
        };
        this.arreglosUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }
//ver uno

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arreglosUsuarios.findIndex(
            //usuario => usuario.id == Number(parametrosRuta.id)
            (usuario) => usuario.id == Number(parametrosRuta.id)
        )
        return this.arreglosUsuarios[indice]
    }

    //Editar uno ... revi
    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ) {
        const indice = this.arreglosUsuarios.findIndex(
            //usuario => usuario.id == Number(parametrosRuta.id)
            (usuario) => usuario.id == Number(parametrosRuta.id)
        );
        this.arreglosUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arreglosUsuarios[indice];
    }
    //Eliminar uno ... revi
    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ) {
        const indice = this.arreglosUsuarios.findIndex(
            //usuario => usuario.id == Number(parametrosRuta.id)
            (usuario) => usuario.id == Number(parametrosRuta.id)
        );
        this.arreglosUsuarios.splice(indice,  1);
        return this.arreglosUsuarios[indice];
    }

}