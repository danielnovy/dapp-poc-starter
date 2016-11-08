import CoreLayout from './pages/CoreLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Simple from './pages/Simple'
import Denied from './pages/Denied'
import LoggedInRole0 from './pages/containers/LoggedInRole0'
import LoggedInRole1 from './pages/containers/LoggedInRole1'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    Simple,
    Denied,
    LoggedInRole0(store),
    LoggedInRole1(store),
    NotFound,
    // refactor to automate the task of loading child routes from user
    // roles. It's easily(?) achieved by using the function:
    //
    //getChildRoutes (location, cb) {
    //  require.ensure([], (require) => {
    //    cb(null, [
    //      // Remove imports!
    //      require('./Counter').default(store)
    //    ])
    //  })
    //}
  ]
})


export default createRoutes
