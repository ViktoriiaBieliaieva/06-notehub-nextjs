import axios from 'axios';
import type Note from '../types/note';
import type { NoteId } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(value: string, page: number): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      search: value,
      page: page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}

export async function deleteNote(id: NoteId) {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}

export async function createNote(noteData: Pick<Note, 'title' | 'content' | 'tag'>) {
  const { data } = await axios.post<Note>('/notes', noteData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}
