const getCookie = (name)=>{
    let cookieList = document.cookie.split(';').find(e=>e.search(name)!==-1);
    let cookie = cookieList&&cookieList.split('=')[1];
    return cookie;
}

export default getCookie