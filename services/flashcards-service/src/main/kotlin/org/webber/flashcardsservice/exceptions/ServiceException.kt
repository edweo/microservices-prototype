package org.webber.flashcardsservice.exceptions

import org.springframework.http.HttpStatus

class ServiceException(
    override val message: String,
    val statusCode: HttpStatus,
) : Exception() {

}