package org.webber.notesservice.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import java.util.UUID;

@Table("note")
public record Note(
        @Id UUID id,
        String username,
        String title,
        String description
) {

}