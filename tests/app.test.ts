import app from '../app';
import { beforeAll, describe, expect, it} from 'bun:test';
import { NextFunction, Request, Response } from 'express';
import request from 'supertest';

describe('App Routes', () => {
    beforeAll(() => {
        app.use((req: Request, _res: Response, next: NextFunction) => {
            req.language = 'en';
            next();
        });
        app.use((req: Request, _res: Response, next: NextFunction) => {
            req.translations = { title: 'Hi ! I Am a Test' };
            next();
        });
    });

    it('GET / should return a 200 status and render index', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('<html');
    });

    it('GET /about should return a 200 status and render about page', async () => {
        const response = await request(app).get('/about');
        expect(response.status).toBe(200);
        expect(response.text).toContain('About');
    });

    it('GET /appointment should redirect to Calendly', async () => {
        const response = await request(app).get('/appointment');
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('https://calendly.com/maximiliennadji/30min');
    });

    it('GET /static should serve static files', async () => {
        const response = await request(app).get('/static/images/logo.svg');
        expect(response.status).toBe(200);
    });

    it('GET /blog should return a 200 status and render blog index', async () => {
        const response = await request(app).get('/blog');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Blog');
    });

    it('GET /blog/linux should return a 200 status and render linux blog post', async () => {
        const response = await request(app).get('/blog/linux');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Linux');
    });
});