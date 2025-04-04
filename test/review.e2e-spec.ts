import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types } from 'mongoose';
import { AuthDto } from 'src/auth/data-transfer-object/auth.dto';
import { REVIEW_NOT_FOUND } from '../src/review/review.constans';


const productId = new Types.ObjectId().toHexString();
const loginDTO: AuthDto = {
	login: 'mardukg2017@gmail.com',
	password: '1234'
}

const testDto: CreateReviewDto = {
	name: 'Test',
	title: "Title",
	description: "Description",
	rating: 5,
	productId
}

describe('AppController (e2e)', () => {
	let app: INestApplication<App>;
	let createdId: string;
	let token: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();


		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDTO);
		token = body.accessToken;
	});
	it('/review/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review/create ')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});
	it('/review/create (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 6 })
			.expect(400)
			.then(({ body }: request.Response) => {
				console.log(`body : ${body.message}`)
			});
	});
	it('/review/byProduct/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND
			});
	});

});
