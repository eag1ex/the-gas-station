import { formatDate } from '../utils';

// constants/api-messages.constant.ts
export const API_MESSAGES = {
  SERVICE_FAILURE: 'Service is currently unavailable. Please try again later.',
  HELLO: 'Hello world',
  EMPTY: 'No recipes found.',
  INVALID_ID: 'Invalid recipe ID',
  CREATE_SUCCESS: 'Recipe successfully created!',
  CREATE_FAILURE: 'Recipe creation failed!',
  GET_ALL_SUCCESS: 'Recipe list retrieved successfully!', // <- use this
  GET_BY_ID_SUCCESS: 'Recipe details by id',
  GET_BY_ID_NOT_FOUND: 'No recipe found',
  UPDATE_SUCCESS: 'Recipe successfully updated!',
  DELETE_SUCCESS: 'Recipe successfully removed!',
  DELETE_NOT_FOUND: 'No recipe found',
  REQUIRED_FIELDS: 'title, making_time, serves, ingredients, cost',
};

const normalize = (recipe: any) => {
  const result = { ...recipe };
  if (result.created_at) result.created_at = formatDate(result.created_at);
  if (result.updated_at) result.updated_at = formatDate(result.updated_at);
  return result;
};

export function wrapMessage(
  message: string,
  recipe?: any,
  type: 'single' | 'list' = 'single',
) {
  const payload: any = { message };

  if (recipe) {
    if (type === 'single') {
      const normalized = normalize(recipe);
      payload.recipe = Array.isArray(normalized) ? normalized : [normalized];
    } else if (type === 'list') {
      const normalized = Array.isArray(recipe)
        ? recipe.map((r) => normalize(r))
        : [normalize(recipe)];
      payload.recipes = normalized;
    }
  }

  return payload;
}
