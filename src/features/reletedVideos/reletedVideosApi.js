import axiosInstance from '../../utils/axios';

export const getReletedVideos = async ({ tags, id }) => {
   console.log(tags, id);
   // tags_like=javascript&tags_like=react&id_ne=1&_limit=5
   const limit = 5;
   const queryString =
      tags.length > 0
         ? tags.map((tag) => `tags_like=${tag}`).join('&') + `&id_ne=${id}&_limit=${limit}`
         : `id_ne=${id} &_limit=${limit}`;
   const response = await axiosInstance.get(`/videos?${queryString}`);
   return response.data;
};
