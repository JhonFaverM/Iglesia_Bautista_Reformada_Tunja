const controller = require('../controllers/upload')

const router = express.router()

router.post(
    controller.upload,
    controller.uploadFile
)



module.exports = router