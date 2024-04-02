const jwt = require('jsonwebtoken')
const multer = require('multer')

//פונקציה שמסננת את סוגי הקבצים שאפשר להעלות
const fileFilter = (req, file, cb) => {
    //במקרה שלנו נאפשר רק קבצי בסיומת תמונה
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //true אם הקובץ מסוג מתאים נחזיר 
        cb(null, true)
    }
    //ואם לא - false
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = {
    categoryExists: (req, res, next) => {
        const _id = req.body.category

        Category.findById(_id)
            .then(category => {
                if (!category) {
                    res.status(404).send({ error: `category not found!` })
                }
                next()
            })
            .catch(err => {
                res.status(500).send({ error: err.message })
            })
    },
    logUrl: (req, res, next) => {
        console.log(req.url);
        next()
    },

    
    checkAuth: (req, res, next) => {
        if (!req.headers.authorization || req.headers.authorization === undefined) {
            res.status(401).send({ error: 'Authentication failed!' })
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).send({ error: 'Authentication failed!' })
        }
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: 'Authorization failed!' })
            }
            if (decoded) {
                next()
            }
        })
    },
    
    upload: multer({
        
        storage,
        //הגדרות לגבי הקובץ המועלה
        limits: {
            //2MB הקובץ יכול להיות עד גודל של 
            fileSize: 1024 * 1024 * 2
        },
        fileFilter
    })

}
