const { check, validationResult } = require('express-validator');

// Custom validator function for username
const isnameValid = (value) => {
    const allowedCharacters = /^[a-zA-Z]+$/;
    return allowedCharacters.test(value);
};

// Relaxed password validation regex pattern
const passwordRegex = /^.{6,}$/;

// Validation middleware for user registration
const validateUserRegistration = [
    // Validate firstname
    check('Firstname')
        .trim()
        .notEmpty().withMessage('Firstname is required')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters long')
        .custom(isnameValid).withMessage('Invalid characters in the Firstname. Only alphabets are allowed '),

       //validate lastname
        check('Lastname')
        .trim()
        .notEmpty().withMessage('Firstname is required')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters long')
        .custom(isnameValid).withMessage('Invalid characters in the Firstname. Only alphabets are allowed '),

    // Validate email
    check('Email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),

    // Validate password with relaxed rules
    check('Password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .matches(passwordRegex).withMessage('Password must be at least 6 characters long'),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: 'Validation failed',
                errors: errors.array(),
            });
        }
        next();
    },
];

// Custom middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    handleValidationErrors,
};
