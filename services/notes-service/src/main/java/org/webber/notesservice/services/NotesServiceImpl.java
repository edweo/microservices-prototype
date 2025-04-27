package org.webber.notesservice.services;

import org.springframework.stereotype.Service;
import org.webber.notesservice.dto.NewNote;
import org.webber.notesservice.dto.NoteDto;
import org.webber.notesservice.mappers.NoteMapper;
import org.webber.notesservice.models.Note;
import org.webber.notesservice.repositories.NoteRepository;

import java.util.List;
import java.util.UUID;

@Service
public class NotesServiceImpl implements NotesService {

    private final NoteRepository noteRepository;

    public NotesServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public List<NoteDto> getAllNotes(String username) {
        try {
            return noteRepository.findAllByUsername(username)
                    .stream()
                    .map(NoteMapper::toNoteDto).toList();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public NoteDto createNote(NewNote note, String username) {
        try {
            var newNote = new Note(null, username, note.title(), note.description());
            return NoteMapper.toNoteDto(noteRepository.save(newNote));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteNote(UUID noteId, String username) {
        try {
            return noteRepository.deleteNoteByIdAndUsername(noteId, username);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean updateNote(UUID id, String username, NewNote note) {
        try {
            return noteRepository.updateNote(id, username, note.title(), note.description());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
