"use client"
import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { fireDb } from '../../firebase';
import { Timestamp, addDoc, collection, setDoc, getDocs, query, where, } from 'firebase/firestore';
import { useEffect, useState } from "react";
const Posts = ({ posts, className, authors }) => {
  const [postlist, setPostlist] = useState('')
  useEffect(() => {
    const fetchPosts = async () => {
      // setLoading(true);
      const querySnapshot = await getDocs(collection(fireDb, "blogPost"));
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // setPostsData(posts);
      setPostlist(posts);
      console.log(posts, "----------11111111------");
      // setPostauthor(sessionStorage.getItem('AdminName'))
      // console.log(formData, "fd---000");
      // setLoading(false);
    };

    fetchPosts();
  }, []);
  const { summary_length } = config.settings;
  const description =
    "One of the key reasons Gigi believes she has been so successful at maintaining follower growth flies in the face of ‘traditional’ social media advice: evolving her business into other areas, rather than sticking to one niche.";

  // Condense the description to 100 characters and append '...'
  // const condensedDescription = description.length > 100 
  //   ? description.slice(0, 100) + "..." 
  //   : description;
  return (
    <div className="mb-20">
      <div className={`flex gap-10`}>
        {/* {posts.map((post, i) => ( */}
        {postlist?.length && postlist?.map((post, i) => (
          <div
            key={`key-${i}`}
            className={"w-[400px] h-[400px]"}
          >
            {post?.coverimages && (
              <Image
                className="rounded-lg w-[400px] h-[200px]"
                src={post?.coverimages}
                alt={post?.coverimages}
                width={445}
                height={230}
                priority={i === 0 ? true : false}
              />
            )}
            <ul className="mb-4 mt-4 flex flex-wrap items-center space-x-3 text-text">
              {/* <li>
              {authors
                .filter((author) =>
                  post.frontmatter.authors
                    .map((author) => slugify(author))
                    .includes(slugify(author.frontmatter.title))
                )
                .map((author, i) => (
                  <Link
                    href={`/authors/${slugify(author.frontmatter.title)}`}
                    key={`author-${i}`}
                    className="flex items-center hover:text-primary"
                  >
                    {author.frontmatter.image && (
                      <Image
                        src={author.frontmatter.image}
                        alt={author.frontmatter.title}
                        height={50}
                        width={50}
                        className="mr-2 h-6 w-6 rounded-full"
                      />
                    )}
                    <span>{author.frontmatter.title}</span>
                  </Link>
                ))}
            </li> */}
              <li>{post?.postauthor}</li>
              <li>{post?.date}</li>
              <li>
                <ul>
                  {/* {post.frontmatter.categories.map((category, i) => (
                  <li className="inline-block" key={`category-${i}`}>
                    <Link
                      href={`/categories/${slugify(category)}`}
                      className="mr-3 hover:text-primary"
                    >
                      &#9635; {humanize(category)}
                    </Link>
                  </li>
                ))} */}
                  <li>{post?.categoryname}</li>
                </ul>
              </li>
            </ul>
            <h3 className="mb-2">
              <Link href={`/${post.slug}`} className="block hover:text-primary">
                {/* {post?.title} */}
                {post?.title && post?.title.slice(0, 50)}...
              </Link>
            </h3>
            <p className="text-text">
              {post?.description && post?.description.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
