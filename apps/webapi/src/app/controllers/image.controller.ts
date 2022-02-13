import { Request, Response } from 'express';
import * as path from 'path';

import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { environment } from '@environments/environment';
import { imageService } from '@services/image.service';

class ImageController {
  public async saveImage(request: Request, response: Response, next: Function) {
    const imageName = await imageService.saveImage(request.files.image);

    return response.status(ResponseStatuses.STATUS_CREATED).send(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}/${imageName}`);
  }

  public async getImage(request: Request, response: Response, next: Function) {
    const imageName = request.params.name;
    const imagePath = path.join(__dirname, '..', '..', environment.imagesFolder, imageName);

    return response.sendFile(imagePath);
  }
}

export const imageController = new ImageController();