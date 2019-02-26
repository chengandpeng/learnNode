import mapKeys from 'lodash/mapKeys';
import { FETCH_BLOGS, FETCH_BLOG, DELETE_BLOG } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BLOG:
      const blog = action.payload;
      return { ...state, [blog._id]: blog };
    case FETCH_BLOGS:
      return { ...state, ...mapKeys(action.payload, '_id') };
    case DELETE_BLOG:
      const { meta: { id }, payload } = action;
      if (payload) {
        const { [id]: value, ...rest } = state;
        return rest;
      }
      return state;
    default:
      return state;
  }
}
