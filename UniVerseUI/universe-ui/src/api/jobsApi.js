import axios from "./axios"

export const getJobs = async () =>{
    const response = await axios.get('/Jobs/GetAllJobs');
    return response.data;
}

export const addJob = async (job) =>{
    return await axios.post('/Jobs/CreateJobOffer', job);
}

export const updateJob = async (job) =>{
    return await axios.patch(`/Jobs/${job.id}`, job);
}

export const deleteJob = async ({id}) =>{
    return await axios.delete(`/Jobs/${id}`, id);
}
