//
//
const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const short = require('short-uuid')

const { appCurrentDateTime } = require('../util/time_format')
const creatorController =require('../module/creator')
const Auth = require('../util/is-auth')


const ImagefileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
        // cb(null, '')
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toDateString() + '-' + file.originalname)
        const servDateTime = appCurrentDateTime()
        let strFilename = 'img-' + servDateTime.strDate + '-' + short.generate() + '-' + file.originalname
        cb(null, strFilename)
    }
})

const ImagefileFilter = (req, file, cb) => {
    if(file.mimetype ==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
        cb(null,true);
    } else {
        cb(null,false)
        console.log("wrong file type")
    }
}

const imageMulter = multer({
    storage: ImagefileStorage,
    fileFilter: ImagefileFilter
}).single('image')


const VideofileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'videos')
        // cb(null, '')
    },
    filename: (req, file, cb) => {
        const servDateTime = appCurrentDateTime()
        let strFilename = 'vid-' + servDateTime.strDate + '-' + short.generate() + '-' + file.originalname
        cb(null, strFilename)
    }
})

const VideofileFilter = (req, file, cb) => {
    if (file.mimetype ==="video/mp4") {
        cb(null,true);
    } else {
        cb(null,false)
        console.log("wrong file type")
    }
}

const videoMulter = multer({
    storage: VideofileStorage,
    fileFilter: VideofileFilter
}).any()

router.post('/homepage', Auth.authentication, creatorController.creatorHome)

router.post('/create-course', imageMulter, creatorController.uploadCourse)
router.post('/videoUpload/:courseID', videoMulter, creatorController.uploadVideo)

router.post('/course/edit', Auth.authentication, creatorController.editCourse)
router.put('/course/update', imageMulter, creatorController.updateCourse)
router.post('/watchedByuser', creatorController.watchedByUsers)

module.exports = router
