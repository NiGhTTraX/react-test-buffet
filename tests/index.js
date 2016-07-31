const requireComponent = require.context('./components', true, /\.jsx?$/);
requireComponent.keys().forEach(requireComponent);
