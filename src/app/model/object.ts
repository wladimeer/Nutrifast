export class Object {}

export class User {
  id: string;
  rut: string;
  names: string;
  lastName: string;
  mothersLastName: string;
  registerDate: string;
  typeUser: string;
  address: string;
  commune: string;
  region: string;
  email: string;
  phone: number;
}

export class Ingredient {
  id: string;
  name: string;
  font: string;
  value: number;
  sodium: number;
  calcium: number;
  calories: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  typeValue: string;
  totalFats: number;
  cholesterol: number;
  totalProteins: number;
  saturatedFats: number;
  totalCarbohydrates: number;
  monoUnsaturatedFats: number;
  availableCarbohydrates: number;
  insolubleDietaryFiber: number;
  polyUnsaturatedFats: number;
  solubleDietaryFiber: number;
  registerDate: string;
  dietaryFiber: number;
  totalSugars: number;
  potassium: number;
  magnesium: number;
  insulin: number;
  iron: number;
}

export class Food {
  id: string;
  name: string;
  portion: number;
  servingPerContainer: number;
  quantitiesList: Array<Quantity>;
  createDate: string;
  idClient: string;
}

export class Quantity {
  idIngredient: string;
  ingredientPercentage: number;
}

export class NutritionalInformation {
  id: string;
  idFood: string;
  energy: number;
  protein: number;
  portion: number;
  idClient: string;
  totalFats: number;
  saturatedFats: number;
  monoUnsaturatedFats: number;
  polyUnsaturatedFats: number;
  servingPerContainer: number;
  availableCarbohydrates: number;
  totalCarbohydrates: number;
  transFattyAcids: number;
  insolubleFiber: number;
  solubleFiber: number;
  dietaryFiber: number;
  cholesterol: number;
  totalSugars: number;
  createDate: string;
  insulin: number;
  sodium: number;
}