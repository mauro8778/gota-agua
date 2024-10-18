import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface SolutionStep {
    step: number;
    bucketX: number;
    bucketY: number;
    action: string;
    status?: string;
}

enum ActionType {
    FILL_X = "Llenar cubo X",
    FILL_Y = "Llenar cubo Y",
    EMPTY_X = "Vaciar cubo X",
    EMPTY_Y = "Vaciar cubo Y",
    TRANSFER_X_TO_Y = "Transferir de X a Y",
    TRANSFER_Y_TO_X = "Transferir de Y a X"
}

@Injectable()

export class WaterJugService {

    waterJugSolver
        (
            xCapacity: number,
            yCapacity: number,
            zAmountWanted: number

        ): { solution: SolutionStep[] } {

        this.validateInput
            (
                xCapacity,
                yCapacity,
                zAmountWanted
            );


        const solutions: SolutionStep[][] = [];

        const visited = new Set<string>();

        const queue: Array<
            {
                bucketX: number,
                bucketY: number,
                step: number,
                actions: SolutionStep[]
            }> = [
                {
                    bucketX: 0,
                    bucketY: 0,
                    step: 0,
                    actions: []
                }
            ];

        while (queue.length > 0) {

            const currentState = queue.shift()!;

            const {
                bucketX,
                bucketY,
                step,
                actions
            } = currentState;

            if (
                bucketX === zAmountWanted ||
                bucketY === zAmountWanted
            ) {
                solutions.push([...actions]);
            }

            const possibleStates = this.generatePossibleStates(
                bucketX,
                bucketY,
                xCapacity,
                yCapacity
            );

            for (const { newBucketX, newBucketY, action } of possibleStates) {

                const stateKey = `${newBucketX}-${newBucketY}`;

                if (!visited.has(stateKey)) {

                    visited.add(stateKey);

                    const newActions =
                        [
                            ...actions,
                            {
                                step: step + 1,
                                bucketX: newBucketX,
                                bucketY: newBucketY,
                                action
                            }
                        ];

                    if (
                        newBucketX === zAmountWanted ||
                        newBucketY === zAmountWanted
                    ) {
                        newActions
                        [
                            newActions.length - 1

                        ].status = "Solved";

                        solutions.push(newActions);

                        continue;
                    }

                    queue.push(
                        {
                            bucketX: newBucketX,
                            bucketY: newBucketY,
                            step: step + 1,
                            actions: newActions
                        }
                    );
                }
            }
        }

        return {
            solution: solutions.length > 0 ? this.getShortestSolution(solutions) : []
        };
    }

    private validateInput(
        xCapacity: number,
        yCapacity: number,
        zAmountWanted: number): void {

        if (
            ![
                xCapacity,
                yCapacity,
                zAmountWanted
            ].every(Number.isInteger) ||

            [
                xCapacity,
                yCapacity,
                zAmountWanted
            ].some(value => value <= 0)
        ) {
            throw new HttpException
                (
                    'Los valores ingresados deben ser enteros y mayores que cero.', HttpStatus.BAD_REQUEST
                );
        }

        if (
            zAmountWanted >

            Math.max(
                xCapacity, yCapacity
            ) ||

            zAmountWanted %

            this.gcd(
                xCapacity, yCapacity
            ) !== 0
        ) {
            throw new HttpException
                (
                    'El problema no tiene solución.', HttpStatus.BAD_REQUEST
                );
        }
    }

    private generatePossibleStates(
        bucketX: number,
        bucketY: number,
        xCapacity: number,
        yCapacity: number) {

        return [
            {
                newBucketX: xCapacity,
                newBucketY: bucketY,
                action: ActionType.EMPTY_X
            },
            {
                newBucketX: bucketX,
                newBucketY: yCapacity,
                action: ActionType.EMPTY_Y
            },
            {
                newBucketX: 0,
                newBucketY: bucketY,
                action: ActionType.EMPTY_X
            },
            {
                newBucketX: bucketX,
                newBucketY: 0,
                action: ActionType.EMPTY_Y
            },
            {
                newBucketX: Math.max(bucketX - (yCapacity - bucketY), 0),
                newBucketY: Math.min(bucketY + bucketX, yCapacity),
                action: ActionType.TRANSFER_X_TO_Y
            },
            {
                newBucketX: Math.min(bucketX + bucketY, xCapacity),
                newBucketY: Math.max(bucketY - (xCapacity - bucketX), 0),
                action: ActionType.TRANSFER_Y_TO_X
            }
        ];
    }

    private getShortestSolution(
        solutions: SolutionStep[][]): SolutionStep[] {

        return solutions.reduce(
            (prev, curr) => (curr.length < prev.length ? curr : prev)
        );
    }

    private gcd(a: number, b: number): number {
        return b === 0 ? a : this.gcd(b, a % b);
    }
}
