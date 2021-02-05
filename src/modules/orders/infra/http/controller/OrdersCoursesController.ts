import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetOrderCourseUserIdService from '@modules/orders/services/GetOrderCourseUserIdService';

export default class OrdersCoursesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findOrders = container.resolve(GetOrderCourseUserIdService);

    const orders = await findOrders.execute({ user_id });

    return response.json(classToClass(orders));
  }
}
