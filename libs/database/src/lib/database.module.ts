import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                port: configService.getOrThrow('POSTGRES_PORT'),
                host: configService.getOrThrow('POSTGRES_HOST'),
                database: configService.getOrThrow('POSTGRES_DB'),
                username: configService.getOrThrow('POSTGRES_USER'),
                password: configService.getOrThrow('POSTGRES_PASSWORD'),
                synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
                autoLoadEntities: true,

            }),
            inject: [ConfigService]
        })
    ]
})
export class DataBaseModule {
    static forFeature(models: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(models);
    }
}