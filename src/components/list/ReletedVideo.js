import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReletedVideos } from '../../features/reletedVideos/reletedVideosSlice';
import Loading from '../../utils/Loading';
import ReletedVideoItem from './ReletedVideoItem';

const ReletedVideo = ({ tags, id }) => {
   const { reletedVideos, isLoading, isError, error } = useSelector((state) => state.reletedVideos);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchReletedVideos({ tags, id }));
   }, [dispatch, tags, id]);

   let content;
   if (isLoading) content = <Loading />;
   if (!isLoading && isError) content = <div className="col-span-12">{error}</div>;
   if (!isLoading && !isError && reletedVideos?.length === 0)
      content = <div className="col-span-12">Video not found</div>;
   if (!isLoading && !isError && reletedVideos.length > 0)
      content = reletedVideos.map((video) => <ReletedVideoItem key={video.id} video={video} />);

   return <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">{content}</div>;
};

export default ReletedVideo;
