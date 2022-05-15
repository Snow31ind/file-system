import { Router } from 'express';
import { Folder } from '../controller/index.js';

const router = Router({
  mergeParams: true,
});

router.get('/', Folder.getFilesAndFoldersAtRoot);

router.get('/:id', Folder.getFilesAndFoldersByParentId);

router.post('/:id/create', Folder.createAtParentFolderId);

router.delete('/:id/remove', Folder.removeAtParentFolderIdById);

// router.use('/:folderId/files', fileRoutes);

export default router;
