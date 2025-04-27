package org.webber.flashcardsservice.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class FlashcardGroupDto(
    @JsonProperty("group_name")
    val groupName: String
)
