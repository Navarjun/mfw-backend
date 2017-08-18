const config = {
    baseURL: '/api/v1',
    requests: [
        {
            id: 'one',
            method: 'GET',
            url: '/images',
            params: {
                skip: { type: 'Number', optional: true, default: 0 },
                limit: { type: 'Number', optional: true, default: 100 }
            },
            notes: ''
        },
        {
            id: 'two',
            method: 'GET',
            url: '/image/:filename',
            params: {
                filename: { type: 'String', optional: false}
            },
            notes: ''
        }
    ]
};

module.exports = config;
