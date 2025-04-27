package org.webber.flashcardsservice.repositories

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.ListCrudRepository
import org.springframework.stereotype.Repository
import org.webber.flashcardsservice.models.FlashcardGroup
import org.webber.flashcardsservice.models.FlashcardGroupId

@Repository
interface FlashcardGroupRepository: ListCrudRepository<FlashcardGroup, FlashcardGroupId> {

    @Query("SELECT a FROM FlashcardGroup a WHERE a.id.username = :username")
    fun findAllByUsername(username: String): List<FlashcardGroup>
}