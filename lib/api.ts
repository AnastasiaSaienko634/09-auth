import axios from "axios";
import type { Note } from "../types/note";
import type User from "../types/user";

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

interface CreateNoteResponse {
  note: Note;
}

interface CreateNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface DeleteNoteResponse {
  note: Note;
}

const nextServer = axios.create({
  baseURL: "http://localhost:3003/api",
  withCredentials: true,
});

export const fetchNotes = async (
  query: string,
  currentPage: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page: currentPage,
      perPage: 10,
      tag: tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await nextServer.get(`/notes/${noteId}`);
  return response.data;
};

export const createNote = async (
  note: CreateNote
): Promise<CreateNoteResponse> => {
  const response = await nextServer.post<CreateNoteResponse>("/notes", note);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<DeleteNoteResponse>(
    `/notes/${noteId}`
  );
  return response.data;
};

export const register = async (body: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", body);
  return response;
};

export const login = async (body: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", body);
  return response;
};
