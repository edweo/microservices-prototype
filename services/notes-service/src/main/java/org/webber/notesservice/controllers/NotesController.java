package org.webber.notesservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.webber.notesservice.dto.NewNote;
import org.webber.notesservice.dto.NoteDto;
import org.webber.notesservice.services.NotesService;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notes")
public class NotesController {

    private final NotesService notesService;

    public NotesController(NotesService notesService) {
        this.notesService = notesService;
    }

    @GetMapping
    public List<NoteDto> getNotes(JwtAuthenticationToken token) {
        String username = org.webber.notesservice.JwtUtils.getUsername(token);
        System.out.println("getNotes called by " + username);
        return notesService.getAllNotes(username);
    }

    @PostMapping
    public NoteDto createNote(@RequestBody NewNote note, JwtAuthenticationToken token) {
        String username = org.webber.notesservice.JwtUtils.getUsername(token);
        return notesService.createNote(note, username);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") UUID id, JwtAuthenticationToken token) {
        String username = org.webber.notesservice.JwtUtils.getUsername(token);
        var deleted = notesService.deleteNote(id, username);
        if (deleted) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNote(@PathVariable("id") UUID id, @RequestBody NewNote note, JwtAuthenticationToken token) {
        String username = org.webber.notesservice.JwtUtils.getUsername(token);
        var updated = notesService.updateNote(id, username, note);
        if (updated) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
     }
}
