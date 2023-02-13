import axios from "axios";

const AUTHORIZE = import.meta.env.VITE_SPOTIFY_AUTHORIZE;
export const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
export const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URL;

let authUrl = AUTHORIZE;
authUrl += `?client_id=${client_id}`;
authUrl += `&response_type=code`;
authUrl += `&redirect_uri=${encodeURI(redirect_uri)}`;
authUrl += `&show_dialog=true`;
authUrl += `&scope=user-read-private user-top-read user-read-email user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private`;

export const connectRoute = authUrl;

const host = "https://api.spotify.com/v1";

export const TOKEN = "https://accounts.spotify.com/api/token";
export const PLAYLISTS = `${host}/me/playlists`;
export const DEVICES = `${host}/me/player/devices`;
export const PLAY = `${host}/me/player/play`;
export const PAUSE = `${host}/me/player/pause`;
export const NEXT = `${host}/me/player/next`;
export const PREVIOUS = `${host}/me/player/previous`;
export const PLAYER = `${host}/me/player`;
export const TRACKS = `${host}/playlists/{{PlaylistId}}/tracks`;
export const CURRENTLYPLAYING = `${host}/me/player/currently-playing`;
export const SHUFFLE = `${host}/me/player/shuffle`;
export const REPEAT = `${host}/me/player/repeat`;
const searchRoute = `${host}/search`
const topItemsRoute = `${host}/me/top/`;
export const getUserPlaylists = `${host}/me/playlists`;
const getPlaylist = `${host}/playlists`;

export const getUser = async (access_token) => {
    const { data } = await axios.get(`${host}/me?access_token=${access_token}`)
    .catch(function (error) {
        return "Something went wrong";
    })

    return data;
}

export const getPlaylistContent = async (id) => {
    const access_token = localStorage.getItem('access_token');
    refreshAccessToken(localStorage.getItem('refresh_token'));
    const config = {
        headers:{
            "Authorization": `Bearer ${access_token}`
        }
    }

    const { data } = await axios.get(`${getPlaylist}/${id}`, config);
    return data;
}

export const searchTracks = async (query) => {
    refreshAccessToken(localStorage.getItem('refresh_token'));
    const config = {
        headers:{
            "Authorization": `Bearer ${access_token}`
        }
    }

    const { data } = await axios.get(`${searchRoute}?q=${query}&type=track`, config);
    return data;
}

export const getTopItems = async (type, limit = 10) => {
    const access_token = localStorage.getItem('access_token');
    refreshAccessToken(localStorage.getItem('refresh_token'));
    const config = {
        headers:{
            "Authorization": `Bearer ${access_token}`
        }
    }

    const { data } = await axios.get(`${topItemsRoute}${type}?limit=${limit}`, config);
    return data;
}

export function onPageLoad(){
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
        if ( access_token == null ){
            // we don't have an access token so present token section
            document.getElementById("tokenSection").style.display = 'block';  
        }
        else {
            // we have an access token so present device section
            document.getElementById("deviceSection").style.display = 'block';  
            refreshDevices();
            refreshPlaylists();
            currentlyPlaying();
        }
    }
    refreshRadioButtons();
}

export function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}

export function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

export function requestAuthorization(){
    client_id = document.getElementById("clientId").value;
    client_secret = document.getElementById("clientSecret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

export const fetchAccessToken = async ( code ) => {
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

export async function refreshAccessToken(refresh_token){
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    const message = callAuthorizationApi(body);

    return message;
}

export function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;

    const msg = xhr.onload;
    return msg;
}

export function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        const data = JSON.parse(this.responseText);
        if (data.access_token === undefined){
            return 'error';
        }
        if (data.refresh_token  === undefined ){
            return 'error';
        }
        let access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
        let refresh_token = data.refresh_token;
        localStorage.setItem("refresh_token", refresh_token);
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

export function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

// export function handleApiResponse(){
//     if ( this.status == 200){
//         console.log(this.responseText);
//         setTimeout(currentlyPlaying, 2000);
//     }
//     else if ( this.status == 204 ){
//         setTimeout(currentlyPlaying, 2000);
//     }
//     else if ( this.status == 401 ){
//         refreshAccessToken()
//     }
//     else {
//         console.log(this.responseText);
//         alert(this.responseText);
//     }    
// }