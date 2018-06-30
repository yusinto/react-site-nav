const UniversalHotReload = require('universal-hot-reload').default;
UniversalHotReload(require('../../webpack.config.server.js'), require('../../webpack.config.client.js'));