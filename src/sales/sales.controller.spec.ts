import { Test, TestingModule } from '@nestjs/testing';
import { salesController } from './sales.controller';
import { salesService } from './sales.service';

describe('salesController', () => {
  let controller: salesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [salesController],
      providers: [salesService],
    }).compile();

    controller = module.get<salesController>(salesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
