export const isBadResponse = (response)=> {
  return response.status === 200 ? false : true;
}
