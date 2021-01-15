import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      console.log('logui:::::', req.body);
      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      // dentro do token tem expiresIn

      return res.json({
        user: classToClass(user),
        token,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
