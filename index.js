const express = require('express')
const app = express()
const logger = require('./middleware/logger')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const books = require('./routes/books')
const categories = require('./routes/caregories')
const custumer = require('./routes/custumer')
const course = require('./routes/course')
const enrollment = require('./routes/enrollment')
const users = require('./routes/users')
const auth = require('./routes/auth')
const config=require('config')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(helmet())
app.use(logger)
app.set('view engine', 'pug')
app.use('/api/books', books)
app.use('/categories', categories)
app.use('/custumer', custumer)
app.use('/course', course)
app.use('/enrollment', enrollment)
app.use('/users', users)
app.use('/auth', auth)

// if (!config.get('jwtPrivateKey')) {
//   console.error('Jiddiy xato')
//   process.exit(1)
// }

// mongoose.set('strictQuery', false);
// mongoose.set('useFindAndModify', false)




app.get('/', (req, res) => {
  // const comFile=pug.compileFile('index.pug')
  res.render('index',
    {
      title: 'node-app',
      greeting: 'Assalomu alaykum'
    })
  // res.send('Asosiy sahifa')
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} portda ishlavotti`);
})

///////////////////////////

mongoose.connect('mongodb://127.0.0.1:27017/categories', { useNewUrlParser: true })
  .then(() => {
    console.log("Muvafaqqiyatli ulandi");
  })
  .catch((err) => {
    console.log("Xatolik mavjud=====>>", err);
  })

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

const Book = mongoose.model("Book", bookSchema);

async function createBook(name, author) {
  const book = new Book({
    name: name || "Temur tuzuklari",
    author: author || "Abbos G/'aybullayev",
    tags: ["Urush", "Dasturlash"],
    isPublished: true
  })
  const savedBook = await book.save()
  console.log(savedBook);
}
// createBook()

async function getBooks() {
  const books = await Book.find({ author: "Farhod Dadajonov" })
    .limit(2)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })

  console.log(books)

}
// getBooks()