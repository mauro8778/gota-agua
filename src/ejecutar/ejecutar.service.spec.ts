import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { WaterJugService } from './ejecutar.service';

describe('WaterJugService', () => {
  let service: WaterJugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterJugService],
    }).compile();

    service = module.get<WaterJugService>(WaterJugService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería lanzar un error si los valores no son enteros', () => {
    expect(() => service.waterJugSolver(3.5, 5, 4)).toThrow(NotFoundException);
    expect(() => service.waterJugSolver(3, 'cinco' as any, 4)).toThrow(NotFoundException);
  });

  it('debería lanzar un error si los valores son menores o iguales a cero', () => {
    expect(() => service.waterJugSolver(0, 5, 4)).toThrow(NotFoundException);
    expect(() => service.waterJugSolver(3, 5, 0)).toThrow(NotFoundException);
  });

  it('debería lanzar un error si no existe una solución', () => {
    expect(() => service.waterJugSolver(3, 5, 7)).toThrow(NotFoundException);
  });

  it('debería devolver una solución correcta cuando es posible', () => {
    const result = service.waterJugSolver(3, 5, 4);
    expect(result.solution).toBeDefined();
    expect(result.solution.length).toBeGreaterThan(0);
    expect(result.solution[result.solution.length - 1].status).toBe('Solved');
  });

  it('debería devolver la solución más corta cuando hay múltiples soluciones', () => {
    const result = service.waterJugSolver(3, 5, 4);
    expect(result.solution.length).toBe(6);
  });

  it('debería lanzar un error si no hay ninguna solución', () => {
    expect(() => service.waterJugSolver(1, 1, 2)).toThrow(NotFoundException);
  });
  
});
