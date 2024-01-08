import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNews, getNewsById, updateNews } from "../services/newsService";

const useNewsData = (newsId) =>{
  const queryClient = useQueryClient();

  const {data: news, 
    isLoading: isNewsLoading, 
    isError: isNewsError, 
    error: newsError
  } = useQuery({ 
    queryKey: ["newsDetails", newsId],
    queryFn: () => getNewsById(newsId),
  });

  const {mutateAsync: updateNewsMutation} = useMutation({
    mutationFn: updateNews,
    onSuccess: () =>{
      queryClient.invalidateQueries(["newsDetails", newsId]);
    },
  });

  const {mutateAsync: deleteNewsMutation} = useMutation({
    mutationFn: deleteNews,
    onSuccess: () =>{
      queryClient.invalidateQueries(["news"]);
    },
  });

  return {
    news, 
    isNewsLoading, 
    isNewsError, 
    newsError,
    updateNewsMutation,
    deleteNewsMutation
  }
}

export default useNewsData
