import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Tweet from "./Tweet";

export interface ITweet {
  createdAt: number;
  //NOTE: 옵셔널 체이닝??
  imageUrl?: string;
  name: string;
  text: string;
  uid: string;
  id: string;
}

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetQuery, (snapShot) => {
        const tweetsArray = snapShot.docs.map((doc) => {
          const { createdAt, imageUrl, name, text, uid } = doc.data();
          return {
            createdAt,
            imageUrl,
            name,
            text,
            uid,
            id: doc.id,
          };
        });
        setTweets(tweetsArray);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}
