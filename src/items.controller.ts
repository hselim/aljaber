import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

export type Item = {
  code: string; // PMXG
  name: string; // Aspheric 1.74 Diamond+ PRO UV400
  brand: string; // EGMA
  index: number; // 1.74
  sphere: number; // e.g., -7.75
  cylinder: number; // e.g., 0.25
  diameter: number; // e.g., 70
};

type RawItemTuple = [code: string, name: string, brand: string, index: number | string, sphere: number | string, cylinder: number | string, diameter: number | string];

const RAW_ITEMS: ReadonlyArray<RawItemTuple> = [
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-7.75,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.25,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.5,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.75,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-7.75,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.25,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.5,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.75,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.25,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.5,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.75,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.25,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.5,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.75,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.25,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.5,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.75,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.25,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.5,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-8.75,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.25,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.5,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.75,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.25,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.5,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.75,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-11,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.25,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10,0.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.25,1,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.5,1.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.75,1.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-11,1.75,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-11.25,2,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.5,0,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-9.75,0.25,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10,0.5,70],
  ['PMXG','Aspheric 1.74 Diamond+ PRO UV400','EGMA',1.74,-10.25,0.75,70],
];

const ITEMS: Item[] = RAW_ITEMS.map(([code, name, brand, index, sphere, cylinder, diameter]) => ({
  code: String(code),
  name: String(name),
  brand: String(brand),
  index: Number(index),
  sphere: Number(sphere),
  cylinder: Number(cylinder),
  diameter: Number(diameter),
}));

@ApiTags('items')
@Controller('items')
export class ItemsController {
  @Get()
  @ApiOkResponse({
    description: 'List of lens items',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string', example: 'PMXG' },
          name: { type: 'string', example: 'Aspheric 1.74 Diamond+ PRO UV400' },
          brand: { type: 'string', example: 'EGMA' },
          index: { type: 'number', example: 1.74 },
          sphere: { type: 'number', example: -7.75 },
          cylinder: { type: 'number', example: 0.25 },
          diameter: { type: 'number', example: 70 },
        },
      },
      example: [
        {
          code: 'PMXG',
          name: 'Aspheric 1.74 Diamond+ PRO UV400',
          brand: 'EGMA',
          index: 1.74,
          sphere: -7.75,
          cylinder: 0.25,
          diameter: 70,
        },
      ],
    },
  })
  list() {
    return ITEMS;
  }
}
