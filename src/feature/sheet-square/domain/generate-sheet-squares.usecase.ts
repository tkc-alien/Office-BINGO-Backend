import { Injectable } from "@nestjs/common";

import { SheetSquareEntity } from "@/entity";

/**
 * ランダムなシートマスのリストを生成するUseCase
 */
export abstract class GenerateSheetSquaresUseCase {
  abstract execute(): SheetSquareEntity[];
}

@Injectable()
export class GenerateSheetSquaresUseCaseImpl
  implements GenerateSheetSquaresUseCase
{
  execute(): SheetSquareEntity[] {
    // 0 ~ 99 の数値をランダムに並べ替えた配列を作成する
    const rand: number[] = [];
    const max = 99;
    const numbers = Array.from({ length: max }, (_, i) => i + 1);
    for (let i = 0; i < max; i++) {
      const index = Math.floor(Math.random() * numbers.length);
      rand.push(numbers[index]);
      numbers.splice(index, 1);
    }

    // 並べ替えた数値の先頭25個を使ってビンゴシートを作成する
    const squares: SheetSquareEntity[] = [];
    for (let i = 0; i < 25; i++) {
      const square = new SheetSquareEntity();
      square.number = rand[i];
      square.xPos = i % 5;
      square.yPos = Math.floor(i / 5);
      squares.push(square);
    }
    return squares;
  }
}
