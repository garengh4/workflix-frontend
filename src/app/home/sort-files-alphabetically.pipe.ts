import { Pipe, PipeTransform } from '@angular/core';
import { FileModel } from 'src/assets/entites/FileModel';

@Pipe({
  name: 'sortFilesAlphabetically'
})
export class SortFilesAlphabeticallyPipe implements PipeTransform {

  transform(files:FileModel[], sortBy:string) {
    return files.sort((f1, f2) => {
      if (f1[sortBy] > f2[sortBy]) return 1;
      if (f1[sortBy] < f2[sortBy]) return -1;
      else return 0;
    })
  }

}
