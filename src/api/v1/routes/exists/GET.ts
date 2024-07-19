import { JSONSchemaType } from 'ajv';
import { FastifySchema, RouteHandlerMethod } from 'fastify';
import { buyers } from '../../../../db/buyers';

export interface GetQuery {
  contact: string,
}

const query_schema: JSONSchemaType<GetQuery> = {
  type: 'object',
  properties: {
    contact: {
      type: 'string',
      minLength: 13,
      maxLength: 13,
    },
  },
  required: [
    'contact',
  ],
  additionalProperties: false,
};

export const GET_validation_schema: FastifySchema = {
  querystring: query_schema,
};

export const GET_handler: RouteHandlerMethod = async (request, reply) => {
  const query = request.query as GetQuery;

  const fetch_res = await buyers
    .findOne({
      contact: query.contact,
    });

  reply.status(200).send({
    exists: !!fetch_res,
  });
};
