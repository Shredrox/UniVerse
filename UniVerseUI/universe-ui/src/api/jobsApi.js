import axios from "./axios"

// export const getJobs = async () =>{
//     const response = await axios.get('/Jobs/GetAllJobs');
//     return response.data;
// }

// export const getJobById = async (id) =>{
//     return await axios.get(`/Jobs/${id}`, id);
// }

export const getJobs = () =>{
    const jobs = [
        {
            id: "1",
            title: "Frontend Developer",
            company: "Microsoft",
            type: "Full Time",
            requirements: "Senior",
            location: "Plovdiv",
            datePosted: "3-12-2023",
            description: "ahgjasngjslgjnrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrlgjnrkbjnlkrkbjnlkrdbnlkdfbdfb"
        },
        {
            id: "2",
            title: "Test 2",
            company: "Amazing company",
            requirements: "Junior",
            location: "Sofia",
            datePosted: "3-12-2023",
            type: "Part Time"
        },
        {
            id: "3",
            title: "Test 3",
            company: "MarsBros",
            requirements: "Mid",
            location: "Mars",
            datePosted: "3-12-2023",
            type: "Internship"
        },
        {
            id: "4",
            title: "Test 1",
            requirements: "Senior",
            location: "Sofia"
        },
        {
            id: "5",
            title: "Test 2",
            requirements: "Junior",
            location: "Sofia"
        },
        {
            id: "6",
            title: "Test 3",
            requirements: "Mid"
        },
        {
            id: "7",
            title: "Test 1",
            requirements: "Senior"
        },
        {
            id: "8",
            title: "Test 2",
            requirements: "Junior"
        },
        {
            id: "9",
            title: "Test 3",
            requirements: "Mid"
        }
    ]

    return jobs;

    //const response = await axios.get('/Jobs/GetAllJobs');
    //return response.data;
}

export const getJobById = (id) =>{
    const result = getJobs().find(job => job.id === id);
    return result;

    //return await axios.get(`/Jobs/${id}`, id);
}

export const applyToJob = ({jobId, username}) =>{
    //TO DO: Add request and API endpoint
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
