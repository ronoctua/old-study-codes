import { Request, Response } from 'express';
import knex from '../database/connection';

class AllPointsControler {
  async show(request: Request, response: Response) {
    const points = await knex('points').select('*');

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://localhost:3333/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }
}

export default AllPointsControler;
