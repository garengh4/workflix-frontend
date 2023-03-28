import { Pipe, PipeTransform } from '@angular/core';
import { FileModel } from 'src/assets/entites/FileModel';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(files:FileModel[], category:string): FileModel[] {
    return files.filter(file => {
      file.categoryName = category
    });
  }

}
