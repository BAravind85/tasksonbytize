import nextSession from 'next-session'
import { promisifyStore, expressSession } from 'next-session/lib/compat'
import RedisStoreFactory from 'connect-redis'
import { createClient } from 'redis'

const RedisStore = RedisStoreFactory(expressSession)

const redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

const getSession = nextSession({
  store: promisifyStore(new RedisStore({ client: redisClient })),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
    path: '/',
    sameSite: 'strict',
  },
  touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
})

export default async function session(req, res, next) {
  await getSession(req, res)
  next()
}
