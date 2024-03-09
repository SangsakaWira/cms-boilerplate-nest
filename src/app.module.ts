import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { CategoryModule } from './category/category.module';
import { CategorizationModule } from './categorization/categorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    ContentModule,
    CategoryModule,
    CategorizationModule,
  ],
})
export class AppModule {}
