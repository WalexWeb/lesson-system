import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SubmissionInfo } from '../submission/submission.types';

@WebSocketGateway({
  namespace: '/teacher',
  cors: {
    origin: true,
    credentials: true,
  },
})
export class RealtimeGateway {
  @WebSocketServer()
  server!: Server;

  emitNewSubmission(submission: SubmissionInfo) {
    this.server.emit('submissionCreated', submission);
  }
}

