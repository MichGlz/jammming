import React, { useContext, useState, useEffect } from "react";


export const SpotifyContext = React.createContext();

export function useAuth() {
  return useContext(SpotifyContext);
}

export function AuthProvider({ children }) {

  

}