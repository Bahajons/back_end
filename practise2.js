const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/practise2', { useNewUrlParser: true })
  .then(() => {
    console.log("Muvafaqqiyatli ulandi");
  })
  .catch((err) => {
    console.log("Xatolik mavjud=====>>", err);
  })

const authorSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
})

const bookSchema = mongoose.Schema({
  title: String,
  author: {
    type: [authorSchema],
    required: true
  }
})

const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);

async function createAuthor(firstname, lastname, email) {
  const author = new Author({
    firstname,
    lastname,
    email,
  })
  const saveAuthor = await author.save()
  console.log(saveAuthor);
}

async function createBook(title, author) {
  const book = new Book({
    title,
    author
  })
  const savedBook = await book.save()
  console.log(savedBook);
}

async function listBooks() {
  const books = await Book.find().populate('author', 'firstname -_id').select('title')

  console.log(books)
}

// createAuthor("Abbos", "Ruziev", "bahajonsroziyev@gmail.com")

createBook('NodeJs asoslari', [
  new Author({
    firstname: 'Abbos',
    lastname: 'Rustamov',
    email: 'rustamov@gmail.com'
  }),
  new Author({
    firstname: 'Farrux',
    lastname: 'Rustamov',
    email: 'rustamov@gmail.com'
  }),
  new Author({
    firstname: 'Abdug\'ani',
    lastname: 'Rustamov',
    email: 'rustamov@gmail.com'
  })
]

)

// listBooks()

async function updateAuthor(bookId) {
  await Book.updateOne({ _id: bookId }, {
    $unset: {
      'author': ''
    }
  }).then((res) => {
    console.log(res);
  })
}
// updateAuthor('63c6e80f2c8d44a96717cfea')