import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Tweet from "./Tweet";

export interface ITweet {
  createdAt: number;
  imageUrl: string;
  name: string;
  text: string;
  uid: string;
  id: string;
}

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );

    const snapShot = await getDocs(tweetQuery);
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
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </>
  );
}
