package org.webber.flashcardsservice.repositories

import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.ListCrudRepository
import org.springframework.transaction.annotation.Transactional
import org.webber.flashcardsservice.dto.FlashcardGroupDto
import org.webber.flashcardsservice.models.Flashcard
import org.webber.flashcardsservice.models.FlashcardGroupId
import java.util.UUID

interface FlashcardRepository : ListCrudRepository<Flashcard, UUID> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Flashcard a WHERE a.flashcardGroup.id = :group AND a.id = :id ")
    fun deleteFlashcardInGroup(id: UUID, group: FlashcardGroupId): Int
}