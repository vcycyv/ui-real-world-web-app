import axios from 'axios';

export const bookService = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
}

function getBooks() {
    return axios.get('/books')
}

function getBook(id) {
    return axios.get('/books/' + id)
}

function createBook(books) {
    return axios.post('/books', {"name": books})
}

function updateBook(books) {
    return axios.put('/books/' + books.id, books)
}

function deleteBook(id) {
    return axios.delete('/books/' + id)
}
