package org.webber.notesservice.services;

import org.webber.notesservice.dto.NewNote;
import org.webber.notesservice.dto.NoteDto;
import java.util.List;
import java.util.UUID;

public interface NotesService {
    List<NoteDto> getAllNotes(String username);
    NoteDto createNote(NewNote note, String username);
    boolean deleteNote(UUID noteId, String username);
    boolean updateNote(UUID id, String username, NewNote note);
}
