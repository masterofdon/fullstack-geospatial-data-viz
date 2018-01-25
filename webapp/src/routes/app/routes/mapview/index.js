module.exports = {
    path: 'mapview',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/MapView'));
      });
    }
  };
  