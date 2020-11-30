import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateThemeService from '@modules/disciplines/services/UpdateThemeService';
import CreateThemeService from '@modules/disciplines/services/CreateThemeService';
import SearchThemeForDisciplineIdService from '@modules/disciplines/services/SearchThemeForDisciplineIdService';
import ThemesAllService from '@modules/disciplines/services/ThemesAllService';

export default class ThemesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const themesAllService = container.resolve(ThemesAllService);

    const themes = await themesAllService.execute();

    return response.json(classToClass(themes));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { discipline_id } = request.params;

    const searchThemesForDisciplineIdService = container.resolve(
      SearchThemeForDisciplineIdService,
    );

    const themes = await searchThemesForDisciplineIdService.execute({
      discipline_id,
    });

    return response.json(classToClass(themes));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      console.log('Theme: ', req.body);

      const { filename } = req.file;

      console.log('req.file: ', req.file);

      const createThemeService = container.resolve(CreateThemeService);

      const theme = await createThemeService.execute({ ...req.body, filename });

      return res.json(theme);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    console.log('Controller', req.body);
    const updateTheme = container.resolve(UpdateThemeService);

    const theme = await updateTheme.execute(req.body);

    return res.json(classToClass(theme));
  }
}
