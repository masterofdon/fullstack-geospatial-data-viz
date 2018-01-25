module.exports = {
    path: '/fff',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ffapp'));
        });
    }
}