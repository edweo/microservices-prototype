package org.webber.flashcardsservice.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class FlashcardGroupCountDto(
    @JsonProperty("group_name")
    val groupName: String,
    val count: Int
)
