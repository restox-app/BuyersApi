import { RouteHandlerMethod } from 'fastify';
import { buyers } from '../../../db/buyers';

export const POST_handler: RouteHandlerMethod = async (request, reply) => {
  const { decoded_token } = request;

  const fetch_res = await buyers
    .findOne({
      email: decoded_token.email,
    })
    .lean();

  if (fetch_res) {
    reply.status(200).send(fetch_res);
    return;
  }

  const create_res = await buyers
    .create({
      name: decoded_token.name,
      email: decoded_token.email,
    });

  reply.status(200).send(create_res.toObject());
};
