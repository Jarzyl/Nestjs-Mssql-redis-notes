import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllForUser(userId: number): Promise<Note[]> {
    const notes = await this.notesRepository.find({
      where: { user: { id: userId } }, // Filter by user Id
      select: ['id', 'title', 'content'], // Only note data
      relations: [], // No relations
    });
  
    console.log('Fetched notes:', notes); // Simple console log
    return notes;
  }
  
  // Fetch all notes (for all users)
  findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const user = await this.usersRepository.findOne({
      where: { id: createNoteDto.userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const newNote = this.notesRepository.create({
      ...createNoteDto, 
      user: { id: user.id },  // Pass only user id
    });
    console.log('Note to save:', newNote);
    return this.notesRepository.save(newNote);
  }
  
  async delete(id: number): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Note not found.');
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.notesRepository.preload({
      id,
      ...updateNoteDto,
    });

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return this.notesRepository.save(note);
  }
}
