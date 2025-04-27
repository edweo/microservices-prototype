package org.webber.flashcardsservice.models

import jakarta.persistence.*

@Embeddable
data class FlashcardGroupId(
    @Column(name = "username")
    val username: String = "",
    @Column(name = "group_name")
    val groupName: String = ""
)

@Entity
@Table(name = "flashcard_group")
class FlashcardGroup(
    @EmbeddedId val id: FlashcardGroupId = FlashcardGroupId(),
    @OneToMany(
        mappedBy = "flashcardGroup",
        cascade = [(CascadeType.ALL)],
        fetch = FetchType.LAZY
    )
    val flashcards: List<Flashcard> = listOf(),
)
