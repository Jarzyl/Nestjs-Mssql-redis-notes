// src/notes/notes.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // Endpoint GET - pobieranie wszystkich notatek
  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  // Endpoint POST - tworzenie nowej notatki
  @Post()
  create(@Body() body: { title: string; content: string }) {
    const { title, content } = body;
    return this.notesService.create(title, content);
  }
}
