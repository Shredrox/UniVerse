import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, getAllPosts, getFriendsPosts } from "../services/postsService";

const useFeedData = (user, userRole) => {
  const queryClient = useQueryClient();

  const fetchAndSortPosts = async () => {
    try {
      const data = userRole === "ADMIN" ? await getAllPosts() : await getFriendsPosts(user) ;
      const sortedPosts = data.slice().sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return dateB - dateA;
      });
      return sortedPosts;
    } catch (error) {
      throw new Error(error);
    }
  }

  const {data: posts, 
    isLoading: isPostsLoading, 
    isError: isPostsError, 
    error: postsError
  } = useQuery({ 
    queryKey: ["posts", user],
    queryFn: fetchAndSortPosts
  });

  const {mutateAsync: addPostMutation} = useMutation({
    mutationFn: addPost,
    onSuccess: () =>{
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return {
    posts, 
    isPostsLoading, 
    isPostsError, 
    postsError,
    addPostMutation
  }
}

export default useFeedData
