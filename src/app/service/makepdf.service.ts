import { Injectable } from '@angular/core';
import { NutritionalInformation } from '../model/object';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class MakepdfService {
  constructor() {}

  builder(label: NutritionalInformation, type: number) {
    let documentDefinition: any;

    switch (type) {
      case 1:
        documentDefinition = {
          info: {
            title: 'Topishot Chile',
            author: 'Nutrifast',
          },
          content: [
            {
              table: {
                body: [
                  [
                    {
                      text: 'Topishot (Chile)',
                      fillColor: '#DC3545',
                      colSpan: 3,
                      bold: true,
                    },
                    {},
                    {},
                  ],
                  [
                    {
                      text: 'Información Nutricional',
                      colSpan: 3,
                      bold: true,
                    },
                    {},
                    {},
                  ],
                  [
                    {
                      text: [
                        {
                          text: 'Porción: ',
                          bold: true,
                        },
                        ,
                        {
                          text: label.portion + ' (' + label.typeValue + ')\n',
                        },
                        {
                          text: 'Porción por Envase: ',
                          bold: true,
                        },
                        { text: label.servingPerContainer },
                      ],
                      alignment: 'left',
                      colSpan: 3,
                    },
                    {},
                    {},
                  ],
                  [
                    {
                      text: '',
                      border: [true, false, false, true],
                      colSpan: 2,
                    },
                    {},
                    {
                      columns: [
                        {
                          text: '100g',
                        },
                        {
                          text: '1 Porción',
                        },
                      ],
                      border: [false, true, true, true],
                      colSpan: 1,
                    },
                  ],
                  [
                    {
                      text: [
                        { text: 'Energía (kcal)\n', bold: true },
                        { text: 'Proteínas (g)\n', bold: true },
                        { text: 'Grasas Totales (g)\n', bold: true },
                        {
                          text: '\u200B\t\tAc. Grasos Trans (g)\n',
                          bold: true,
                        },
                        { text: 'Colesterol (mg)\n', bold: true },
                        { text: 'H. de C. Dis. (g)\n', bold: true },
                        {
                          text: '\u200B\t\tAzúcares Totales (g)\n',
                          normal: true,
                        },
                        {
                          text: '\u200B\t\tFibra Dietetica (g)\n',
                          normal: true,
                        },
                        {
                          text: '\u200B\t\t\tFibra Soluble (g)\n',
                          normal: true,
                        },
                        {
                          text: '\u200B\t\t\tFibra Insoluble (g)\n',
                          normal: true,
                        },
                        { text: '\u200B\t\t\tInsulina (g)\n', normal: true },
                        { text: 'Sodio (mg)', bold: true },
                      ],
                      border: [true, false, false, true],
                      alignment: 'left',
                      colSpan: 2,
                    },
                    {},
                    {
                      columns: [
                        {
                          text:
                            label.energy +
                            '\n' +
                            label.protein.toFixed(1) +
                            '\n' +
                            label.totalFats.toFixed(1) +
                            '\n' +
                            label.transFattyAcids.toFixed(1) +
                            '\n' +
                            label.cholesterol.toFixed(1) +
                            '\n' +
                            label.availableCarbohydrates.toFixed(1) +
                            '\n' +
                            label.totalSugars.toFixed(1) +
                            '\n' +
                            label.dietaryFiber.toFixed(1) +
                            '\n' +
                            label.solubleFiber.toFixed(1) +
                            '\n' +
                            label.insolubleFiber.toFixed(1) +
                            '\n' +
                            label.insulin.toFixed(1) +
                            '\n' +
                            label.sodium.toFixed(1),
                        },
                        {
                          text:
                            (label.energy / 4).toFixed() +
                            '\n' +
                            (label.protein / 4).toFixed(1) +
                            '\n' +
                            (label.totalFats / 4).toFixed(1) +
                            '\n' +
                            (label.transFattyAcids / 4).toFixed(1) +
                            '\n' +
                            (label.cholesterol / 4).toFixed(1) +
                            '\n' +
                            (label.availableCarbohydrates / 4).toFixed(1) +
                            '\n' +
                            (label.totalSugars / 4).toFixed(1) +
                            '\n' +
                            (label.dietaryFiber / 4).toFixed(1) +
                            '\n' +
                            (label.solubleFiber / 4).toFixed(1) +
                            '\n' +
                            (label.insolubleFiber / 4).toFixed(1) +
                            '\n' +
                            (label.insulin / 4).toFixed(1) +
                            '\n' +
                            (label.sodium / 4).toFixed(1),
                        },
                      ],
                      border: [false, true, true, true],
                      colSpan: 1,
                    },
                  ],
                ],
                widths: ['*', '*', '*'],
              },
              style: 'table',
            },
          ],
          styles: {
            table: {
              normal: true,
              fontSize: 12,
              alignment: 'center',
              // margin: [0, 5, 0, 15],
            },
          },
        };
        break;
      case 2:
        documentDefinition = {
          info: {
            title: 'Topishot USA',
            author: 'Nutrifast',
          },
          content: [
            {
              table: {
                body: [
                  [
                    {
                      text: 'Topishot (USA)',
                      fillColor: '#DC3545',
                      colSpan: 3,
                      bold: true,
                    },
                    {},
                    {},
                  ],
                  [
                    {
                      text: 'Información Nutricional',
                      colSpan: 3,
                      bold: true,
                    },
                    {},
                    {},
                  ],
                  [
                    {
                      text: [
                        {
                          text: 'Porción: ',
                          bold: true,
                        },
                        ,
                        {
                          text: label.portion + ' (' + label.typeValue + ')\n',
                        },
                        {
                          text: 'Porción por Envase: ',
                          bold: true,
                        },
                        { text: label.servingPerContainer },
                      ],
                      alignment: 'left',
                      colSpan: 3,
                    },
                    {},
                    {},
                  ],
                  [
                    {
                      text: '',
                      border: [true, false, false, true],
                      colSpan: 2,
                    },
                    {},
                    {
                      columns: [
                        {
                          text: '100g',
                        },
                        {
                          text: '1 Porción',
                        },
                      ],
                      border: [false, true, true, true],
                      colSpan: 1,
                    },
                  ],
                  [
                    {
                      text: [
                        { text: 'Energía (kcal)\n', bold: true },
                        { text: 'Proteínas (g)\n', bold: true },
                        { text: 'Grasas Totales (g)\n', bold: true },
                        { text: '\u200B\tGrasas Saturadas (g)\n', bold: true },
                        {
                          text: '\u200B\tGrasas Monoinsaturadas (g)\n',
                          bold: true,
                        },
                        {
                          text: '\u200B\tGrasas Poliinsaturadas (g)\n',
                          bold: true,
                        },
                        {
                          text: '\u200B\t\tAc. Grasos Trans (g)\n',
                          bold: true,
                        },
                        { text: 'Colesterol (mg)\n', bold: true },
                        { text: 'H. de C. Totales (g)\n', bold: true },
                        {
                          text: '\u200B\t\tAzúcares Totales (g)\n',
                          normal: true,
                        },
                        {
                          text: '\u200B\t\tFibra Dietetica (g)\n',
                          normal: true,
                        },
                        {
                          text: '\u200B\t\t\tFibra Soluble (g)\n',
                          normal: true,
                        },
                        {
                          text: '\u200B\t\t\tFibra Insoluble (g)\n',
                          normal: true,
                        },
                        { text: '\u200B\t\t\tInsulina (g)\n', normal: true },
                        { text: 'Sodio (mg)', bold: true },
                      ],
                      border: [true, false, false, true],
                      alignment: 'left',
                      colSpan: 2,
                    },
                    {},
                    {
                      columns: [
                        {
                          text:
                            label.energy +
                            '\n' +
                            label.protein.toFixed(1) +
                            '\n' +
                            label.totalFats.toFixed(1) +
                            '\n' +
                            label.saturatedFats.toFixed(1) +
                            '\n' +
                            label.monoUnsaturatedFats.toFixed(1) +
                            '\n' +
                            label.polyUnsaturatedFats.toFixed(1) +
                            '\n' +
                            label.transFattyAcids.toFixed(1) +
                            '\n' +
                            label.cholesterol.toFixed(1) +
                            '\n' +
                            label.totalCarbohydrates.toFixed(1) +
                            '\n' +
                            label.totalSugars.toFixed(1) +
                            '\n' +
                            label.dietaryFiber.toFixed(1) +
                            '\n' +
                            label.solubleFiber.toFixed(1) +
                            '\n' +
                            label.insolubleFiber.toFixed(1) +
                            '\n' +
                            label.insulin.toFixed(1) +
                            '\n' +
                            label.sodium.toFixed(1),
                        },
                        {
                          text:
                            (label.energy / 4).toFixed() +
                            '\n' +
                            (label.protein / 4).toFixed(1) +
                            '\n' +
                            (label.totalFats / 4).toFixed(1) +
                            '\n' +
                            (label.saturatedFats / 4).toFixed(1) +
                            '\n' +
                            (label.monoUnsaturatedFats / 4).toFixed(1) +
                            '\n' +
                            (label.polyUnsaturatedFats / 4).toFixed(1) +
                            '\n' +
                            (label.transFattyAcids / 4).toFixed(1) +
                            '\n' +
                            (label.cholesterol / 4).toFixed(1) +
                            '\n' +
                            (label.totalCarbohydrates / 4).toFixed(1) +
                            '\n' +
                            (label.totalSugars / 4).toFixed(1) +
                            '\n' +
                            (label.dietaryFiber / 4).toFixed(1) +
                            '\n' +
                            (label.solubleFiber / 4).toFixed(1) +
                            '\n' +
                            (label.insolubleFiber / 4).toFixed(1) +
                            '\n' +
                            (label.insulin / 4).toFixed(1) +
                            '\n' +
                            (label.sodium / 4).toFixed(1),
                        },
                      ],
                      border: [false, true, true, true],
                      colSpan: 1,
                    },
                  ],
                ],
                widths: ['*', '*', '*'],
              },
              style: 'table',
            },
          ],
          styles: {
            table: {
              normal: true,
              fontSize: 12,
              alignment: 'center',
              // margin: [80, 0, 80, 0],
            },
          },
        };
        break;
    }

    pdfMake.createPdf(documentDefinition).open();
  }
}
