package org.webber.notesservice.repositories;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.webber.notesservice.models.Note;

import java.util.List;
import java.util.UUID;

public interface NoteRepository extends ListCrudRepository<Note, UUID> {

    List<Note> findAllByUsername(String username);

    @Modifying
    @Query("DELETE FROM note where id = :id and username = :username")
    boolean deleteNoteByIdAndUsername(UUID id, String username);

    @Modifying
    @Query("UPDATE note SET title = :title, description = :description WHERE id = :id AND username = :username")
    boolean updateNote(UUID id, String username, String title, String description);
}
