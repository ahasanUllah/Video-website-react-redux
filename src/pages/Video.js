import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Player from '../components/description/Player';
import VideoDescription from '../components/description/VideoDescription';
import ReletedVideo from '../components/list/ReletedVideo';
import { fetchVideo } from '../features/video/videoSlice';
import Loading from '../utils/Loading';

const Video = () => {
   const { video, isLoading, isError, error } = useSelector((state) => state.video);
   const dispatch = useDispatch();
   const { videoId } = useParams();
   const { id, link, title, tags } = video || {};
   useEffect(() => {
      dispatch(fetchVideo(videoId));
   }, [dispatch, videoId]);

   let content;
   if (isLoading) content = <Loading />;
   if (!isLoading && isError) content = <div className="col-span-12">{error}</div>;
   if (!isLoading && !isError && !video?.id) content = <div className="col-span-12">Video not found</div>;
   if (!isLoading && !isError && video?.id)
      content = (
         <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
               {/* <!-- video player --> */}
               <Player link={link} title={title} id={id} />

               {/* <!-- video description --> */}
               <VideoDescription video={video} />
            </div>

            {/* <!-- related videos --> */}
            <ReletedVideo tags={tags} id={id} />
         </div>
      );

   return (
      <section className="pt-6 pb-20">
         <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">{content}</div>
      </section>
   );
};

export default Video;
