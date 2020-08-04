import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from './http/http-juego.module';
import {HttpCalculadoraModule} from "./http-calculadora/http-calculadora.module";
import {UsuarioModule} from "./Usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./Usuario/usuario.entity";


@Module({
  imports: [
      // aqui van otros modulos
      HttpJuegoModule,
      HttpCalculadoraModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default', //nombre de la conexion
          type: 'mysql',  // mysql
          host: 'localhost', //ip
          port: 3306, // puerto
          username: 'root', //usuario
          password: 'root', //password
          database: 'test',  //Base de datos
          entities: [ //Todas las entidades que se va a conectar
                UsuarioEntity
          ],
          synchronize: true, //actualiza el esquema de la base de datos
          dropSchema: false, //Elimina los datos y esquema de bases de datos
      }),
  ],
  controllers: [
      //controladores APP MODULE
      AppController,

  ],
  providers: [
      //Servicios app module
      AppService],
})
export class AppModule {}
