package org.webber.flashcardsservice.controllers

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.web.bind.annotation.*
import org.webber.flashcardsservice.JwtUtils
import org.webber.flashcardsservice.dto.FlashcardCreatedDto
import org.webber.flashcardsservice.dto.FlashcardDto
import org.webber.flashcardsservice.dto.FlashcardGroupCountDto
import org.webber.flashcardsservice.dto.FlashcardGroupDto
import org.webber.flashcardsservice.services.FlashcardsService
import java.util.UUID

@RestController
@RequestMapping("/flashcards")
class FlashcardsController(
    private val flashcardsService: FlashcardsService
) {
    @GetMapping("/groups")
    fun getGroups(token: JwtAuthenticationToken): List<FlashcardGroupCountDto> {
        val username = JwtUtils.getUsername(token)
        return flashcardsService.getFlashcardGroups(username)
    }

    @PostMapping("/groups")
    fun createGroup(
        @RequestBody group: FlashcardGroupDto,
        token: JwtAuthenticationToken,
    ): FlashcardGroupDto {
        val username = JwtUtils.getUsername(token)
        return flashcardsService.createFlashcardGroup(group, username)
    }

    @DeleteMapping("/groups/{groupName}")
    fun deleteGroup() {
        // TODO
    }

    @GetMapping("/groups/{groupName}")
    fun getFlashcardsByGroup(
        @PathVariable groupName: String,
        token: JwtAuthenticationToken
    ): List<FlashcardDto> {
        val username = JwtUtils.getUsername(token)
        val group = FlashcardGroupDto(groupName)
        return flashcardsService.getFlashcardsInGroup(group, username)
    }

    @PostMapping("/groups/{groupName}")
    fun createFlashcard(
        @PathVariable groupName: String,
        @RequestBody flashcard: FlashcardCreatedDto,
        token: JwtAuthenticationToken,
    ): FlashcardDto {
        val username = JwtUtils.getUsername(token)
        val group = FlashcardGroupDto(groupName)
        return flashcardsService.createFlashCard(flashcard, group, username)
    }


    @DeleteMapping("/groups/{groupName}/{flashcardId}")
    fun deleteFlashcardInGroup(
        @PathVariable groupName: String,
        @PathVariable flashcardId: UUID,
        token: JwtAuthenticationToken,
    ) {
        val username = JwtUtils.getUsername(token)
        flashcardsService.deleteFlashcardInGroup(flashcardId, groupName, username)
    }
}