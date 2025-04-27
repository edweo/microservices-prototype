package org.webber.flashcardsservice.models

import jakarta.persistence.*
import org.jetbrains.annotations.NotNull
import java.util.UUID

@Entity
@Table(name = "flashcard")
class Flashcard(
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,
    val prompt: String = "",
    val answer: String = "",
    @NotNull
    @ManyToOne
    @JoinColumns(
        JoinColumn(name = "username", referencedColumnName = "username"),
        JoinColumn(name = "group_name", referencedColumnName = "group_name")
    )
    val flashcardGroup: FlashcardGroup = FlashcardGroup(),
)
