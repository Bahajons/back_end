const mongoose = require('mongoose')







mongoose.connect('mongodb://127.0.0.1:27017/practise', { useNewUrlParser: true })
    .then(() => {
        console.log("Muvafaqqiyatli ulandi");
    })
    .catch((err) => {
        console.log("Xatolik mavjud=====>>", err);
    })



const Author = mongoose.model("Author", mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
}));

const Book = mongoose.model("Book", mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(firstname, lastname, email) {
    const author = new Author({
        firstname,
        lastname,
        email,
    })
    const saveAuthor = await author.save()
    console.log(saveAuthor);
}

async function createBook(title, authorId) {
    const book = new Book({
        title: title,
        author: authorId
    })
    const savedBook = await book.save()
    console.log(savedBook);
}

async function listBooks() {
    const books = await Book.find().populate('author','firstname -_id').select('title')

    console.log(books)
}

// createAuthor("Abbos", "Ruziev", "bahajonsroziyev@gmail.com")
// createBook('NodeJs asoslari','63c6bab988c74e5cadaeee39')

listBooks()
