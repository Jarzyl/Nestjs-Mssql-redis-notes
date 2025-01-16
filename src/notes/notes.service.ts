import { Injectable, Logger, NotFoundException } from '@nestjs/common';

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
    // Logger.log(this.notes);
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

  delete(id: number): void {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new NotFoundException('Notatka nie została znaleziona.');
    }
    this.notes.splice(noteIndex, 1);
  }

  update(id: number, title: string, content: string): Note {
    const note = this.notes.find(note => note.id === id);
    if (!note) {
      throw new NotFoundException('Notatka nie została znaleziona.');
    }
    note.title = title;
    note.content = content;
    return note;
  }
}
