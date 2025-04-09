"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  EllipsisVertical,
  Globe,
  MessageCircle,
  Share2,
  ThumbsUp,
  Send,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import postServices from "@/services/post.services";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";

type ViewPostProps = {
  postData: any;
};

const ViewPost: React.FC<ViewPostProps> = ({ postData }) => {
  const { userId } = useUserStore();
  const [liked, setLiked] = useState(() =>
    postData?.like?.some((l: any) => l.user === userId)
  );
  const [likeCount, setLikeCount] = useState(postData?.likeCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [save, setSave] = useState(postData?.isSaved || false);

  const handleLike = async () => {
    // Optimistically update UI
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount((prev:any) => prev + (newLikedState ? 1 : -1));

    try {
      const response = await postServices.likePost(postData._id);
      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleComment = async () => {
    try {
      if (!comment.trim()) return;
      const response = await postServices.addComment(postData._id, { comment });
      setComment("");
      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handledeletePost = async () => {
    try {
      const response = await postServices.deletePost(postData._id);
      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={
              postData?.avatar ||
              `https://ui-avatars.com/api/?name=${postData?.userId?.name}`
            }
            className="object-cover"
          />
        </Avatar>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="font-semibold hover:underline cursor-pointer">
              {postData?.userId?.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{postData?.createdAt}</span>
              <Globe className="h-3.5 w-3.5" />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="relative hover:bg-slate-800">
              <EllipsisVertical className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-slate-700 absolute left-2 top-0" side="bottom">
              <DropdownMenuItem className="text-red-500" onClick={handledeletePost}>
                delete
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white">View profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4">{postData?.caption}</div>

      {postData?.postImageUrl && (
        <div className="relative aspect-[3/2] bg-slate-900 w-full">
          <Image
            src={postData?.postImageUrl}
            alt={`${postData?.userId?.name}'s post`}
            fill
            priority
            className="object-contain"
            quality={100}
          />
        </div>
      )}

      {/* Likes count */}
      <div className="px-4 py-4 text-sm text-gray-400 border-b border-slate-700">
        {likeCount > 0 && `You and ${likeCount - 1} others`}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-4 divide-x divide-slate-700">
        <button
          onClick={handleLike}
          className="flex items-center cursor-pointer justify-center gap-2 p-3 hover:bg-slate-700 transition-colors"
        >
          <ThumbsUp className={`h-5 w-5 ${liked ? "fill-white" : ""}`} />
          <span className={`text-sm ${liked ? "text-pink-500" : ""}`}>
            {liked ? "Liked" : "Like"}
          </span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-slate-700 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">Comment</span>
        </button>

        <button className="flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-slate-700 transition-colors">
          <Share2 className="h-5 w-5" />
          <span className="text-sm">Share</span>
        </button>

        <button
          onClick={() => setSave(!save)}
          className="flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-slate-700 transition-colors"
        >
          <Bookmark className={`h-5 w-5 ${save ? "fill-white" : ""}`} />
          <span className="text-sm">{save ? "Unsave" : "Save"}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-2 mb-4">
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="bg-slate-700 border-none text-white"
            />
            <button
              onClick={handleComment}
              className="p-2 hover:bg-slate-600 rounded-full transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {postData?.comments?.map((comment: any) => (
              <div key={comment._id} className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      comment.user?.avatar ||
                      `https://ui-avatars.com/api/?name=${comment.user?.name}`
                    }
                  />
                </Avatar>
                <div className="bg-slate-700 p-2 rounded-lg">
                  <p className="font-semibold text-sm">{comment.user?.name}</p>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
