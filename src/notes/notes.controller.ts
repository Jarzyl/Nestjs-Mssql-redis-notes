import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ) {
    const { title, content } = body;
    return this.notesService.update(Number(id), title, content);
  }
}
