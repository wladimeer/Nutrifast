export class Object {}

export class User {
  id: string;
  rut: string;
  names: string;
  lastName: string;
  mothersLastName: string;
  typeUser: string;
  email: string;
  address: string;
  phone: number;
  commune: string;
  region: string;
  registerDate: string;
}

export class Ingredient {
  id: string;
  name: string;
  font: string;
  value: number;
  typeValue: string;
  totalProteins: number;
  totalFats: number;
  saturatedFats: number;
  monoUnsaturatedFats: number;
  polyUnsaturatedFats: number;
  cholesterol: number;
  totalCarbohydrates: number;
  availableCarbohydrates: number;
  totalSugars: number;
  dietaryFiber: number;
  solubleDietaryFiber: number;
  insolubleDietaryFiber: number;
  sodium: number;
  calcium: number;
  calories: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  iron: number;
  potassium: number;
  magnesium: number;
  insulin: number;
  registerDate: string;
}

export class Food {
  id: string;
  name: string;
  quantitiesList: Array<Quantity>;
  idClient: string;
  portion: number;
  servingPerContainer: number;
  createDate: string;
}

export class Quantity {
  idIngredient: string;
  ingredientPercentage: number;
}

export class NutritionalInformation {
  id: string;
  idClient: string;
  idFood: string;
  portion: number;
  servingPerContainer: number;
  energy: number;
  protein: number;
  totalFats: number;
  saturatedFats: number;
  monounsaturatedFats: number;
  polyunsaturatedFats: number;
  transFattyAcids: number;
  cholesterol: number;
  totalCarbohydrates: number;
  totalSugars: number;
  dietaryFiber: number;
  solubleFiber: number;
  insolubleFiber: number;
  insulin: number;
  sodium: number;
  createDate: string;
}