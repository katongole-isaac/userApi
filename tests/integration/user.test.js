const mongoose = require('mongoose');
const request = require('supertest');
const {User,validateUser} = require('../../models/userSchema');

describe('Users endPoints', ()=>{
    let app;
    beforeEach(async()=> { app = require('../../index');  });

   afterEach(async()=>{
       await User.deleteMany({});
        await app.close(); 
    });

    describe('GET /user',()=>{
        it('should return all users',async()=>{
            await User.collection.insertMany([
                {name : "katongole", age: 20, job: "my job"},
            ])

            const res = await request(app).get('/user');

            expect(res.statusCode).toBe(200);
            expect(res.body).not.toBeNull();
            expect(res.body.some(a=>a.name = 'katongole')).toBeTruthy();
      });

      it('should return a user when a valid ID is passed',async()=>{
        const id = mongoose.Types.ObjectId();
        await User.collection.insertMany([
            {name : "katongole", age: 20, job: "my job", _id: id},
        ]);

        const res = await request(app).get('/user/'+id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
    });

    it('should return 400 if the ID is not found',async()=>{
        const id = mongoose.Types.ObjectId();
        const res = await request(app).get('/user/'+id);
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject({});
    });

   });

   describe('POST /',()=>{
      it('should return an 400 if the request body is invalid ',async()=>{
         let user = new User({
              name: "isaac"
          });
          const res = await request(app).post('/user/add').send(user);
          expect(res.error).toBeTruthy();
          expect(res.statusCode).toBe(400);
        
      });

      it('should return 400 if the user already exists',async()=>{
        await User.collection.insertMany([
            {name : "katongole", age: 20, job: "my job"},
        ])
        let again = {name : "katongole", age: 20, job: "my job"};
         const res = await request(app).post('/user/add').send(again);
        expect(res.statusCode).toBe(400);
      }); 

      it('should return the recent added user.',async()=>{
          let user =  {name : "katongole", age: 20, job: "my jddob"};
            const res = await request(app).post('/user/add').send(user);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
      });


   });

   describe('DELETE /', ()=>{
        it('should delete the saved user', async()=>{
            const id = mongoose.Types.ObjectId();
            await User.collection.insertMany([
                {name : "katongole", age: 20, job: "my job", _id: id},
            ]);
            const res = await request(app).delete('/user/'+ id);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id');
        });
   });

   describe('PUT /new/:id', ()=>{
    it('should return an 400 if the request body is invalid ',async()=>{
        let user = new User({
             name: "isaac"
         });
         const id = mongoose.Types.ObjectId();
         const res = await request(app).put('/user/new/'+id).send(user);
         expect(res.statusCode).toBe(400);
     });
     it('should return an 404 if User Not found ',async()=>{
         const id = mongoose.Types.ObjectId();
         const res = await request(app).put('/user/new/'+id)
         .send({name: "myName", age: 20, job: "my new Job"});
         expect(res.statusCode).toBe(404);
     });

     it('should return an 200 if the user is Updated ',async()=>{
        const id = mongoose.Types.ObjectId();
        const me = {
            _id: id,
            name: "my Name",
            age: 20,
            job: "my new Job"
        }
        await User.collection.insertMany([me]);
        const res = await request(app).put('/user/new/'+me._id)
        .send({name: "my Update", age: 21, job: "my new Job Update"});
        expect(res.statusCode).toBe(200); 
        expect(Object.keys(res.body)).toContain('_id');
    });
   });
   
});
