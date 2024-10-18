import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

interface SolutionStep {
    step: number;
    bucketX: number;
    bucketY: number;
    action: string;
    status?: string;
}

@Injectable()
export class WaterJugService {

    waterJugSolver(x_capacity: number,
         y_capacity: number,
          z_amount_wanted: number): { solution: SolutionStep[] } {

        const solutions: SolutionStep[][] = [];
        const visited = new Set<string>();

        const queue: Array<{
            bucketX: number,
            bucketY: number,
            step: number,
            actions: SolutionStep[]
        }> = [];
       

        if (!Number.isInteger(x_capacity) ||
            !Number.isInteger(y_capacity) ||
            !Number.isInteger(z_amount_wanted)) {
            throw new HttpException('Los valores ingresados deben ser enteros.', HttpStatus.UNAUTHORIZED);
        }

        if (x_capacity <= 0 || y_capacity <= 0 || z_amount_wanted <= 0) {
            throw new HttpException('Los valores ingresados deben ser mayores que cero.', HttpStatus.UNAUTHORIZED);
        }

        if (z_amount_wanted > Math.max(x_capacity, y_capacity) ||
            z_amount_wanted % this.gcd(x_capacity, y_capacity) !== 0) {
            throw new HttpException('El problema no tiene solución.', HttpStatus.UNAUTHORIZED);
        }
        queue.push({ bucketX: 0, bucketY: 0, step: 0, actions: [] });

        while (queue.length > 0) {
            const { bucketX, bucketY, step, actions } = queue.shift()!;

            if (bucketX === z_amount_wanted || bucketY === z_amount_wanted) {
                const finalBucketX = bucketX === z_amount_wanted ? bucketX : 0;
                const finalBucketY = bucketY === z_amount_wanted ? bucketY : 0;

                actions.push({
                    step: step + 1,
                    bucketX: finalBucketX,  
                    bucketY: finalBucketY,  
                    action: "SOLVED",
                    status: "Solved"
                });

                solutions.push(actions);
                break; 
            }

            const states = [
                { newBucketX: x_capacity, newBucketY: bucketY, action: "Fill bucket X" },
                { newBucketX: bucketX, newBucketY: y_capacity, action: "Fill bucket Y" },
                { newBucketX: 0, newBucketY: bucketY, action: "Empty bucket X" },
                { newBucketX: bucketX, newBucketY: 0, action: "Empty bucket Y" },
                { newBucketX: Math.max(bucketX - (y_capacity - bucketY), 0), newBucketY: Math.min(bucketY + bucketX, y_capacity), action: "Transfer from X to Y" },
                { newBucketX: Math.min(bucketX + bucketY, x_capacity), newBucketY: Math.max(bucketY - (x_capacity - bucketX), 0), action: "Transfer from Y to X" }
            ];

            for (const { newBucketX, newBucketY, action } of states) {
                const stateKey = `${newBucketX}-${newBucketY}`;

                if (!visited.has(stateKey)) {
                    visited.add(stateKey);

                    queue.push({
                        bucketX: newBucketX,
                        bucketY: newBucketY,
                        step: step + 1,
                        actions: [...actions, {
                            step: step + 1,
                            bucketX: newBucketX,
                            bucketY: newBucketY,
                            action
                        }]
                    });
                }
            }
        }

        if (solutions.length > 0) {
            const shortestSolution = solutions.reduce((prev, curr) => (curr.length < prev.length ? curr : prev));
            return { solution: shortestSolution };
        }

        return { solution: [] };
    }

    private gcd(a: number, b: number): number {
        return b === 0 ? a : this.gcd(b, a % b);
    }
}
