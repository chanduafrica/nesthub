
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

export interface Thread {
    id: string;
    title: string;
    author: {
        name: string;
        avatar: string;
    };
    circle: {
        name: string;
        color: string;
    };
    tags: string[];
    content: string;
    stats: {
        likes: number;
        comments: number;
        sparks: number;
    };
    isPoll: boolean;
    pollOptions?: {
        text: string;
        votes: number;
    }[];
}

interface ThreadCardProps {
    thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
    const totalVotes = thread.isPoll ? thread.pollOptions!.reduce((acc, option) => acc + option.votes, 0) : 0;

    return (
        <Card className="overflow-hidden">
            <div className="flex">
                <div className="w-12 bg-muted/50 flex flex-col items-center py-4 space-y-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <span className="font-bold text-sm">{thread.stats.likes}</span>
                </div>
                <div className="flex-1">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className={`inline-block h-2 w-2 rounded-full ${thread.circle.color}`}></span>
                            <span>{thread.circle.name}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>Posted by</span>
                            <Avatar className="h-5 w-5">
                                <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                                <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{thread.author.name}</span>
                        </div>
                        <h2 className="text-lg font-semibold leading-tight pt-1">
                            <Link href={`/modules/campfire/thread/${thread.id}`} className="hover:underline">
                                {thread.title}
                            </Link>
                        </h2>
                         <div className="flex flex-wrap gap-2 pt-1">
                            {thread.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="py-2">
                        {thread.isPoll ? (
                            <div className="space-y-2">
                                {thread.pollOptions!.map(option => {
                                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                                    return (
                                        <div key={option.text}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{option.text}</span>
                                                <span>{Math.round(percentage)}%</span>
                                            </div>
                                            <Progress value={percentage} />
                                        </div>
                                    )
                                })}
                                <p className="text-xs text-muted-foreground">{totalVotes} votes</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {thread.content}
                            </p>
                        )}
                    </CardContent>
                    <CardFooter className="py-2">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                            <Link href={`/modules/campfire/thread/${thread.id}#comments`} className="flex items-center gap-1 hover:text-primary">
                                <MessageCircle className="h-4 w-4" />
                                <span>{thread.stats.comments} Comments</span>
                            </Link>
                            <div className="flex items-center gap-1">
                                <Flame className="h-4 w-4 text-orange-500" />
                                <span>{thread.stats.sparks} Sparks</span>
                            </div>
                             <Button variant="ghost" size="sm" className="text-xs">Share</Button>
                        </div>
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}
