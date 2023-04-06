import axios from 'axios';
const prodUrl = 'http://127.0.0.1:8000'

export const add_user_data = (data) => axios.post(`${prodUrl}/blogs/add_user`,data);
export const get_blogs = (query) => axios.get(`${prodUrl}/blogs/get_blog?${query}`)
export const add_post = (data) => axios.post(`${prodUrl}/blogs/add_post`,data);

// export const get_post_by_id = (id) => axios.get(`${prodUrl}/blogs/get_blog?${id}`);

export const delete_blog = async (query) => {
    const response = await axios.get(`${prodUrl}/blogs/delete_blog?${query}`)
    return response.data;
}

export const user_exist = async (email) => {
    const response = await axios.get(`${prodUrl}/blogs/user_exist?${email}`)
    return response.data;
}

export const check_password = async (query) => {
    const response = await axios.get(`${prodUrl}/blogs/check_password?${query}`)
    return response.data;
}

export const get_post_by_id = async (id) => {
    const response = await axios.get(`${prodUrl}/blogs/get_blog?${id}`)
    return response.data;
}

export const get_role= async (query) => {
    const response = await axios.get(`${prodUrl}/blogs/get_role?${query}`)
    return response.data;
}



export const update_content = (data) =>{ 
    console.log("${prodUrl}/blogs/update_blog"+data);
    axios.post(`${prodUrl}/blogs/update_blog`,data)};



