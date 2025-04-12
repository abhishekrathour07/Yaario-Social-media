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
    Copy,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import postServices from "@/services/post.services";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";
import EmojiPicker from "@/components/customs/EmojiPicker/EmojiPicker";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import savePostServices from "@/services/savepost.services";
import moment from "moment";

type ViewPostProps = {
    postData: any;
    refreshFeed?: () => any
};

const ViewPost: React.FC<ViewPostProps> = ({ postData, refreshFeed }) => {
    const { userId } = useUserStore();
    const [liked, setLiked] = useState(() =>
        postData?.like?.some((l: any) => l.user === userId)
    );
    const [likeCount, setLikeCount] = useState(postData?.likeCount || 0);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const [commentData, setCommentData] = useState([]);
    const [save, setSave] = useState(postData?.isSaved || false);
    const [postLink, setPostLink] = useState("");

    const router = useRouter()
    useEffect(() => {
        if (typeof window !== "undefined") {
            setPostLink(`${window.location.origin}/post/${postData?._id}`);
        }
    }, [postData?._id]);

    const handleEmojiSelect = (emoji: any) => {
        setComment(prev => prev + emoji.native);
    };

    const handleLike = async () => {
        const newLikedState = !liked;
        setLiked(newLikedState);
        setLikeCount((prev: any) => prev + (newLikedState ? 1 : -1));
        try {
            const response = await postServices.likePost(postData._id);
            toast.success(response?.message);
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    const getComment = async () => {
        try {
            const response = await postServices.getAllcomment(postData._id);
            setCommentData(response?.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };
    const handleComment = async () => {
        try {
            if (!comment.trim()) return;
            const response = await postServices.addComment({
                postId: postData._id,
                commentText: comment,
            });
            toast.success(response?.message);
            setComment("");
            setShowComments(false);
            getComment();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };



    const handledeletePost = async () => {
        try {
            const response = await postServices.deletePost(postData._id);
            toast.success(response?.message);
            refreshFeed && refreshFeed();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };
    const handleSavePost = async () => {
        try {
            const response = await savePostServices.saveUnsavePost(postData._id);
            toast.success(response?.message);
            setSave(!save)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        getComment();
    }, []);

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
                        <h2 className="font-semibold hover:underline cursor-pointer" onClick={() => { router.push(`/profile/${postData?.userId?._id}`) }}>
                            {postData?.userId?.name}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{moment(postData?.createdAt).fromNow()}</span>
                            <Globe className="h-3.5 w-3.5" />
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="relative hover:bg-slate-800">
                            <EllipsisVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-slate-700 absolute left-2 top-0" side="bottom">
                            {userId === postData?.userId?._id && (
                                <DropdownMenuItem
                                    className="text-white"
                                    onClick={handledeletePost}
                                >
                                    Delete Post
                                </DropdownMenuItem>
                            )}
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
            <div className="px-4 py-4 text-sm text-gray-400 flex justify-between border-b border-slate-700">
                <span>{likeCount > 0 && `You and ${likeCount - 1} others`}</span>
                <span>{postData?.commentCount > 0 && ` ${postData?.commentCount} comments`}</span>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-4 divide-x divide-slate-700">
                <button
                    onClick={handleLike}
                    className="flex items-center cursor-pointer justify-center gap-2 p-3 hover:bg-slate-700 transition-colors"
                >
                    <ThumbsUp className={`h-5 w-5 ${liked ? "fill-white" : ""}`} />
                    <span className={`text-sm ${liked ? "text-blue-600" : ""}`}>
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

                {/* Share Drawer */}
                <Drawer>
                    <DrawerTrigger asChild>
                        <button className="flex cursor-pointer items-center justify-center gap-2 p-3 hover:bg-slate-700 transition-colors">
                            <Share2 className="h-5 w-5" />
                            <span className="text-sm">Share</span>
                        </button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-slate-800 border-t border-slate-600 px-4 py-6">
                        <DialogTitle className="text-white text-lg font-semibold mb-4">Share Post</DialogTitle>
                        <div className="flex items-center justify-between bg-slate-700 rounded px-3 py-2">
                            <span className="truncate text-gray-300 text-sm">{postLink}</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(postLink);
                                    toast.success("Link copied to clipboard!");
                                }}
                                className="ml-3 hover:text-blue-500"
                            >
                                <Copy className="h-4 w-4 text-pink-500" />
                            </button>
                        </div>
                        <DrawerClose className="mt-4 text-sm text-gray-400 hover:text-white underline">
                            Close
                        </DrawerClose>
                    </DrawerContent>
                </Drawer>

                <button
                    onClick={handleSavePost}
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
                        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                        <button
                            onClick={handleComment}
                            className="p-2 hover:bg-slate-600 rounded-full transition-colors"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {commentData && commentData.length === 0 && (
                            <div className="h-[10vh] flex justify-center items-center text-gray-400">
                                <p>No comment yet. Be the first one to comment...</p>
                            </div>
                        )}
                        {commentData && commentData?.map((comment: any) => (
                            <div key={comment._id} className="flex items-start gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={
                                            comment.user?.avatar ||
                                            `https://ui-avatars.com/api/?name=${comment.user?.name}`
                                        }
                                    />
                                </Avatar>
                                <div className="bg-slate-700 px-3 py-2 rounded-lg">
                                    <p className="text-blue-500 text-sm">{comment.user?.name}</p>
                                    <p className="text-sm">{comment?.commentText}</p>
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
