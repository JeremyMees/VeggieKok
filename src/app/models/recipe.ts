import { Ingredient } from './ingredient';

export interface Recipe {
  name: string;
  description: string;
  difficulty: string;
  time: number;
  image: any;
  steps: Array<string>;
  ingredients: Array<Ingredient>;
  created_at: Date;
  id: number;
}
