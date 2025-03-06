import rateLimit from 'express-rate-limit'
import ApiError from "../utils/apiError";

// Define the rate limit rule
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        throw new ApiError('You have exceeded the request limit. Please try again later.', 429)
    },
});

export default limiter;
