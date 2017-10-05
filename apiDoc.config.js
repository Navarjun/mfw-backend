const config = {
    baseURL: '/api/v1',
    requests: [
        {
            id: 'one',
            method: 'GET',
            url: '/images',
            params: {
                pageNumber: { type: 'Number', optional: true, default: 0 },
                pageSize: { type: 'Number', optional: true, default: 100 },
                params: { type: 'Object', optional: true, stringify: true, default:'{}' },
                select: {type: 'String', optional: true, default: '-_id'}
            },
            notes: 'filename would always be part of the data and "_id" which is a mongodb generated id would never be part of the data'
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
