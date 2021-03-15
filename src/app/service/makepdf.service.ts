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
                            (label.energy / label.servingPerContainer) * 4 +
                            '\n' +
                            (
                              (label.protein / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.totalFats / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.transFattyAcids /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.cholesterol / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.availableCarbohydrates /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.totalSugars / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.dietaryFiber / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.solubleFiber / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.insolubleFiber /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.insulin / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.sodium / label.servingPerContainer) *
                              4
                            ).toFixed(1),
                        },
                        {
                          text:
                            (
                              label.energy / label.servingPerContainer
                            ).toFixed() +
                            '\n' +
                            (label.protein / label.servingPerContainer).toFixed(
                              1
                            ) +
                            '\n' +
                            (
                              label.totalFats / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.transFattyAcids / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.cholesterol / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.availableCarbohydrates /
                              label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.totalSugars / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.dietaryFiber / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.solubleFiber / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.insolubleFiber / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (label.insulin / label.servingPerContainer).toFixed(
                              1
                            ) +
                            '\n' +
                            (label.sodium / label.servingPerContainer).toFixed(
                              1
                            ),
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
                            (label.energy / label.servingPerContainer) * 4 +
                            '\n' +
                            (
                              (label.protein / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.totalFats / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.saturatedFats /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.monoUnsaturatedFats /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.polyUnsaturatedFats /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.transFattyAcids /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.cholesterol / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.totalCarbohydrates /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.totalSugars / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.dietaryFiber / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.solubleFiber / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.insolubleFiber /
                                label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.insulin / label.servingPerContainer) *
                              4
                            ).toFixed(1) +
                            '\n' +
                            (
                              (label.sodium / label.servingPerContainer) *
                              4
                            ).toFixed(1),
                        },
                        {
                          text:
                            (
                              label.energy / label.servingPerContainer
                            ).toFixed() +
                            '\n' +
                            (label.protein / label.servingPerContainer).toFixed(
                              1
                            ) +
                            '\n' +
                            (
                              label.totalFats / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.saturatedFats / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.monoUnsaturatedFats /
                              label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.polyUnsaturatedFats /
                              label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.transFattyAcids / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.cholesterol / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.totalCarbohydrates /
                              label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.totalSugars / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.dietaryFiber / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.solubleFiber / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (
                              label.insolubleFiber / label.servingPerContainer
                            ).toFixed(1) +
                            '\n' +
                            (label.insulin / label.servingPerContainer).toFixed(
                              1
                            ) +
                            '\n' +
                            (label.sodium / label.servingPerContainer).toFixed(
                              1
                            ),
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
