
export function fetchUser(details) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: details }), 2000);
  });
}

export function fetchRegisterUser(details) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: details }), 2000);
  });
}
