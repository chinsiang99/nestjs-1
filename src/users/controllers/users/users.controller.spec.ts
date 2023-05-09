import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/services/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    
  }

  const requestMock = {
    query:{}
  } as unknown as Request;

  const responseMock = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useClass: UsersService
        }
      ]
    })
      .overrideProvider('USER_SERVICE')
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', ()=>{
    let sortDesc = true
    it('should return a status of 400', ()=>{
      controller.getUsers(sortDesc)
      expect(controller.getUsers(sortDesc)).toEqual([
        {
        id: expect.any,

        username: expect.any(Number),
    
        email: expect.any(String),
    
        createdAt: expect.any(String),
    
        authStrategy: expect.any(String)
      }])
    })
  })
  // controller.getUsers
});
