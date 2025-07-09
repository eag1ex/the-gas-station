// constants/api-messages.constant.ts
export const API_MESSAGES = {
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

export function wrapMessage(
  message: string,
  recipe?: any,
  type: 'single' | 'list' = 'single',
) {
  const payload: any = { message };
  if (recipe) {
    // if this was payload.data then we could use as global wrapper for all controllers
    // make sure recipe is an array always
    if (type === 'single') {
      payload.recipe = !Array.isArray(recipe) ? [recipe] : recipe;
    } else if (type === 'list') {
      payload.recipes = Array.isArray(recipe) ? recipe : [recipe];
    }
  }
  return payload;
}
export function wrapList(recipeList: any[]) {
  return { recipes: recipeList };
}
