import axios from "./axios";

// export const getNews = async () =>{
//     const response = await axios.get('/News/GetAllNews');
//     return response.data;
// }

// export const getNewsByTitle = async (title) =>{
//     const response = await axios.get(`/News/${title}`);
//     return response.data;
// }

export const getNews = () =>{
    const newsList = [
        { pinned: false, title: "Lorem ipsum dolor sit amethfermhlkaekjgnalkejrngkajernghfahjajfhhhhhhhhhhfhadfjhnafdljhnadlfnhljtujsrtjsrtjstrkadfnhkjadfnhkjlandflkjhnadflkjhnaldfkjhnadlkfjhnakjdfnhkajdfnhkjadnhuraenhuaerhjnerhnaeruhnaerjhnaerunhgdfjnhaerhafdjkhnalejrn", image: "https://picsum.photos/1000/500", date: "26.11.2023" },
        { pinned: true, title: "nvnsvkajsdnglakj", image: "https://picsum.photos/700/400", date: "02.12.2023" },
        { pinned: true, title: "nonvindivnsvkajsdnglakj", image: "https://picsum.photos/300/400", date: "01.12.2023" },
        { pinned: false, title: "novini 2", image: "https://picsum.photos/600/400", date: "03.12.2023" },
        { pinned: false, title: "novini 3", text: "aaenhlkjaernhsjtrsjjjjadfjgfdjsrtjkrstkjmsrlktjlksrtmhksrmthkmsrtlkhmkjmsrlktjlksrtmhksrmthkmsrkjmsrlktjlksrtmhksrmthkmsrkjmsrlktjlksrtmhksrmthkmsrkjmsrlktjlksrtmhksrmthkmsrkjmsrlktjlksrtmhksrmthkmsrkjmsrlktjlksrtmhksrmthkmsrkjmsrlktjlksrtmhksrmthkmsrsrtlkhmsrtlkhmrstlkmhsrtkmh;lskrtmhtlkrjjjjjjjjjjjjjjjjjjjjjjjjjjjjgsjfgjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgjjjgsjfgkja", image: "https://picsum.photos/3840/2160", date: "01.12.2023" }
    ];
    
    return newsList;
}

export const getNewsByTitle = async (title) =>{
    const result = getNews().find(news => news.title === title);
    return result;
}

export const addNews = async (news) =>{
    return await axios.post('/News/CreateNews', news);
}

export const updateNews = async (news) =>{
    return await axios.patch(`/News/${post.id}`, news);
}

export const deleteNews = async ({id}) =>{
    return await axios.delete(`/News/${id}`, id);
}
