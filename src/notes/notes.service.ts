// src/notes/notes.service.ts
import { Injectable } from '@nestjs/common';

export interface Note {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class NotesService {
  private notes: Note[] = [
    { id: 1, title: 'Pierwsza notatka', content: 'Treść pierwszej notatki' },
    { id: 2, title: 'Druga notatka', content: 'Treść drugiej notatki' },
  ];

  findAll(): Note[] {
    return this.notes;
  }

  create(title: string, content: string): Note {
    const newNote = {
      id: this.notes.length + 1,
      title,
      content,
    };
    this.notes.push(newNote);
    return newNote;
  }
}
