import axios from "../api/axios"

export const getJobs = async () =>{
    const response = await axios.get('/jobs');
    return response.data;
}

export const getJobById = async (id) =>{
    const response = await axios.get(`/jobs/${id}`, id);
    return response.data;
}

export const getIsAppliedToJob = async (jobId, username) =>{
    const response = await axios.get(`/jobs/${jobId}/is-applied/${username}`);
    return response.data;
}

export const applyToJob = async ({jobId, username}) =>{
    const response = await axios.post(`/jobs/${jobId}/apply/${username}`);
    return response.data;
}

export const cancelApplicationToJob = async ({jobId, username}) =>{
    const response = await axios.post(`/jobs/${jobId}/cancel-application/${username}`);
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
