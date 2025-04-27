package org.webber.notesservice.mappers;

import org.webber.notesservice.dto.NoteDto;
import org.webber.notesservice.models.Note;

public final class NoteMapper {

    private NoteMapper() {}

    public static NoteDto toNoteDto(Note note) {
        return new NoteDto(note.id(), note.title(), note.description());
    }
}
