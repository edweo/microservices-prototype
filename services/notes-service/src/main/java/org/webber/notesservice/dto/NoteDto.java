package org.webber.notesservice.dto;

import java.util.UUID;

public record NoteDto(UUID id, String title, String description) {
}
