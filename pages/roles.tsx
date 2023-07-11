import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getQueryParam } from "../utils";
import Link from "next/link";

const Roles: NextPage = () => {
  type CommunityType = {
    name: string;
    owner: string;
    id: string;
    roles: [];
    serverImage: string;
    pk: string;
  };
  type UserType = {
    id: string;
    client_id: string;
    user_profile: {
      global_name: string;
      avatar: string;
    };
  };
  type WalletType = {
    id: string;
    accountId: string;
    address: string;
    walletType: string;
  };

  type RoleType = { name: string; id: number };
  const [user, setUser] = useState<UserType>({
    id: "",
    client_id: "",
    user_profile: { global_name: "", avatar: "" },
  });
  const [avatarUrl, setAvatarUrl] = useState("");
  const [communities, setCommunities] = useState([]);
  const [userWallet, setUserWallet] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);

  const MAX_ROLES = 5;

  function truncate(str: string, n: number) {
    return str.substring(str.length - n);
  }
  useEffect(() => {
    let accessToken = new URLSearchParams(
      (location.hash || "").replace("#", ""),
    ).get("access_token");
    if (accessToken) {
      console.log("access token", accessToken);
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };
      const getUserCommunities = fetch(
        "https://api.collab.land/account/administrated-communities",
        options,
      );
      const getUserDetails = fetch(
        "https://api.collab.land/account/me",
        options,
      );
      const getUserWallet = fetch(
        "https://api.collab.land/account/wallets",
        options,
      );
      const getCommunities = fetch(
        "https://api.collab.land/account/communities",
        options,
      );

      Promise.all([
        getUserCommunities,
        getUserDetails,
        getUserWallet,
        getCommunities,
      ])
        .then((responses) => {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            }),
          );
        })
        .then((data) => {
          // Log the data to the console
          // You would do something with both sets of data here
          console.log(data);
          localStorage.setItem("admin-communities", JSON.stringify(data[0].items));
          localStorage.setItem("user", JSON.stringify(data[1]));
          localStorage.setItem("wallet", JSON.stringify(data[2]));
          localStorage.setItem("communities", JSON.stringify(data[3]));
          setCommunities(data[0].items);
          setUserWallet(data[2].items);
          setUserCommunities(data[3].items);
          setUser(data[1]);
          console.log(user);
          console.log(data[1]);
          

          if (user !== null) {
            // const avatarUrl = `https://cdn.discordapp.com/avatars/${user.client_id}/${user.user_profile.avatar}.png`;
            setAvatarUrl(
              "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            );
          } else {
            setAvatarUrl(
              "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            );
          }
        });
    } else {
      console.log("no access token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>Collab Dash</title>
        <meta
          name="description"
          content="See all your Collab.Land data in one place"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-4 p-8 lg:grid-cols-[120px_1fr] lg:gap-8">
        <div className="h-32 text-black ">
          <div>
            <Link href="/">
              <img
                className="h-16 w-20 rounded-full mx-auto"
                src="https://res.cloudinary.com/kennyy/image/upload/v1686681959/Logo-Mark-Color_evjsgi.png"
                alt=""
              />
              <h1 className="text-center text-2xl font-bold">Collab Dash</h1>
            </Link>
          </div>
        </div>
        <div className="h-32 rounded-lg">
          <header className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex items-center justify-end gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <label className="sr-only" htmlFor="search">
                      {" "}
                      Search{" "}
                    </label>

                    <input
                      className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                      id="search"
                      type="search"
                      placeholder="Search dashboard..."
                    />
                  </div>
                  <a
                    href="#"
                    className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
                  >
                    <span className="sr-only">Notifications</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </a>
                </div>
                <span
                  aria-hidden="true"
                  className="block h-6 w-px rounded-full bg-gray-200"
                ></span>

                <a href="#" className="block shrink-0">
                  <span className="sr-only">Profile</span>
                  <img
                    alt="Man"
                    src={avatarUrl}
                     className="h-10 w-10 rounded-full object-cover"
                  />
                </a>
              </div>

              <div className="mt-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Welcome{" "}
                  {user && user.user_profile.global_name
                    ? user.user_profile.global_name
                    : "User"}
                  !
                </h1>
              </div>
            </div>
          </header>
        </div>
        <div className=""></div>
        <div className="h-32 rounded-lg">
          <main className="text-white bg-slate-800">
            <section className="">
              <div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Your Wallets
                  </h2>

                  <p className="mt-4 text-gray-300">
                    These are all the wallets you have connected to Collab.Land.
                  </p>
                </div>
                {userWallet.length > 0 ? (
                  <div>
                    {userWallet.map((wallet: WalletType, index) => {
                      return (
                        <div key={index} className="mt-10">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
                                <svg
                                  className="h-6 w-6"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg leading-6 font-medium text-white">
                                0x...{truncate(wallet.address, 10)}
                              </h3>
                              <p className="mt-2 text-base leading-6 text-gray-300">
                                {wallet.walletType}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No wallets connected</p>
                )}
              </div>
            </section>
            <section className="dark:bg-gray-900 h-auto">
              <div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Your Communities
                  </h2>

                  <p className="mt-4 text-gray-300">
                    These are all the communities you are administrating.
                  </p>
                </div>
                {communities.length > 0 ? (
                <div className="flex flex-wrap -m-3 p-32">
                  {communities.map((community: CommunityType, index) => {
                    const rolesToShow = community.roles.slice(0, MAX_ROLES);
                    const remainingRoles = community.roles.length - MAX_ROLES;

                    return (
                      <div key={index} className="p-4 xl:w-1/3 md:w-1/2 w-full">
                        <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                          <div className="h-full p-6 bg-gray-900 flex flex-col relative overflow-hidden">
                            <div className="justify-between sm:flex">
                              <div>
                                <h1 className="md:text-3xl lg:text-5xl text-gray-200 pb-4 mb-4 border-b border-gray-800 leading-none">
                                  {community.name}
                                </h1>
                              </div>
{/* 
                              <div className="ml-3 hidden flex-shrink-0 sm:block">
                                <img
                                  alt="Server Icon"
                                  src={community.serverImage}
                                  className="h-16 w-16 rounded-lg object-cover shadow-sm bg-white"
                                />
                              </div> */}
                            </div>

                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-500 to-yellow-500 text-xl">
                              {community.owner}
                            </p>
                            <br />
                            <h3 className="mb-3">Community Roles</h3>
                            <>
                              {rolesToShow.map((role: RoleType, index) => (
                                <p
                                  key={index}
                                  className="flex items-center text-gray-200 mb-2"
                                >
                                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-dxt-accents-3 text-white rounded-full flex-shrink-0">
                                    <svg
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2.5"
                                      className="w-3 h-3"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M20 6L9 17l-5-5"></path>
                                    </svg>
                                  </span>
                                  {role.name}
                                </p>
                              ))}
                              {remainingRoles > 0 && (
                                <p className="text-gray-400">
                                  +{remainingRoles} more roles
                                </p>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                ) : (
                  <section className="bg-gray-900 text-white h-screen">
                  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg text-center">
                      <h2 className="text-3xl font-bold sm:text-4xl">
                        Fetching your data...
                      </h2>
                    </div>
                  </div>
                </section>
                )}
              </div>
            </section>

            <section className="text-white">
              <div className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Your Communities
                  </h2>
                  <p className="mt-4 text-gray-300">
                    These are all the communities you are a member of.
                  </p>
                </div>
                {userCommunities.length > 0 ? (
                  <div>
                    {userCommunities.map((community: CommunityType, index) => {
                      return (
                        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                          <div className="mx-auto max-w-lg text-center">
                            <fieldset className="space-y-4">
                              <legend className="sr-only">Delivery</legend>
                              <div>
                                <input
                                  type="radio"
                                  name="DeliveryOption"
                                  value="DeliveryStandard"
                                  id="DeliveryStandard"
                                  className="peer hidden"
                                />
                                <label
                                  htmlFor="DeliveryStandard"
                                  className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                >
                                  <p className="text-gray-700">
                                    {community.id}
                                  </p>
                                  <p className="text-gray-900">
                                    {community.pk}
                                  </p>
                                </label>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>You don't belong to any community</p>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Roles;
