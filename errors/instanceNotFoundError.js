class InstanceNotFoundError extends Error {
    constructor(message = "No instance with this ID") {
        super(message);
        this.name = 'InstanceNotFoundError';
        this.statusCode = 404;
    }
}

module.exports = InstanceNotFoundError;