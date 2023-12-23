import axios from "./axios"

export const getJobs = async () =>{
    const response = await axios.get('/jobs');
    return response.data;
}

export const getJobById = async (id) =>{
    return await axios.get(`/jobs/${id}`, id);
}

export const applyToJob = async ({jobId, username}) =>{
    const response = await axios.post(`/jobs/${jobId}/apply`, {
        params: {
          username: username
        }
    });
    
    return response.data;
}

export const addJob = async (job) =>{
    return await axios.post('/jobs/createJob', job);
}

export const updateJob = async (job) =>{
    return await axios.patch(`/jobs/${job.id}`, job);
}

export const deleteJob = async (id) =>{
    return await axios.delete(`/jobs/${id}`, id);
}
