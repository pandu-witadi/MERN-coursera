//
//
const router = require('express').Router()

const courseController =require('../module/course')
const Auth = require('../util/is-auth')


router.post('/delete', Auth.authentication, courseController.deleteCourse)

router.get('/:courseName/:courseId', Auth.authentication, courseController.CoursePage)
router.post('/home/:courseId/:courseName', Auth.authentication, courseController.Bookmark)

router.get('/users/:userName/:userId', Auth.authentication, courseController.ShowBookmark)
router.post('/unbookmark', Auth.authentication, courseController.unbookmark)

router.put('/rating', Auth.authentication, courseController.rating)
router.get('/pdf/download/:courseId', courseController.pdf)

module.exports = router
