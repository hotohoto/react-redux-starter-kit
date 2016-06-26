import Koa from 'koa'
import route from 'koa-route';
import cors from 'koa-cors';
import _debug from 'debug'
import config from '../config'

import Users from './api/users'

const debug = _debug('app:server2')
const app = new Koa()

const port = config.server_port
const port2 = config.server_port2
const host = config.server_host

app.use(cors({origin:true}));
app.use(route.get('/api/test',Users.test));
app.use(route.post('/api/user/add',Users.addUser));
app.use(route.post('/api/login',Users.login));
app.use(route.post('/api/user',Users.list));
app.use(route.post('/api/user/setPassword',Users.setUserPassword));


export default app
