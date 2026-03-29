import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionInfo } from './session.types';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionService {
  private currentSession: SessionInfo | null = null;

  constructor(
    @InjectRepository(SessionEntity)
    private readonly repo: Repository<SessionEntity>,
  ) {}

  createSession(title: string): SessionInfo {
    const joinCode = Math.random().toString(36).slice(2, 8).toUpperCase();

    const entity = this.repo.create({
      title,
      joinCode,
    });

    const saved = this.repo.save(entity);

    // сохранение асинхронное, но для простоты возвращаем синхронно кэш (данные совпадут)
    this.currentSession = {
      id: entity.id,
      title: entity.title,
      createdAt: new Date().toISOString(),
      expiresAt: null,
      joinCode: entity.joinCode,
      assignmentFileName: null,
      assignmentText: null,
    };

    void saved.then((s) => {
      this.currentSession = {
        id: s.id,
        title: s.title,
        createdAt: s.createdAt.toISOString(),
        expiresAt: s.expiresAt ? s.expiresAt.toISOString() : null,
        joinCode: s.joinCode,
        assignmentFileName: s.assignmentFileName,
        assignmentText: s.assignmentText ?? null,
      };
    });

    return this.currentSession;
  }

  getCurrentSession(): SessionInfo | null {
    return this.currentSession;
  }

  setAssignmentFileName(fileName: string): void {
    if (!this.currentSession) {
      throw new Error('Session not created');
    }
    this.currentSession.assignmentFileName = fileName;
    void this.repo.update(
      { id: this.currentSession.id },
      { assignmentFileName: fileName },
    );
  }

  setAssignmentText(text: string | null): SessionInfo {
    if (!this.currentSession) {
      throw new Error('Session not created');
    }
    const trimmed = text && text.trim().length > 0 ? text.trim() : null;
    this.currentSession.assignmentText = trimmed;
    void this.repo.update(
      { id: this.currentSession.id },
      { assignmentText: trimmed },
    );
    return this.currentSession;
  }
}
