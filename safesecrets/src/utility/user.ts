export interface User {
  id: string,
  name: string,
  email: string,
  country: string,
  phone: number,
  token: string
}

export const getUser = () : (User | null) => {
  const user = sessionStorage.getItem('ss_usr');
  if(user){
    return JSON.parse(user);
  }

  return null;
}

export const setUser = (user: User) => {
  sessionStorage.setItem('ss_usr', JSON.stringify(user));
}

export const clearCacheAndRedirect = () => {
  sessionStorage.clear();
  window.location = '/';
}