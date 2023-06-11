import { FastifyPluginAsync } from 'fastify';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { verify_firebase_id_token } from './plugins/verify_firebase_id_token';

import * as index from './routes';

declare module 'fastify' {
  interface FastifyRequest {
    decoded_token: DecodedIdToken
  }
}

export const v1: FastifyPluginAsync = async (instance, _opts) => {
  instance.decorateRequest('decoded_token', null);

  instance.route({
    url: '/exists',
    method: 'GET',
    schema: index.exists.GET_validation_schema,
    handler: index.exists.GET_handler,
  });

  instance.route({
    url: '/',
    method: 'POST',
    preHandler: verify_firebase_id_token,
    handler: index.POST_handler,
  });
};
