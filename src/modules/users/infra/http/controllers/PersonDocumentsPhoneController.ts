import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePersonDocumentsPhoneService from '@modules/users/services/UpdatePersonDocumentsPhoneService';

export default class PersonDocumentsPhoneController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      console.log('req.body::::::::;', req.body);

      const updatePerson = container.resolve(UpdatePersonDocumentsPhoneService);

      const person = await updatePerson.execute({ user_id, ...req.body });

      return res.json(classToClass(person));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
