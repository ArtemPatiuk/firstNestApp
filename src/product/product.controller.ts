import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Product } from './product.model';
import { FindProductDto } from './data-transfer-object/find-product.dto';

@Controller('product')
export class ProductController {

	@Post('create')
	async create(@Body() dto: Omit<Product, '_id'>) {

	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: Product) {

	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {

	}


}
