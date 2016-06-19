import config from '../config'
import server from '../server/main'
import server2 from '../server2/main'
import _debug from 'debug'

const debug = _debug('app:bin:server')
const port = config.server_port
const port2 = config.server_port2
const host = config.server_host

server.listen(port)
debug(`Server is now running at http://${host}:${port}.`)
debug(`Server accessible via localhost:${port} if you are using the project defaults.`)


server2.listen(port2)
debug(`Server is now running at http://${host}:${port2}.`)
debug(`Server accessible via localhost:${port2} if you are using the project defaults.`)