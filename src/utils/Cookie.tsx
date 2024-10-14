interface CookieDefinitionValues<T> {
  name: string;
  value: T;
  time: number;
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export async function setCookie<T>({
  name,
  value,
  time,
}: CookieDefinitionValues<T>) {
  let expires = '';

  if (time) {
    const date = new Date();
    date.setTime(date.getTime() + time * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export async function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
