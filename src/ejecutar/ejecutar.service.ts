import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface SolutionStep {
    step: number;
    bucketX: number;
    bucketY: number;
    action: string;
    status?: string;
}

@Injectable()
export class WaterJugService {

    waterJugSolver(
        xCapacity: number,
        yCapacity: number,
        zAmountWanted: number
    ): { solution: SolutionStep[] } {

        this.validateInput(xCapacity, yCapacity, zAmountWanted);

        const solutions: SolutionStep[][] = [];
        const visited = new Set<string>();
        const queue: Array<{ bucketX: number, bucketY: number, step: number, actions: SolutionStep[] }> = [];

        queue.push({ bucketX: 0, bucketY: 0, step: 0, actions: [] });

        while (queue.length > 0) {
            const { bucketX, bucketY, step, actions } = queue.shift()!;

            if (bucketX === zAmountWanted || bucketY === zAmountWanted) {
                solutions.push(this.finalizeSolution(bucketX, bucketY, step, actions, zAmountWanted));
                break;
            }

            const possibleStates = this.generatePossibleStates(bucketX, bucketY, xCapacity, yCapacity);

            for (const { newBucketX, newBucketY, action } of possibleStates) {
                const stateKey = `${newBucketX}-${newBucketY}`;

                if (!visited.has(stateKey)) {
                    visited.add(stateKey);
                    queue.push({
                        bucketX: newBucketX,
                        bucketY: newBucketY,
                        step: step + 1,
                        actions: [...actions, { step: step + 1, bucketX: newBucketX, bucketY: newBucketY, action }]
                    });
                }
            }
        }

        return solutions.length > 0
            ? { solution: this.getShortestSolution(solutions) }
            : { solution: [] };
    }

    private validateInput(xCapacity: number, yCapacity: number, zAmountWanted: number): void {
        if (!Number.isInteger(xCapacity) || !Number.isInteger(yCapacity) || !Number.isInteger(zAmountWanted)) {
            throw new HttpException('Los valores ingresados deben ser enteros.', HttpStatus.BAD_REQUEST);
        }

        if (xCapacity <= 0 || yCapacity <= 0 || zAmountWanted <= 0) {
            throw new HttpException('Los valores ingresados deben ser mayores que cero.', HttpStatus.BAD_REQUEST);
        }

        if (zAmountWanted > Math.max(xCapacity, yCapacity) || zAmountWanted % this.gcd(xCapacity, yCapacity) !== 0) {
            throw new HttpException('El problema no tiene solución.', HttpStatus.BAD_REQUEST);
        }
    }

    private generatePossibleStates(bucketX: number, bucketY: number, xCapacity: number, yCapacity: number) {
        return [
            { newBucketX: xCapacity, newBucketY: bucketY, action: "Llenar cubo X" },
            { newBucketX: bucketX, newBucketY: yCapacity, action: "Llenar cubo Y" },
            { newBucketX: 0, newBucketY: bucketY, action: "Vaciar cubo X" },
            { newBucketX: bucketX, newBucketY: 0, action: "Vaciar cubo Y" },
            { newBucketX: Math.max(bucketX - (yCapacity - bucketY), 0), newBucketY: Math.min(bucketY + bucketX, yCapacity), action: "Transferir de X a Y" },
            { newBucketX: Math.min(bucketX + bucketY, xCapacity), newBucketY: Math.max(bucketY - (xCapacity - bucketX), 0), action: "Transferir de Y a X" }
        ];
    }

    private finalizeSolution(bucketX: number, bucketY: number, step: number, actions: SolutionStep[], zAmountWanted: number): SolutionStep[] {
        const finalBucketX = bucketX === zAmountWanted ? bucketX : 0;
        const finalBucketY = bucketY === zAmountWanted ? bucketY : 0;

        return [
            ...actions,
        ];
    }

    private getShortestSolution(solutions: SolutionStep[][]): SolutionStep[] {
        return solutions.reduce((prev, curr) => (curr.length < prev.length ? curr : prev));
    }

    private gcd(a: number, b: number): number {
        return b === 0 ? a : this.gcd(b, a % b);
    }
}
