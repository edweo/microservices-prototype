package org.webber.flashcardsservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FlashcardsService

fun main(args: Array<String>) {
	runApplication<FlashcardsService>(*args)
}
