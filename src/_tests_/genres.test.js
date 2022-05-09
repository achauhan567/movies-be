const request = require('supertest');
const app = require('../../app');

var id = '';

describe('Genres API Tests', function() {

    it('TC001 : add new genre ', async function() {
        const response = await request(app)
          .post('/genres')
          .send({name: 'Test_Genre'})
          .expect(201);
          id = response.body.id;
      });

    it('TC002 : get all genre ', async function() {
      const response = await request(app)
        .get('/genres')
        .expect(200);
    });

    it('TC003 : get genre by id  ', async function() {
        const response = await request(app)
          .get(`/genres/${id}`)
          .expect(200);
          expect(response.body.name).toBe('Test_Genre');
    });

    it('TC004 : update genre by id ', async function() {
        const response = await request(app)
          .put(`/genres/${id}`)
          .send({name: 'Update_Test_Genre'})
          .expect(200);
          expect(response.body.name).toBe('Update_Test_Genre');
    });

    it('TC005 : update genre by id with invalid body', async function() {
        const response = await request(app)
          .put(`/genres/${id}`)
          .send({nameaa: 'Update_Test_Genre'})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });

    it('TC006 : update genre by id with empty body', async function() {
        const response = await request(app)
          .put(`/genres/${id}`)
          .send({})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });

    it('TC007 : update genre by id without body', async function() {
        const response = await request(app)
          .put(`/genres/${id}`)
          .send()
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });

    it('TC008 : update genre by id with null body', async function() {
        const response = await request(app)
          .put(`/genres/${id}`)
          .send(null)
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });


    it('TC009 : delete genre by id ', async function() {
        const response = await request(app)
          .delete(`/genres/${id}`)
          .expect(200);
          expect(response.body.message).toBe('Genre was deleted successfully!');
    });

    it('TC010 : get genre by id not present ', async function() {
        const response = await request(app)
          .get(`/genres/${id}`)
          .expect(404);
          expect(response.body.message).toBe('not_found');
    });

    it('TC011 : delete genre by id not present ', async function() {
        const response = await request(app)
          .delete(`/genres/${id}`)
          .expect(404);
          expect(response.body.message).toBe(`Not found Genre with id ${id}.`);
    });

    it('TC012 : update genre by id not present ', async function() {
        const response = await request(app)
          .put(`/genres/${id}`)
          .send({name: 'Update_Test_Genre'})
          .expect(404);
          expect(response.body.message).toBe(`Not found Genre with id ${id}.`);
    });

    it('TC013 : add new genre with invalid body', async function() {
        const response = await request(app)
          .post('/genres')
          .send({nameaa: 'Test_Genre'})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });

      it('TC014 : add new genre with empty body', async function() {
        const response = await request(app)
          .post('/genres')
          .send({})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });

      it('TC015 : add new genre without body', async function() {
        const response = await request(app)
          .post('/genres')
          .send()
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });

      it('TC016 : add new genre with null body', async function() {
        const response = await request(app)
          .post('/genres')
          .send(null)
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });
  });