import { Pipe, PipeTransform } from '@angular/core';
import { FileModel } from 'src/assets/entites/FileModel';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(files:FileModel[], videoFormatList:string[]): FileModel[] {
    return files ? files.filter(file => videoFormatList.includes(file.categoryName)) : [];
  }

}