
const request = require('supertest');
let app
describe('validObjectId middleware',()=>{
    beforeEach(()=>{ app = require('../../index')});
    afterEach(async()=>{ await app.close();});

    describe('validateObjectId',()=>{
        it('should should return 404 if ID is invalid',async()=>{
            const resp = await request(app).get('/user/'+ 1);
            expect(resp.statusCode).toBe(404);
        });

    });
});