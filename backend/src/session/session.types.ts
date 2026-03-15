export interface SessionInfo {
  id: string;
  title: string;
  createdAt: string;
  expiresAt: string | null;
  joinCode: string;
  assignmentFileName: string | null;
}

