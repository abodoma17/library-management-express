class InstanceNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InstanceNotFoundError';
        this.statusCode = 404;
    }
}

module.exports = InstanceNotFoundError;