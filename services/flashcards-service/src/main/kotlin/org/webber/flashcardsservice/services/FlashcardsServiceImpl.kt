package org.webber.flashcardsservice.services

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.webber.flashcardsservice.dto.FlashcardCreatedDto
import org.webber.flashcardsservice.dto.FlashcardDto
import org.webber.flashcardsservice.dto.FlashcardGroupCountDto
import org.webber.flashcardsservice.dto.FlashcardGroupDto
import org.webber.flashcardsservice.exceptions.ServiceException
import org.webber.flashcardsservice.models.Flashcard
import org.webber.flashcardsservice.models.FlashcardGroup
import org.webber.flashcardsservice.models.FlashcardGroupId
import org.webber.flashcardsservice.repositories.FlashcardGroupRepository
import org.webber.flashcardsservice.repositories.FlashcardRepository
import java.util.*
import kotlin.jvm.optionals.getOrNull

@Service
class FlashcardsServiceImpl(
    private val flashcardGroupRepository: FlashcardGroupRepository,
    private val flashcardRepository: FlashcardRepository
) : FlashcardsService {
    override fun createFlashcardGroup(flashcardGroup: FlashcardGroupDto, username: String): FlashcardGroupDto {
        val id = FlashcardGroupId(username, flashcardGroup.groupName)
        val exists = flashcardGroupRepository.findById(id)
        if (!exists.isPresent) {
            val newGroup = FlashcardGroup(id)
            flashcardGroupRepository.save(newGroup)
            return flashcardGroup
        }
        throw ServiceException("Group already exists", HttpStatus.BAD_REQUEST)
    }

    override fun getFlashcardGroups(username: String): List<FlashcardGroupCountDto> {
        return flashcardGroupRepository.findAllByUsername(username)
            .map { f -> FlashcardGroupCountDto(f.id.groupName, f.flashcards.size) }
    }

    override fun createFlashCard(flashcard: FlashcardCreatedDto, group: FlashcardGroupDto, username: String): FlashcardDto {
        val existingGroup = getFlashcardGroup(group, username)
        if (existingGroup != null) {
            var newFlashcard = Flashcard(prompt = flashcard.prompt, answer = flashcard.answer, flashcardGroup = existingGroup)
            newFlashcard = flashcardRepository.save(newFlashcard)
            return FlashcardDto(id = newFlashcard.id!!, prompt = newFlashcard.prompt, answer = newFlashcard.answer)
        }
        throw ServiceException("Group doesn't exist", HttpStatus.BAD_REQUEST)
    }

    override fun getFlashcardsInGroup(group: FlashcardGroupDto, username: String): List<FlashcardDto> {
        val existingGroup = getFlashcardGroup(group, username)
        if (existingGroup != null) {
            return existingGroup.flashcards.map {
                flashcard -> FlashcardDto(flashcard.id!!, flashcard.prompt, flashcard.answer)
            }
        }
        throw ServiceException("Group doesn't exist", HttpStatus.BAD_REQUEST)
    }

    override fun deleteFlashcardInGroup(flashcardId: UUID, group: String, username: String) {
        val groupId = FlashcardGroupId(username = username, groupName = group)
        val deleted = flashcardRepository.deleteFlashcardInGroup(flashcardId, groupId)
        if (deleted != 1) throw ServiceException("Bad request", HttpStatus.BAD_REQUEST)
    }

    private fun getFlashcardGroup(flashcardGroup: FlashcardGroupDto, username: String): FlashcardGroup? {
        val id = FlashcardGroupId(username, flashcardGroup.groupName)
        return flashcardGroupRepository.findById(id).getOrNull()
    }
}