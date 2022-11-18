import React from 'react';

export const AppContext = React.createContext({
  booking: null,
  wishlist: [],
  countersOnline:[],
  toggleWishlist: () => {},
  toggleCounterStatus: () => {},
  addToCart: () => {},
  removeFromCart: () => {}
});
