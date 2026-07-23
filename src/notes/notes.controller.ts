import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard) // Endpoint secure for unauthorized user
  @Get()
  findAll(@Req() req) {
    const userId = req.user.userId; // User ID from Token
    return this.notesService.findAllForUser(userId); // Fetch all notes for user
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(Number(id), updateNoteDto);
  }
}
