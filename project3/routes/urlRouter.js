import express from 'express'
import urlController from '../controllers/urlController.js' 
const router = express.Router();

router.get('/', urlController.allUrls);

router.post('/shortUrls', urlController.postShortUrl);

router.get('/:shortUrl', urlController.getShortUrl); 

router.post('/deleteUrl', urlController.deleteUrl);

export default router;