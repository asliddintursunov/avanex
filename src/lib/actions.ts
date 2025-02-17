import cookies from "js-cookie";

export function setCookie(key: string, value: string) {
  cookies.set(key, value, {
    httpOnly: false,
    secure: true,
    expires: 24,
  });
}

export function getCookie(key: string) {
  const value = cookies.get(key);
  return value;
}

export function removeCookies() {
  cookies.remove("access_token");
  cookies.remove("jobTitle");
}
