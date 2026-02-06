export const environment = {
    production: false,
    api: {
        employees: 'http://localhost:8089',
        auth: 'http://localhost:9000',
    },
    auth: {
        tokenUrl: 'http://localhost:9000/application/o/token/',
        clientId: 'employee_api_client',
    },
    polling: {
        refreshInterval: 30000, // 30 seconds
        errorTimeout: 5000, // 5 seconds
    },
    defaults: {
        employee: {
            street: '–',
            postcode: '00000',
            phone: '–',
        },
    },
    login: {
        username: 'john',
        password: '',
    },
};
