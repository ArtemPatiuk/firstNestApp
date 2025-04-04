import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/data-transfer-object/auth.dto';

const loginDTO: AuthDto = {
	login: 'mardukg2017@gmail.com',
	password: '1234'
}

describe('AuthController (e2e)', () => {
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

	it('/auth/login (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDTO)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.accessToken).toBeDefined()
			})
	});
	it('/auth/login (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDTO, password: "12345" })
			.set('Authorization', 'Bearer ' + token)
			.expect(401)
	});

})