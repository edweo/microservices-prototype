package org.webber.flashcardsservice.services

import org.webber.flashcardsservice.dto.FlashcardCreatedDto
import org.webber.flashcardsservice.dto.FlashcardDto
import org.webber.flashcardsservice.dto.FlashcardGroupCountDto
import org.webber.flashcardsservice.dto.FlashcardGroupDto
import java.util.UUID

interface FlashcardsService {
    fun createFlashcardGroup(flashcardGroup: FlashcardGroupDto, username: String): FlashcardGroupDto
    fun getFlashcardGroups(username: String): List<FlashcardGroupCountDto>
    fun createFlashCard(flashcard: FlashcardCreatedDto, group: FlashcardGroupDto, username: String): FlashcardDto
    fun getFlashcardsInGroup(group: FlashcardGroupDto, username: String): List<FlashcardDto>
    fun deleteFlashcardInGroup(flashcardId: UUID, group: String, username: String)
}