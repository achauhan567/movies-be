const request = require('supertest');
const app = require('../../app');
var newRequest = require('./testdata/movie.new.request.json');
var updateRequest = require('./testdata/movie.update.request.json');

var id = '';

describe('Movies API Tests', function() {

    it('TC001 : add new movie ', async function() {
        const response = await request(app)
          .post('/movies')
          .send(newRequest)
          .expect(201);
          id = response.body.id;
          expect(response.body.name).toBe(newRequest.name);
          expect(response.body.director).toBe(newRequest.director);
          expect(response.body.popularity).toBe(newRequest.popularity);
          expect(response.body.imdb_score).toBe(newRequest.imdb_score);
          expect(response.body.genre).toStrictEqual(newRequest.genre);

      });

    it('TC002 : get all movie ', async function() {
      const response = await request(app)
        .get('/movies')
        .expect(200);
    });

    it('TC003 : get movie by id  ', async function() {
        const response = await request(app)
          .get(`/movies/${id}`)
          .expect(200);
          expect(response.body.id).toBe(id);
          expect(response.body.name).toBe(newRequest.name);
          expect(response.body.director).toBe(newRequest.director);
          expect(response.body.popularity).toBe(newRequest.popularity);
          expect(response.body.imdb_score).toBe(newRequest.imdb_score);
          expect(response.body.genre).toStrictEqual(newRequest.genre);
    });

    it('TC004 : update movie by id ', async function() {
        const response = await request(app)
          .put(`/movies/${id}`)
          .send(updateRequest)
          .expect(200);
          updateRequest.id=id;
          expect(response.body.id).toBe(`${id}`);
          expect(response.body.name).toBe(updateRequest.name);
          expect(response.body.director).toBe(updateRequest.director);
          expect(response.body.popularity).toBe(updateRequest.popularity);
          expect(response.body.imdb_score).toBe(updateRequest.imdb_score);
          expect(response.body.genre).toStrictEqual(updateRequest.genre);
    });

    it('TC005 : update movie by id with invalid body', async function() {
        const response = await request(app)
          .put(`/movies/${id}`)
          .send({nameaa: 'Update_Test_movie'})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });

    it('TC006 : update movie by id with empty body', async function() {
        const response = await request(app)
          .put(`/movies/${id}`)
          .send({})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });

    it('TC007 : update movie by id without body', async function() {
        const response = await request(app)
          .put(`/movies/${id}`)
          .send()
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });

    it('TC008 : update movie by id with null body', async function() {
        const response = await request(app)
          .put(`/movies/${id}`)
          .send(null)
          .expect(400);
          expect(response.body.message).toBe('bad_request');
    });


    it('TC009 : delete movie by id ', async function() {
        const response = await request(app)
          .delete(`/movies/${id}`)
          .expect(200);
          expect(response.body.message).toBe('Movie was deleted successfully!');
    });

    it('TC010 : get movie by id not present ', async function() {
        const response = await request(app)
          .get(`/movies/${id}`)
          .expect(404);
          expect(response.body.message).toBe('not_found');
    });

    it('TC011 : delete movie by id not present ', async function() {
        const response = await request(app)
          .delete(`/movies/${id}`)
          .expect(404);
          expect(response.body.message).toBe(`Not found Movie with id ${id}.`);
    });

    it('TC012 : update movie by id not present ', async function() {
        const response = await request(app)
          .put(`/movies/${id}`)
          .send(updateRequest)
          .expect(404);
          expect(response.body.message).toBe(`Not found Movie with id ${id}.`);
    });

    it('TC013 : add new movie with invalid body', async function() {
        const response = await request(app)
          .post('/movies')
          .send({nameaa: 'Test_movie'})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });

      it('TC014 : add new movie with empty body', async function() {
        const response = await request(app)
          .post('/movies')
          .send({})
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });

      it('TC015 : add new movie without body', async function() {
        const response = await request(app)
          .post('/movies')
          .send()
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });

      it('TC016 : add new movie with null body', async function() {
        const response = await request(app)
          .post('/movies')
          .send(null)
          .expect(400);
          expect(response.body.message).toBe('bad_request');
      });
  });