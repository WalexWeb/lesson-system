import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { SubmissionModule } from './submission/submission.module';
import { RealtimeModule } from './realtime/realtime.module';
import { SessionEntity } from './session/session.entity';
import { SubmissionEntity } from './submission/submission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'lesson',
      password: process.env.DB_PASSWORD ?? 'lesson',
      database: process.env.DB_NAME ?? 'lesson',
      entities: [SessionEntity, SubmissionEntity],
      synchronize: true,
    }),
    SessionModule,
    SubmissionModule,
    RealtimeModule,
  ],
})
export class AppModule {}
