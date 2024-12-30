const request = require('supertest');
const app = require('../index');

let objectID = '';

beforeAll(async () => {
    const response = await request(app).post('/api/v1/components').send({
        producto: 'producto123',
        marca: 'marca123',
        modelo: 'modelo123',
        caracteristicas: 'caracteristicas123',
        precio: 10000,
        imagen: 'imagen123',
    });
    objectID = response.body._id;
});

describe('POST /api/v1/components', () => {
    it('should create a new component', async () => {
        const response = await request(app).post('/api/v1/components').send({
            producto: 'producto',
            marca: 'marca',
            modelo: 'modelo',
            caracteristicas: 'caracteristicas',
            precio: 100,
            imagen: 'imagen',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.producto).toBe('producto');
    });
});

describe('GET /api/v1/components', () => {
    it('should respond with json containing a list of all components', async () => {
        const response = await request(app).get('/api/v1/components');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(String),
                    producto: expect.any(String),
                    marca: expect.any(String),
                    modelo: expect.any(String),
                    caracteristicas: expect.any(Array),
                    precio: expect.any(Number),
                    imagen: expect.any(String),
                    carrito: expect.any(Boolean),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }),
            ])
        );
    });
});

describe('GET /api/v1/components/:id', () => {
    it('should respond with json containing a single component', async () => {
        const response = await request(app).get(
            `/api/v1/components/${objectID}`
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            _id: objectID,
            producto: 'producto123',
            marca: 'marca123',
            modelo: 'modelo123',
            caracteristicas: ['caracteristicas123'],
            precio: 10000,
            imagen: 'imagen123',
            carrito: false,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });
});

describe('PUT /api/v1/components/:id', () => {
    it('should update the component', async () => {
        const response = await request(app)
            .put(`/api/v1/components/${objectID}`)
            .send({
                producto: 'producto',
                marca: 'marca',
                modelo: 'modelo',
                caracteristicas: 'caracteristicas',
                precio: 100,
                imagen: 'imagen',
            });
        expect(response.status).toBe(200);
        expect(response.body.producto).toBe('producto');
    });
});

describe('DELETE /api/v1/components/:id', () => {
    it('should delete the component', async () => {
        const response = await request(app).delete(
            `/api/v1/components/${objectID}`
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('acknowledged');
        expect(response.body.deletedCount).toBe(1);
    });
});
