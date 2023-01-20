const express = require('express')
const Joi = require('joi');
const router = express.Router()



const books = [
    {
        id: 1,
        name: 'Book1'
    },
    {
        id: 2,
        name: 'Book2'
    },
    {
        id: 3,
        name: 'Book3'
    },
    {
        id: 4,
        name: 'Book4'
    },
]

const schema = Joi.object({
    name: Joi.string().required().min(3)
});


router.get('/', (req, res) => {
    res.send(books)
})
router.post('/', (req, res) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details)
    }
    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book)
    res.status(201).send(book)
})

router.put('/:id', (req, res) => {
    const { error, value } = schema.validate(req.body);
    const book_by_id = books.find(b => b.id === parseInt(req.params.id))
    if (!book_by_id) {
        return res.status(400).send('Berilgan ID boyicha kitob yoq bratan')
    }
    if (error) {
        return res.status(400).send(error.details)
    }

    book_by_id.name = req.body.name;

    res.send(book_by_id)

})

router.delete('/:id', (req, res) => {
    //kitob id bo'yicha izlab topamiz
    //agar topilmasa 404
    const { error, value } = schema.validate(req.body);
    const book_by_id = books.find(b => b.id === parseInt(req.params.id))
    //topilmasa 404
    if (!book_by_id) {
        return res.status(400).send('Berilgan ID boyicha kitob yoq bratan')
    }
    //topilsa uni ochiramiz
    const bookIndex = books.indexOf(book_by_id)
    books.splice(bookIndex, 1)
    res.send(book_by_id)
})


router.get('/:id', (req, res) => {
    if (!book_by_id)
        res.status(404).send('Berilgan so\'rovdagi kitob topilmadi')

    res.send(book_by_id)
})



module.exports = router;


