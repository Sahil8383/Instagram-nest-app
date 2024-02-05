import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env'}),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any,
        url: configService.get<string>('DATABASE_URL'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),

    UserModule, 
    AuthModule, PostModule, EmailModule
  ],
})
export class AppModule {}
