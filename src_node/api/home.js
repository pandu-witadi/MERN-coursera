//
//
const router = require('express').Router()

const homeController =require('../module/homepage')
const Auth = require('../util/is-auth')

router.get('/allCourses', homeController.allCourses)
router.get('/:course', homeController.fetchCourses)
router.post('/interests/', Auth.authentication, homeController.getPreferences)
router.post('/:course', Auth.authentication, homeController.preferenceCourses)


module.exports = router
