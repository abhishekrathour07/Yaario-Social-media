const responseHandler = (res, statusCode, message, data = null) => {
    const success = statusCode >= 200 && statusCode < 400;
    
    const response = {
        success,
        message,
        ...(data && { data })
    };

    return res.status(statusCode).json(response);
};

export default responseHandler;