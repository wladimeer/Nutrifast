import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class MakepdfService {
  constructor() {
    var fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
      },
    };
  }

  builder() {
    let documentDefinition = {
      info: {
        title: 'nombre alimento',
        author: 'Nutrifast',
        subject: 'subject of document',
      },
      content: [
        { text: 'Nutrifast\n\n', style: 'header' },
        'Estimado cliente nombre, a continuación se presentan las etiquetas solicitadas.\n\n',
        {
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?'],
            ],
            widths: [200, '*', 200],
          },
          style: 'table',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        commentary: {
          fontSize: 15,
          normal: true,
        },
        table: {
          alignment: 'center',
          fontSize: 15,
          normal: true,
          margin: [0, 5, 0, 15],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
