/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [communities, setCommunities] = useState([]);
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(window.location.href);
    if (localStorage.getItem("communities")) {
      setCommunities(JSON.parse(localStorage.getItem("communities") ?? ""));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Communities</title>
        <meta
          name="description"
          content="See all you Collab.Land communities and roles"
        />
        <link rel="icon" href="/mh.png" />
      </Head>
      <main className="sm:h-screen bg-b_image font-poppins">
        <section className="leading-normal tracking-normal ">
          <div className="">
            <div className="w-full container mx-auto pt-8">
              <div className="w-full flex items-center justify-between">
                <img
                  src="/lg.png"
                  alt="collabland logo"
                  width={250}
                  height={100}
                />
              </div>
            </div>
            <div className="container pt-16 my-auto mx-auto flex flex-wrap flex-col md:flex-row items-center">
              <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left leading-8">
                  See all your <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-500 to-yellow-500">
                    Collab.Land Data
                  </span>{" "}
                  <br />
                  in one place
                </h1>
                <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-gray-200 ">
                  Login with Collab.Land to see all your data, communities and roles
                </p>
                <div className="flex sm:flex-row flex-col gap-2">
                  <Link
                    href={`https://api.collab.land/oauth2/authorize?client_id=ZAUrqzkDjTTOoGV7&response_type=token&scope=user:wallet:read+user:community:read+user:community:read+user:read+community:read+token-gating&redirect_uri=${encodeURIComponent(
                      url + "roles",
                    )}`}
                    className="mx-auto lg:mx-0 hover: bg-gradient-to-r from-yellow-600 to-pink-500 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                  >
                    Login with Collab.Land
                  </Link>
                  {/* {communities.length > 0 && (
                    <Link
                      href="/roles"
                      className="mx-auto lg:mx-0 hover: bg-gradient-to-r from-purple-600 to-green-500  text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                    >
                      See Communities
                    </Link>
                  )} */}
                </div>
              </div>

              <div className="w-full xl:w-3/5 p-12 overflow-hidden">
                <img
                  className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
                  src="/mascot.png"
                  alt="images for header"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
