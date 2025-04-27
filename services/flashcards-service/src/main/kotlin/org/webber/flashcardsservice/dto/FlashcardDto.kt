package org.webber.flashcardsservice.dto

import java.util.UUID

data class FlashcardDto(
    val id: UUID,
    val prompt: String,
    val answer: String
)
