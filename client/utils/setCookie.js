const setCookie = (key, value, expires)=>{
    document.cookie = `${key}=${value}; expires=${new Date(expires?Date.now()+1000*60*60*24*expires:Date.now())}`;
}

export default setCookie;