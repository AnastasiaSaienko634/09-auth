import axios from "axios";
import type { Note } from "../types/note";

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export interface User {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
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
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const VITE_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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
  console.log(response.data);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await nextServer.get(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (
  note: CreateNote
): Promise<CreateNoteResponse> => {
  const response = await nextServer.post<CreateNoteResponse>("/notes", note, {
    headers: {
      Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<DeleteNoteResponse>(
    `/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};
