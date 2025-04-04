import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TopPage } from './top-page.model';
import { FindTopPageDto } from './data-tranfer-object/find-top-page.dto';
import { ConfigService } from '@nestjs/config';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly configService: ConfigService) {

	}

	@Post('create')
	async create(@Body() dto: Omit<TopPage, '_id'>) {
		this.configService.get('TEST')
	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: TopPage) {

	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindTopPageDto) {

	}

}
