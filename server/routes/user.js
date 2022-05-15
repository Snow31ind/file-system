import express from 'express';
import { User } from '../controller/index.js';
import folderRoutes from './folder.js';

const router = express.Router();

router.use('/:userId/folders', folderRoutes);

router.get('/', User.getAll);

router.post('/signup', User.create);

router.get('/:id', User.getById);

router.put('/:id/update', User.updateById);

router.delete('/:id/remove', User.removeById);

export default router;
