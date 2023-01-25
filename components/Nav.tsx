import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div>
      <main>
        <nav className="flex border-b border-gray-100 text-sm font-medium">
          <a
            href=""
            className="-mb-px border-b border-current p-4 text-cyan-500"
          >
            Bronze
          </a>

          <a
            href=""
            className="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          >
            Silver
          </a>

          <a
            href=""
            className="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          >
            Gold
          </a>

          <a
            href=""
            className="-mb-px border-b border-transparent p-4 hover:text-cyan-500"
          >
            Platinum
          </a>
        </nav>
      </main>
    </div>
  );
};

export default Home;
