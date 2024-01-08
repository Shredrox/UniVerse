import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNews, getNews } from "../services/newsService";

const useNewsListData = () =>{
  const queryClient = useQueryClient();

  const {data: newsData, 
    isLoading: isNewsDataLoading, 
    isError: isNewsDataError, 
    error: newsDataError
  } = useQuery({ 
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  const news = newsData?.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    } else {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    }
  });

  const {mutateAsync: addNewsMutation} = useMutation({
    mutationFn: addNews,
    onSuccess: () =>{
      queryClient.invalidateQueries(["news"]);
    },
  });

  return {
    news, 
    isNewsDataLoading, 
    isNewsDataError, 
    newsDataError,
    addNewsMutation
  }
}

export default useNewsListData
