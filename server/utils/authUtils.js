const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig')


function generateTokens(payload) {
    return {
        accessToken: jwt.sign(
            payload,
            'A',
            jwtConfig.access,
        ),
        refreshToken: jwt.sign(
            payload,
            'R',
            jwtConfig.refresh,
        )
    }
}

module.exports = generateTokens;