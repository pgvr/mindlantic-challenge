import type { NextPage } from "next";
import { useTodosQuery } from "~/graphql/__generated__";

const Home: NextPage = () => {
  const { data } = useTodosQuery();
  return <div>Hello, {JSON.stringify(data)}</div>;
};

export default Home;
