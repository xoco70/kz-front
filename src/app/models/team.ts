import {Competitor} from './competitor';

export class Team {
  id: number;
  short_id: number;
  name: string;
  championship_id: number;
  picture: string;
  competitors: Competitor[];
  entity_type: number;
  entity_id: string;

  constructor(name: string) {
    this.name = name;
    this.competitors = [];
  }
}
