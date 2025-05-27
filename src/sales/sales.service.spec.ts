import { Test, TestingModule } from '@nestjs/testing';
import { salesService } from './sales.service';

describe('salesService', () => {
  let service: salesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [salesService],
    }).compile();

    service = module.get<salesService>(salesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
