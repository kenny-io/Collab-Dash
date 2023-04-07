import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getQueryParam } from '../utils';
import Link from 'next/link';

const Roles: NextPage = () => {
  type CommunityType = {
    name: string;
    owner: string;
    id: string;
    roles: [];
    serverImage: string;
  };
  type RoleType = { name: string; id: number };
  const [error, setError] = useState('');
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    let aeToken = getQueryParam('aeToken');
    if (aeToken !== '') {
      localStorage.setItem('aeToken', aeToken);
    } else {
      aeToken = localStorage.getItem('aeToken') ?? '';
    }
    if (aeToken) {
      // check if data has been saved in local storage else fetch data from server
      if (localStorage.getItem('communities')) {
        setCommunities(JSON.parse(localStorage.getItem('communities') ?? ''));
      } else {
        const options = {
          method: 'GET',
          headers: {
            authorization: `AE ${aeToken}`,
          },
        };
        fetch(
          'https://api-qa.collab.land/account/administrated-communities',
          options
        )
          .then((response) => response.json())
          .then((response) => {
            console.log('fetch response', response);
            if (response?.error) {
              setError(response?.error);
              console.log(error);
            } else {
              setCommunities(response.items);
              localStorage.setItem(
                'communities',
                JSON.stringify(response.items)
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Head>
        <title>Communities</title>
        <meta
          name="description"
          content="See all your Collab.Land communities and roles"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-white bg-slate-800">
        {/* add a home button on the top left */}
        <div className="flex justify-between ">
          <Link
            href="/"
            className="hover:text-gray-600 border-b text-gray-200 mb-6 border-emerald-300 font-bold py-2 px-4 rounded-l"
          >
            Home
          </Link>
        </div>
        <section className="dark:bg-gray-900 h-auto ">
          {communities.length > 0 ? (
            <div className="flex flex-wrap -m-3 p-32">
              {communities.map((community: CommunityType, index) => {
                return (
                  <div key={index} className="p-4 xl:w-1/3 md:w-1/2 w-full">
                    <div className=" w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                      <div className="h-full p-6  bg-gray-900 flex flex-col relative overflow-hidden">
                        <div className="justify-between sm:flex">
                          <div>
                            <h1 className="md:text-3xl lg:text-5xl text-gray-200 pb-4 mb-4 border-b border-gray-800 leading-none">
                              {community.name}
                            </h1>
                          </div>

                          <div className="ml-3 hidden flex-shrink-0 sm:block">
                            <img
                              alt="Server Icon"
                              src={community.serverImage}
                              className="h-16 w-16 rounded-lg object-cover shadow-sm bg-white"
                            />
                          </div>
                        </div>

                        <p className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-500 to-yellow-500 text-xl">
                          {community.owner}
                        </p>
                        <br />
                        {community.roles.map((role: RoleType, index) => {
                          return (
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
                          );
                        })}
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
                    Fetching your communities...
                  </h2>
                </div>
              </div>
            </section>
          )}
        </section>
      </main>
    </div>
  );
};

export default Roles;
